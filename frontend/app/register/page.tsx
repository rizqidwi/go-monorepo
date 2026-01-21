"use client";

import { useEffect, useState } from "react";
import { register } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
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

    async function handleRegister() {
        setError("");

        if (!name || !email || !password) {
            setError("Semua field wajib diisi");
            return;
        }

        try {
            await register({ name, email, password });
            router.push("/login");
        } catch {
            setError("Registrasi gagal");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4 text-center">Register</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-3 rounded text-sm">
                        {error}
                    </div>
                )}

                <input
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white py-2 rounded mb-3"
                >
                    Register
                </button>

                <p className="text-center text-sm">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
