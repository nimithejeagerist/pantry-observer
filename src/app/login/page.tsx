"use client";

import React, { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Image from 'next/image';
import loginBanner from "./login-banner.jpg";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex w-1/2">
                <Image src={loginBanner} alt="Login Image" layout="responsive" objectFit="cover" className="rounded" />
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Login</h1>
                <form className="w-full max-w-xs" onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="border border-gray-300 p-2 w-full mb-4 rounded-lg"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="border border-gray-300 p-2 w-full mb-4 rounded-lg"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-green-600 text-white p-2 w-full rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <Link href="/register" className="text-white">
                            Don&apos;t have an account? <span className="font-bold">Sign up.</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;