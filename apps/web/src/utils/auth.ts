import {cookies} from "next/headers";

export async function getCurrentUser(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("userId")?.value ?? null;
}