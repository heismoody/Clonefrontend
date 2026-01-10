import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = await signRefreshToken({ userId: user.id });

    // Store refresh token
    await db.insert(refreshTokens).values({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
