import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.OPUS_API_BASE!}/job/file/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-service-key": process.env.OPUS_API_KEY!,
    },
    body: JSON.stringify({
      fileExtension: body.fileExtension,  // e.g. ".png"
      accessScope: body.accessScope,      // e.g. "user"
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
