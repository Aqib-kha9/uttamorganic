import { NextResponse } from "next/server";
import {
  handleApiError,
  jsonError,
  nowIso,
  parseJsonBody,
  requireAdmin,
} from "@/lib/server/api";
import { getDatabase } from "@/lib/server/mongodb";
import {
  isSingletonResourceName,
  normalizeDocument,
  singletonDocumentId,
} from "@/lib/server/resources";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ resource: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { resource } = await params;
    if (!isSingletonResourceName(resource)) return jsonError("Unknown settings resource.", 404);

    const database = await getDatabase();
    const document = await database
      .collection("settings")
      .findOne({ id: singletonDocumentId(resource) });

    if (!document) return jsonError("Settings resource not found.", 404);
    return NextResponse.json({ data: normalizeDocument(document) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { resource } = await params;
    if (!isSingletonResourceName(resource)) return jsonError("Unknown settings resource.", 404);

    const body = await parseJsonBody(request);
    const id = singletonDocumentId(resource);
    const database = await getDatabase();
    const document = await database.collection("settings").findOneAndUpdate(
      { id },
      {
        $set: { ...body, id, _updatedAt: nowIso() },
        $setOnInsert: { _createdAt: nowIso() },
      },
      { upsert: true, returnDocument: "after" },
    );

    if (!document) return jsonError("Unable to save settings resource.", 500);
    return NextResponse.json({ data: normalizeDocument(document) });
  } catch (error) {
    if (error instanceof SyntaxError) return jsonError("Request body must be valid JSON.");
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  return PUT(request, context);
}
