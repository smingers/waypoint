import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildAnalysisPrompt } from "@/lib/prompt";

const anthropic = new Anthropic();

// Cost per million tokens by model
const PRICING: Record<string, { input: number; output: number }> = {
  "claude-haiku-4-5-20251001": { input: 0.80, output: 4.00 },
  "claude-sonnet-4-6": { input: 3.00, output: 15.00 },
  "claude-opus-4-6": { input: 15.00, output: 75.00 },
};

function calcCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = PRICING[model] || PRICING["claude-sonnet-4-6"];
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;
}

export async function POST(request: Request) {
  try {
    const startTime = Date.now();
    const { prd } = await request.json();

    if (!prd || typeof prd !== "string" || prd.trim().length === 0) {
      return Response.json(
        { error: "Please provide a PRD to analyze." },
        { status: 400 }
      );
    }

    if (prd.length > 100000) {
      return Response.json(
        { error: "PRD is too long. Please keep it under 100,000 characters." },
        { status: 400 }
      );
    }

    const MODELS: Record<string, string> = {
      haiku: "claude-haiku-4-5-20251001",
      sonnet: "claude-sonnet-4-6",
      opus: "claude-opus-4-6",
    };
    const modelKey = process.env.ANALYSIS_MODEL || "sonnet";
    const model = MODELS[modelKey] || MODELS.sonnet;

    const message = await anthropic.messages.create({
      model,
      max_tokens: 16384,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildAnalysisPrompt(prd),
        },
      ],
    });

    const timeSec = parseFloat(((Date.now() - startTime) / 1000).toFixed(1));
    const cost = calcCost(model, message.usage.input_tokens, message.usage.output_tokens);

    console.log(`Analysis complete: model=${model}, stop_reason=${message.stop_reason}, in=${message.usage.input_tokens}, out=${message.usage.output_tokens}, time=${timeSec}s, cost=$${cost.toFixed(4)}`);

    const content = message.content[0];
    if (content.type !== "text") {
      return Response.json(
        { error: "Unexpected response format from AI." },
        { status: 500 }
      );
    }

    let analysis = content.text;
    if (message.stop_reason === "max_tokens") {
      analysis += "\n\n---\n\n*⚠️ Analysis was truncated due to length. Try a shorter PRD or a more concise analysis model.*";
    }

    return Response.json({
      analysis,
      truncated: message.stop_reason === "max_tokens",
      meta: {
        model: modelKey,
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        timeSec,
        cost,
      },
    });
  } catch (error: unknown) {
    console.error("Analysis error:", error);

    if (error instanceof Anthropic.APIError) {
      if (error.status === 401) {
        return Response.json(
          { error: "Invalid API key. Please check your configuration." },
          { status: 500 }
        );
      }
      if (error.status === 429) {
        return Response.json(
          { error: "Rate limited. Please try again in a moment." },
          { status: 429 }
        );
      }
    }

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
