"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("admin@greengrow.in");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Frontend-only mock auth — serverless API will be wired later.
        setTimeout(() => {
            setLoading(false);
            router.push("/admin");
        }, 700);
    };

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* Left brand panel */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-emerald-950 p-12 text-emerald-50 lg:flex">
                <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-650/30 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

                <Link href="/" className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-650 shadow-xl">
                        <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div className="leading-tight">
                        <span className="block text-base font-black tracking-tight text-white">
                            GREENGROW FERTILIZER
                        </span>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            Scientific Bio-Inputs
                        </span>
                    </div>
                </Link>

                <div className="relative">
                    <h2 className="font-display text-3xl font-extrabold leading-tight text-white xl:text-4xl">
                        Manage your entire <br /> catalog from one place.
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-emerald-200/80">
                        Upload products, update pricing, manage categories and track orders —
                        all dynamic content controlled right here.
                    </p>

                    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-800/60 bg-emerald-900/40 p-4">
                        <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-400" />
                        <div>
                            <p className="text-sm font-bold text-white">Secure Admin Access</p>
                            <p className="text-xs text-emerald-300/80">
                                Authorized personnel only. All actions are logged.
                            </p>
                        </div>
                    </div>
                </div>

                <p className="relative text-xs text-emerald-400/70">
                    © {new Date().getFullYear()} Greengrow Fertilizer. All rights reserved.
                </p>
            </div>

            {/* Right form panel */}
            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-650">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-black tracking-tight text-slate-900">
                            GREENGROW ADMIN
                        </span>
                    </div>

                    <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
                        Welcome back 👋
                    </h1>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Sign in to access the Greengrow admin dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">
                                Email Address
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-3 focus-within:border-emerald-650 focus-within:ring-2 focus-within:ring-emerald-100">
                                <Mail className="h-[18px] w-[18px] text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@greengrow.in"
                                    className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-emerald-650 hover:underline"
                                >
                                    Forgot?
                                </button>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-3 focus-within:border-emerald-650 focus-within:ring-2 focus-within:ring-emerald-100">
                                <Lock className="h-[18px] w-[18px] text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="text-slate-400 hover:text-slate-600"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-[18px] w-[18px]" />
                                    ) : (
                                        <Eye className="h-[18px] w-[18px]" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-stone-300 text-emerald-650 focus:ring-emerald-100"
                            />
                            Keep me signed in
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-650 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 transition-all hover:bg-emerald-750 disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                            {!loading && <ArrowRight className="h-[18px] w-[18px]" />}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-400">
                        Protected area · Unauthorized access is prohibited
                    </p>
                </div>
            </div>
        </div>
    );
}
