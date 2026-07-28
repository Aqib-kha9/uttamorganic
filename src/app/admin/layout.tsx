import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
    title: "Admin Panel · Greengrow Fertilizer",
    description: "Greengrow admin dashboard for managing website content, products and inbox.",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AdminShell title="Greengrow Admin" subtitle="Manage your website content">{children}</AdminShell>;
}
