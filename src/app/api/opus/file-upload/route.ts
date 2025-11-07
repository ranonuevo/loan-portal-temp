import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // expect multipart/form-data so you can send the file directly
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // determine file extension (.pdf, .png, etc.)
    const fileExtension = "." + file.name.split(".").pop();

    // 1️⃣ Get presigned upload URL from Opus
    const presignRes = await fetch(`${process.env.OPUS_API_BASE!}/job/file/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-service-key": process.env.OPUS_API_KEY!,
      },
      body: JSON.stringify({
        fileExtension,
        accessScope: "user", // must be one of: all, user, workspace, organization
      }),
    });

    if (!presignRes.ok) {
      const text = await presignRes.text();
      throw new Error(`Failed to get presigned URL: ${text}`);
    }

    const { presignedUrl, fileUrl } = await presignRes.json();

    // 2️⃣ Upload actual file binary to the presigned S3 URL
    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      throw new Error(`Failed to upload file: ${text}`);
    }

    // 3️⃣ Return the final S3 file URL to client
    return NextResponse.json({ fileUrl, success: true });
  } catch (error: any) {
    console.error("file-upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
