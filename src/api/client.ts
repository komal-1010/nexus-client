import { z } from "zod";

const healthResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

const apiUrl = import.meta.env.VITE_API_URL ?? "";

export async function checkHealth(): Promise<HealthResponse> {
  const res = await fetch(`${apiUrl}/api/v1/health`);

  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`);
  }

  const data: unknown = await res.json();
  return healthResponseSchema.parse(data);
}
