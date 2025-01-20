import { NextResponse } from "next/server";
import Busboy from "busboy";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export async function POST(request: Request) {
  try {
    const busboy = new Busboy({ headers: request.headers });

    // To store the file and its metadata
    let uploadedFile: { fileName: string; fileBuffer: Buffer } | null = null;

    // Use a promise to handle async operations with Busboy
    const result = await new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        file.on("data", (chunk) => chunks.push(chunk)); // Collect file chunks
        file.on("end", () => {
          uploadedFile = {
            fileName: filename,
            fileBuffer: Buffer.concat(chunks),
          };
        });
      });

      busboy.on("finish", () => {
        resolve(uploadedFile);
      });

      busboy.on("error", (error) => {
        reject(error);
      });

      // Pipe the request body to Busboy
      request.body?.pipe(busboy);
    });

    if (!result) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const { fileName, fileBuffer } = result as {
      fileName: string;
      fileBuffer: Buffer;
    };

    // You can now process the file (e.g., save it or parse it)
    console.log(`File uploaded: ${fileName}`);
    console.log(`File size: ${fileBuffer.length} bytes`);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName,
    });
  } catch (error) {
    console.error("Error handling upload:", error);
    return NextResponse.json(
      { error: "File upload failed" },
      { status: 500 }
    );
  }
}
