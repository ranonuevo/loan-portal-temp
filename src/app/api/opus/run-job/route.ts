import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workflowId, title, description, payload } = body;

    if (!workflowId) {
      return NextResponse.json({ error: "workflowId is required" }, { status: 400 });
    }

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "payload is required and must be an object" }, { status: 400 });
    }

    const headers = {
      "Content-Type": "application/json",
      "x-service-key": process.env.OPUS_API_KEY!,
    };

    // 1️⃣ INITIATE JOB
    const initiateRes = await fetch(`${process.env.OPUS_API_BASE!}/job/initiate`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        workflowId,
        title: title || "Untitled Job",
        description: description || "No description provided",
      }),
    });

    if (!initiateRes.ok) {
      const err = await initiateRes.text();
      throw new Error(`Failed to initiate job: ${err}`);
    }

    const jobInitData = await initiateRes.json();
    const jobExecutionId = jobInitData.jobExecutionId;
    if (!jobExecutionId)
      throw new Error("No jobExecutionId returned from initiate step");

    // 2️⃣ EXECUTE JOB
    const params = JSON.stringify({
      jobExecutionId: String(jobExecutionId),
      jobPayloadSchemaInstance: payload,
    })
    console.log('params.....', params)
    const executeRes = await fetch(`${process.env.OPUS_API_BASE!}/job/execute`, {
      method: "POST",
      headers,
      body: params,
    });

    const executeData = await executeRes.json();

    if (!executeRes.ok) {
      throw new Error(`Failed to execute job: ${JSON.stringify(executeData)}`);
    }

    // ✅ Return parsed response
    return NextResponse.json(
      {
        jobExecutionId,
        executeResponse: executeData,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Opus job route error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}