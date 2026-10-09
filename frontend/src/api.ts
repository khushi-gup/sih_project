import type { AnalysisResult, Report } from "./types";
import { fallbackAnalysis, fallbackReport } from "./fallback";

const rawBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ?? "";
const API_BASE = rawBase
  ? (rawBase.startsWith("http://") || rawBase.startsWith("https://")
      ? rawBase
      : `https://${rawBase}`).replace(/\/+$/, "")
  : "";

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`${path} failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function analyze(query: string, radius_m: number): Promise<AnalysisResult> {
  try {
    return await postJson<AnalysisResult>("/api/analyze", { query, radius_m });
  } catch {
    return fallbackAnalysis(query, radius_m);
  }
}

export async function askChat(message: string, radius_m: number): Promise<{ answer: string; sources: string[] }> {
  try {
    return await postJson("/api/chat", { message, radius_m });
  } catch {
    const report = fallbackReport("offline fallback", radius_m);
    return {
      answer: `Backend offline. Fallback data shows ${report.key_metrics.inside_buffer} detections inside ${radius_m} m.`,
      sources: ["frontend fallback dataset"]
    };
  }
}

export async function getReport(query: string, radius_m: number): Promise<Report> {
  try {
    return await postJson<Report>("/api/report", { query, radius_m });
  } catch {
    return fallbackReport(query, radius_m);
  }
}
