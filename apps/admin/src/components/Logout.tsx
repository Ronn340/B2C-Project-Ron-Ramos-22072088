"use client";
import { useRouter } from "next/navigation";

export function Logout() {
    const router = useRouter();
    async function handleLogout() {
        await fetch("/api/auth", {
            method: "DELETE",
        });
        router.refresh();
    }  
    return (
        <button onClick={handleLogout} className="border border-gray-300 rounded px-2 py-1 m-2 hover:bg-gray-100 font-semibold text-primary">
            Logout
        </button>
    );
}
