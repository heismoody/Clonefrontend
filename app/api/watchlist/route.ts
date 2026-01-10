import { NextResponse } from "next/server";
import { auth } from "@/auth.config";
import { db } from "@/lib/db";
import { watchlist } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { verifyToken } from "@/lib/auth/jwt";

const watchlistSchema = z.object({
  movieId: z.number(),
  title: z.string(),
  posterUrl: z.string().nullable(),
  year: z.string(),
  mediaType: z.enum(["movie", "tv"]),
});

// Helper to get user ID from Session or JWT
async function getUserId(req: Request): Promise<number | null> {
  // 1. Try JWT
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);
    if (payload?.userId) return payload.userId as number;
  }

  // 2. Try Session
  const session = await auth();
  if (session?.user?.id) return parseInt(session.user.id);

  return null;
}

// GET - Fetch user's watchlist
export async function GET(req: Request) {
  const userId = await getUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await db.query.watchlist.findMany({
      where: eq(watchlist.userId, userId),
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
  const userId = await getUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = watchlistSchema.parse(body);

    // Check if already in watchlist
    const existing = await db.query.watchlist.findFirst({
      where: and(
        eq(watchlist.userId, userId),
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
        userId: userId,
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
  const userId = await getUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const movieId = searchParams.get("movieId");

    if (!id && !movieId) {
      return NextResponse.json(
        { error: "Watchlist item ID or Movie ID is required" },
        { status: 400 }
      );
    }

    if (id) {
      await db
        .delete(watchlist)
        .where(
          and(eq(watchlist.id, parseInt(id)), eq(watchlist.userId, userId))
        );
    } else if (movieId) {
      await db
        .delete(watchlist)
        .where(
          and(
            eq(watchlist.movieId, parseInt(movieId)),
            eq(watchlist.userId, userId)
          )
        );
    }

    return NextResponse.json({ message: "Removed from watchlist" });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return NextResponse.json(
      { error: "Failed to remove from watchlist" },
      { status: 500 }
    );
  }
}
