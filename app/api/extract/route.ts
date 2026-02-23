import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "File is too large. Maximum size is 10 MB." },
        { status: 400 }
      );
    }

    const fileType = ALLOWED_TYPES[file.type];

    // Also check by extension as a fallback (some browsers report wrong MIME)
    if (!fileType) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== "pdf" && ext !== "docx") {
        return Response.json(
          { error: "Unsupported file type. Please upload a PDF or .docx file." },
          { status: 400 }
        );
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = fileType || file.name.split(".").pop()?.toLowerCase();
    let text = "";

    if (ext === "pdf") {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      text = result.text;
      await parser.destroy();
    } else if (ext === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    text = text.trim();

    if (!text) {
      return Response.json(
        { error: "Could not extract text from the file. It may be scanned or image-based." },
        { status: 422 }
      );
    }

    return Response.json({ text, filename: file.name });
  } catch (error) {
    console.error("Extract error:", error);
    return Response.json(
      { error: "Failed to process the file. Please try pasting the text instead." },
      { status: 500 }
    );
  }
}
