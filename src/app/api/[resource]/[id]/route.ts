import { NextResponse } from "next/server";
import {
  handleApiError,
  jsonError,
  nowIso,
  parseJsonBody,
  requireAdmin,
} from "@/lib/server/api";
import {
  collectionFor,
  idFilter,
  isResourceName,
  normalizeDocument,
} from "@/lib/server/resources";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ resource: string; id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { resource, id } = await params;
    if (!isResourceName(resource)) return jsonError("Unknown API resource.", 404);

    const collection = await collectionFor(resource);
    const document = await collection.findOne(idFilter(id));
    if (!document) return jsonError("Resource item not found.", 404);

    return NextResponse.json({ data: normalizeDocument(document) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { resource, id } = await params;
    if (!isResourceName(resource)) return jsonError("Unknown API resource.", 404);

    const body = await parseJsonBody(request);
    const { _id: ignoredDatabaseId, ...safeBody } = body;
    void ignoredDatabaseId;

    const collection = await collectionFor(resource);
    const result = await collection.findOneAndUpdate(
      idFilter(id),
      { $set: { ...safeBody, _updatedAt: nowIso() } },
      { returnDocument: "after" },
    );

    if (!result) return jsonError("Resource item not found.", 404);
    return NextResponse.json({ data: normalizeDocument(result) });
  } catch (error) {
    if (error instanceof SyntaxError) return jsonError("Request body must be valid JSON.");
    return handleApiError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  return PATCH(request, context);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { resource, id } = await params;
    if (!isResourceName(resource)) return jsonError("Unknown API resource.", 404);

    const collection = await collectionFor(resource);
    const result = await collection.deleteOne(idFilter(id));
    if (!result.deletedCount) return jsonError("Resource item not found.", 404);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
