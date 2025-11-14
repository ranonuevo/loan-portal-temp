import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { jobExecutionId } = await req.json();

    const res = await fetch(
      `${process.env.OPUS_API_BASE!}/job/${jobExecutionId}/results`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-service-key": process.env.OPUS_API_KEY!,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("get-job-result error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
