import { auth } from "@/auth";

//Note that obtaining session with >await auth(), COULD/SHOULD return null if expiry is passed. therefore type promise<...>
export async function getCurrentUserId(): Promise<string | null> {
    const session = await auth();
    return session?.user?.id ?? null;
}