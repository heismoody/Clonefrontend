import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { refreshTokens, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { verifyToken, signAccessToken, signRefreshToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 }
      );
    }

    // Verify token signature
    const payload = await verifyToken(refreshToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if token exists in DB and is valid
    const storedToken = await db.query.refreshTokens.findFirst({
      where: and(
        eq(refreshTokens.token, refreshToken),
        eq(refreshTokens.revoked, 0)
      ),
    });

    if (!storedToken) {
      // Token reuse detection could go here (revoke all user tokens)
      return NextResponse.json(
        { error: "Invalid or revoked token" },
        { status: 401 }
      );
    }

    if (new Date() > storedToken.expiresAt) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    // Get user info
    const user = await db.query.users.findFirst({
      where: eq(users.id, storedToken.userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Rotate tokens
    const newAccessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
    });
    const newRefreshToken = await signRefreshToken({ userId: user.id });

    // Revoke old token and store new one
    await db
      .update(refreshTokens)
      .set({ revoked: 1 })
      .where(eq(refreshTokens.id, storedToken.id));

    await db.insert(refreshTokens).values({
      userId: user.id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return NextResponse.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
