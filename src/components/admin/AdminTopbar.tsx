"use client";

import { Menu, Search, Bell } from "lucide-react";

interface AdminTopbarProps {
    title: string;
    subtitle?: string;
    onMenuClick: () => void;
}

export default function AdminTopbar({ title, subtitle, onMenuClick }: AdminTopbarProps) {
    return (
        <header className="sticky top-0 z-30 border-b border-stone-100 bg-white/90 px-4 py-3.5 backdrop-blur-md md:px-8">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="rounded-xl border border-stone-200 p-2 text-slate-700 hover:bg-stone-50 lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="font-display text-lg font-extrabold tracking-tight text-slate-900 md:text-xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="hidden text-xs text-slate-500 sm:block">{subtitle}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <div className="hidden items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 md:flex">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-40 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </div>
                    <button
                        className="relative rounded-xl border border-stone-200 p-2 text-slate-700 hover:bg-stone-50"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
                    </button>
                    <div className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white px-2 py-1.5 md:px-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-650 text-sm font-bold text-white">
                            A
                        </div>
                        <div className="hidden leading-tight md:block">
                            <p className="text-xs font-bold text-slate-900">Admin</p>
                            <p className="text-[10px] text-slate-500">Super User</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
