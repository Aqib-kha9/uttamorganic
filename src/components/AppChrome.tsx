"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppWidget from "./WhatsAppWidget";

export default function AppChrome({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            <main className="flex-grow pb-16 md:pb-0">{children}</main>
            {!isAdmin && <Footer />}
            {!isAdmin && <WhatsAppWidget />}
        </>
    );
}
