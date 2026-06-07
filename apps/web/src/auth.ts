import { Prisma } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { client } from "@repo/db/client";
import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";

//setup instructions: https://dev.to/whoffagents/nextauthjs-v5-prisma-postgresql-production-setup-guide-53n4
const nextAuth = NextAuth({
    adapter: PrismaAdapter(client.db),
    providers: [Google,],
    trustHost: true,
    session: {
        strategy: "database",
    },
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        }
    },
});

//My goat JonNode28: Type Inference issue fix "https://github.com/nextauthjs/next-auth/issues/10568#issuecomment-2849090669"
export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
