"use client";

import { useEffect, useState } from "react";
import { login } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    if (hasToken) {
      router.replace("/users");
    }
  }, [router]);

  async function handleLogin() {
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      const data = await login(email, password);

      saveToken(data.token);
      document.cookie = `token=${data.token}; path=/`;

      router.push("/users");
    } catch {
      setError("Login gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
