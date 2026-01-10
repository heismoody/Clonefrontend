import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { collections, collectionItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { verifyToken } from "@/lib/auth/jwt";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = parseInt(id);
    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Verify ownership via collection
    const item = await db.query.collectionItems.findFirst({
      where: eq(collectionItems.id, itemId),
      with: {
        // @ts-ignore - relation not defined in schema but we can query parent
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const collection = await db.query.collections.findFirst({
      where: and(
        eq(collections.id, item.collectionId),
        eq(collections.userId, payload.userId as number)
      ),
    });

    if (!collection) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.delete(collectionItems).where(eq(collectionItems.id, itemId));

    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
