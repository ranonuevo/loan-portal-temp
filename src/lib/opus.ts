// lib/opus.ts
const BASE_URL = process.env.NEXT_PUBLIC_OPUS_BASE_URL || "https://operator.opus.com";
const API_KEY = process.env.NEXT_PUBLIC_OPUS_API_KEY!;

async function opusFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Opus API error: ${res.status} ${errText}`);
  }
  return res.json();
}

export async function uploadFileToOpus(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/opus/file-upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.fileUrl;
}

export async function runJob(workflowId: string, title: string, description: string, payload: any) {
  try {
    return await fetch("/api/opus/run-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workflowId,
        title,
        description,
        payload
      }),
    });
  }  catch (error) {
    console.error("run job error:", error);
    throw error;
  }
}


export async function getJobResult(jobExecutionId: string) {
  const res = await fetch("/api/opus/get-job-result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobExecutionId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch job result");
  }

  return res.json();
}
