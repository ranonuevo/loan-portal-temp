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

export async function uploadFileToOpus(file: File): Promise<string> {
  try {
    // Step 1: Get presigned upload URL and fileKey from your Next.js API route
    const response = await fetch("/api/opus/file-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // filename: file.name,
        // contentType: file.type,
        "fileExtension": ".png",
        "accessScope": "user"
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload URL: ${response.statusText}`);
    }

    const { presignedUrl, fileUrl } = await response.json();

    // Step 2: Upload file directly to S3 (Opus storage)
    const s3Upload = await fetch(presignedUrl, {
      method: "PUT",
      body: file, // file is already binary
    });

    if (!s3Upload.ok) {
      throw new Error(`Failed to upload file to Opus storage: ${s3Upload.statusText}`);
    }

    console.log("File exists:", s3Upload.ok);

    return fileUrl; // return the key so you can use it in /job/execute

  } catch (error) {
    console.error("uploadToOpus error:", error);
    throw error;
  }
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
  return opusFetch(`/job/${jobExecutionId}/results`);
}
