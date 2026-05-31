import { Prisma } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { client } from "@repo/db/client";
import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";


const nextAuth = NextAuth({
    adapter: PrismaAdapter(client.db),
    providers: [Google,],
    trustHost: true,
});

//My goat JonNode28: Type Inference issue fix "https://github.com/nextauthjs/next-auth/issues/10568#issuecomment-2849090669"
export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
