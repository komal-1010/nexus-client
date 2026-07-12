const baseUrl = import.meta.env.VITE_API_URL ?? "";

export async function checkHealth(): Promise<{ status: string }> {
  const res = await fetch(`${baseUrl}/health`);
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }
  return res.json();
}
