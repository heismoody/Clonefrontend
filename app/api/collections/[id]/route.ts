import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { collections, collectionItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { verifyToken } from "@/lib/auth/jwt";

// Helper to verify auth and ownership
async function verifyAuth(req: Request, collectionId: number) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);
  if (!payload) return null;

  const collection = await db.query.collections.findFirst({
    where: and(
      eq(collections.id, collectionId),
      eq(collections.userId, payload.userId as number)
    ),
  });

  if (!collection) return null;
  return payload;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collectionId = parseInt(id);
    if (isNaN(collectionId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const payload = await verifyAuth(req, collectionId);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db.query.collectionItems.findMany({
      where: eq(collectionItems.collectionId, collectionId),
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collectionId = parseInt(id);
    if (isNaN(collectionId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const payload = await verifyAuth(req, collectionId);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    // Validate body (movieId, title, etc.) - simplified for brevity

    const [newItem] = await db
      .insert(collectionItems)
      .values({
        collectionId,
        movieId: body.movieId,
        title: body.title,
        posterUrl: body.posterUrl,
        mediaType: body.mediaType || "movie",
      })
      .returning();

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collectionId = parseInt(id);
    if (isNaN(collectionId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const payload = await verifyAuth(req, collectionId);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.delete(collections).where(eq(collections.id, collectionId));

    return NextResponse.json({ message: "Collection deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
