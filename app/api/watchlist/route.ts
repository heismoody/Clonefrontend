import { NextResponse } from "next/server";
import { auth } from "@/auth.config";
import { db } from "@/lib/db";
import { watchlist } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const watchlistSchema = z.object({
  movieId: z.number(),
  title: z.string(),
  posterUrl: z.string().nullable(),
  year: z.string(),
  mediaType: z.enum(["movie", "tv"]),
});

// GET - Fetch user's watchlist
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await db.query.watchlist.findMany({
      where: eq(watchlist.userId, parseInt(session.user.id)),
      orderBy: (watchlist, { desc }) => [desc(watchlist.addedAt)],
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch watchlist" },
      { status: 500 }
    );
  }
}

// POST - Add to watchlist
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = watchlistSchema.parse(body);

    // Check if already in watchlist
    const existing = await db.query.watchlist.findFirst({
      where: and(
        eq(watchlist.userId, parseInt(session.user.id)),
        eq(watchlist.movieId, validatedData.movieId)
      ),
    });

    if (existing) {
      return NextResponse.json(
        { error: "Item already in watchlist" },
        { status: 400 }
      );
    }

    const [item] = await db
      .insert(watchlist)
      .values({
        userId: parseInt(session.user.id),
        ...validatedData,
      })
      .returning();

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Error adding to watchlist:", error);
    return NextResponse.json(
      { error: "Failed to add to watchlist" },
      { status: 500 }
    );
  }
}

// DELETE - Remove from watchlist
export async function DELETE(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Watchlist item ID is required" },
        { status: 400 }
      );
    }

    await db
      .delete(watchlist)
      .where(
        and(
          eq(watchlist.id, parseInt(id)),
          eq(watchlist.userId, parseInt(session.user.id))
        )
      );

    return NextResponse.json({ message: "Removed from watchlist" });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return NextResponse.json(
      { error: "Failed to remove from watchlist" },
      { status: 500 }
    );
  }
}
