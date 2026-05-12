import { env } from "@repo/env/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === env.PASSWORD) {
    const cookieStore = await cookies();
    const token = jwt.sign({ authenticated: true }, env.JWT_SECRET || "", { expiresIn: "3m" });
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    return NextResponse.json({ success: true });
}