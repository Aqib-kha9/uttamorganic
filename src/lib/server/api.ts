import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "./mongodb";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function handleApiError(error: unknown) {
  console.error("API request failed", error);

  if (!isDatabaseConfigured()) {
    return jsonError("Database is not configured. Add MONGODB_URI to the environment.", 503);
  }

  return jsonError("An unexpected server error occurred.", 500);
}

export async function parseJsonBody(request: Request): Promise<Record<string, unknown>> {
  const body: unknown = await request.json();

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new Error("Request body must be a JSON object.");
  }

  return body as Record<string, unknown>;
}

export function withId<T extends Record<string, unknown>>(data: T, id: string) {
  return { ...data, id };
}

export function nowIso() {
  return new Date().toISOString();
}

export function isAdminRequest(request: Request): boolean {
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    return process.env.NODE_ENV !== "production";
  }

  const authorization = request.headers.get("authorization");
  const providedToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : request.headers.get("x-admin-token");

  return providedToken === expectedToken;
}

export function requireAdmin(request: Request) {
  if (!isAdminRequest(request)) {
    return jsonError("Admin authentication is required.", 401);
  }

  return null;
}
