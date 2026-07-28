"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminShellProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function AdminShell({ title, subtitle, children }: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-stone-50">
            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex min-w-0 flex-1 flex-col">
                <AdminTopbar
                    title={title}
                    subtitle={subtitle}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
            </div>
        </div>
    );
}
