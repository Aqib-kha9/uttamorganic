"use client";

import Link from "next/link";
import {
    Image as ImageIcon,
    LayoutGrid,
    Sprout,
    Package,
    Newspaper,
    Truck,
    Inbox,
    Phone,
    ArrowRight,
    TrendingUp,
} from "lucide-react";
import type {
    HeroSlide,
    CategoryItem,
    CropItem,
    BlogItem,
    DealerApplication,
    ContactEnquiry,
} from "@/data/adminContent";
import type { Product } from "@/data/products";
import { useResource } from "@/lib/client/useResource";

export default function AdminDashboard() {
    const { items: slides } = useResource<HeroSlide>("hero");
    const { items: categories } = useResource<CategoryItem>("categories");
    const { items: crops } = useResource<CropItem>("crops");
    const { items: products } = useResource<Product>("products");
    const { items: blogs } = useResource<BlogItem>("blogs");
    const { items: dealers } = useResource<DealerApplication>("dealers");
    const { items: enquiries } = useResource<ContactEnquiry>("enquiries");

    const cards = [
        { label: "Hero Slides", count: slides.length, href: "/admin/hero", icon: ImageIcon, tint: "bg-emerald-50 text-emerald-700" },
        { label: "Categories", count: categories.length, href: "/admin/categories", icon: LayoutGrid, tint: "bg-sky-50 text-sky-700" },
        { label: "Crop Schedules", count: crops.length, href: "/admin/crops", icon: Sprout, tint: "bg-amber-50 text-amber-700" },
        { label: "Products", count: products.length, href: "/admin/products", icon: Package, tint: "bg-violet-50 text-violet-700" },
        { label: "Blogs", count: blogs.length, href: "/admin/blogs", icon: Newspaper, tint: "bg-rose-50 text-rose-700" },
        { label: "D2C Section", count: 1, href: "/admin/d2c", icon: Truck, tint: "bg-teal-50 text-teal-700" },
    ];

    const inboxStats = [
        {
            label: "Dealer Applications",
            count: dealers.filter((d) => d.status === "New").length,
            total: dealers.length,
            href: "/admin/dealers",
            icon: Inbox,
        },
        {
            label: "Contact Enquiries",
            count: enquiries.filter((e) => e.status === "New").length,
            total: enquiries.length,
            href: "/admin/enquiries",
            icon: Phone,
        },
    ];
    return (
        <div className="space-y-8">
            {/* Welcome banner */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-700 p-7 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200/80">
                    Greengrow Admin
                </p>
                <h1 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    Welcome back, Admin 👋
                </h1>
                <p className="mt-2 max-w-xl text-sm text-emerald-100/90">
                    Manage every piece of dynamic content shown on the public website — hero, categories, crop schedules, blogs, D2C section, contact details and your inbox.
                </p>
            </div>

            {/* Content cards */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900">
                        Website Content
                    </h2>
                    <span className="text-xs font-semibold text-slate-400">
                        {cards.length} sections
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {cards.map((c) => {
                        const Icon = c.icon;
                        return (
                            <Link
                                key={c.label}
                                href={c.href}
                                className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                            >
                                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.tint}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <p className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
                                    {c.count}
                                </p>
                                <p className="text-xs font-semibold text-slate-500">{c.label}</p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Inbox */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900">
                        Inbox
                    </h2>
                    <span className="text-xs font-semibold text-slate-400">Live submissions</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {inboxStats.map((s) => {
                        const Icon = s.icon;
                        return (
                            <Link
                                key={s.label}
                                href={s.href}
                                className="group flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-display text-base font-extrabold tracking-tight text-slate-900">
                                            {s.label}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            <span className="font-bold text-emerald-700">{s.count} new</span> · {s.total} total
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600" />
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Quick links */}
            <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <h3 className="font-display text-sm font-extrabold tracking-tight text-slate-900">
                        Quick Actions
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href="/admin/hero" className="rounded-xl bg-stone-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-stone-200">
                        + Edit Hero Banner
                    </Link>
                    <Link href="/admin/blogs" className="rounded-xl bg-stone-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-stone-200">
                        + New Blog Post
                    </Link>
                    <Link href="/admin/contact-details" className="rounded-xl bg-stone-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-stone-200">
                        Update Contact Info
                    </Link>
                    <Link href="/admin/dealers" className="rounded-xl bg-stone-100 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-stone-200">
                        Review Dealers
                    </Link>
                </div>
            </section>
        </div>
    );
}
