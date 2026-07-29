"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CATEGORY_ITEMS, type CategoryItem } from "@/data/adminContent";
import { useResource } from "@/lib/client/useResource";

export default function CategoriesPage() {
  const { items: categories, error } = useResource<CategoryItem>("categories", CATEGORY_ITEMS);

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 space-y-8">

      {/* Page Header */}
      <div className="text-left space-y-0.5">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">
          Departments
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Shop By Category
        </h1>
        <p className="text-stone-400 text-[10px] sm:text-xs font-semibold">
          Select a category to browse targeted crop protection and bio-inputs.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
          Live categories are temporarily unavailable. Showing the saved categories.
        </p>
      )}

      {/* High Density E-commerce Category Grid (3 cols on mobile, 5 cols on desktop) */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.name}`}
            className="group cursor-pointer flex flex-col items-center text-center space-y-1.5"
          >
            {/* Square Image container */}
            <div className="aspect-square w-full rounded-2xl overflow-hidden relative bg-stone-50 border border-stone-200/50 shadow-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Typography */}
            <div className="space-y-0.5">
              <h3 className="text-[10px] sm:text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[8px] sm:text-[9px] font-bold text-stone-400 block">
                {cat.count} Items
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Brochure download CTA - Compact & Low-Profile Banner */}
      <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-0.5 text-left">
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-[9px] font-black uppercase tracking-wider">
            <BookOpen className="w-3 h-3 shrink-0" />
            <span>Product Catalogue</span>
          </div>
          <h2 className="text-xs sm:text-sm font-black text-slate-900">
            Download Crop Protection Catalog (PDF)
          </h2>
          <p className="text-stone-400 text-[9px] sm:text-xs font-medium">
            Get offline access to ingredient schedules and recommended dosage charts.
          </p>
        </div>

        <a
          href="/brochure-mock.pdf"
          download
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-sm transition-all text-center shrink-0 w-full sm:w-auto"
          onClick={(e) => {
            e.preventDefault();
            alert("Greengrow Fertilizer Product Catalogue PDF Download started! (Mock download triggered successfully)");
          }}
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
