"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  //Button click on sign-in
  async function handleLogin() {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    //Refreshing the current page to have auth_token exist - incookies
    if (res.ok) {
      router.refresh();
    } else {
      setError("Invalid password. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-20 rounded shadow-md w-full max-w-sm flex flex-col items-center font-semibold text-primary">
        <Image src="/wsulogo.png" alt="WSU Logo" width={32} height={32} className="mb-4" />
        <h1>Sign in to your account</h1>
        <span className="text-red-500">{error}</span>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 m-2"
        />
        <button onClick={handleLogin} className="border border-gray-300 rounded px-2 py-1 m-2 hover:bg-gray-200">
          Sign In
        </button>
      </div>
    </div>
  );
}