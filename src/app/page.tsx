"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Truck, Users, Award, BookOpen, ChevronRight, Check, CheckCircle2, Leaf, Zap, HelpCircle, Sparkles, Sprout, Shield, FlaskConical, Scissors } from "lucide-react";
import { PRODUCTS, CROPS, CATEGORIES, Product } from "@/data/products";
import ProductModal from "@/components/ProductModal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/assets/hero_1.jpeg",
      headline: <>Get Free <span className="text-emerald-400">Parichay Combo</span> Direct From Factory</>,
      subtext: "Save up to 70% middleman commission on certified bio-inputs."
    },
    {
      image: "/assets/hero_2.jpeg",
      headline: <>Protect Crops with <span className="text-emerald-400">Certified Bio-Pesticides</span></>,
      subtext: "Organic control against sucking pests, thrips, and mites."
    },
    {
      image: "/assets/hero_3.jpeg",
      headline: <>NABL Lab-Tested <span className="text-emerald-400">Scientific Formulations</span></>,
      subtext: "Synthesized in central chemical units under strict double-seal guarantees."
    },
    {
      image: "/assets/product_3.jpeg",
      headline: <>Premium Organic <span className="text-emerald-400">Soil Conditioners & Nutrients</span></>,
      subtext: "Scientific formulations to boost root health and overall crop yield."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Take first 4 products for showcase
  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.slice(4, 8);

  const stats = [
    { label: "Happy Farmers", count: "10 Lakhs+", icon: Users, desc: "Pan-India active community" },
    { label: "Bio Formulations", count: "250+", icon: Leaf, desc: "Lab certified & tested" },
    { label: "Pincodes Covered", count: "20,000+", icon: Truck, desc: "Direct express delivery" },
    { label: "Quality Standards", count: "100%", icon: Award, desc: "NABL certified batches" }
  ];

  const blogs = [
    {
      title: "No Middlemen, No Overpricing – Direct to Farm Revolution",
      date: "June 16, 2026",
      desc: "Indian farmers are the backbone of our country - but they often face high costs and low-quality products. Read how Greengrow Fertilizer changes this.",
      category: "D2C Agriculture"
    },
    {
      title: "Best Soybean Varieties for High Yield in 2026",
      date: "May 22, 2026",
      desc: "Success in soybean farming depends heavily on variety selection. Discover the top high-yield soybean varieties designed for this season.",
      category: "Crop Yield Tips"
    },
    {
      title: "Eliminating Summer Sucking Pests with 1 Single Bio-Spray",
      date: "May 06, 2026",
      desc: "As temperatures soar, whiteflies, thrips, and mites damage major crops. Here is our scientific prevention schedule.",
      category: "Pest Management"
    }
  ];

  return (
    <div className="space-y-8 pb-24 bg-stone-50/50">
      {/* 1. Mobile App Hero Promotion Banner */}
      <section className="w-full px-4 pt-3 relative md:h-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-sm h-[calc(100vh-350px)] md:h-[calc(100vh-88px)] bg-stone-900 w-full flex items-center">
          {/* Sliding Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
            style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Centered Main Headline at the Top */}
          <div className="absolute top-8 sm:top-16 md:top-24 inset-x-0 mx-auto text-center px-6 max-w-3xl z-10">
            <h1 className="text-xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {slides[currentSlide].headline}
            </h1>
          </div>

          {/* Carousel Navigation Dot Indicators */}
          <div className="absolute bottom-16 sm:bottom-24 md:bottom-28 inset-x-0 mx-auto flex justify-center gap-1.5 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Bottom Row Layout: Subtext on bottom-left, Button on bottom-right */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-3.5">
            <p className="text-stone-300 text-xs sm:text-sm font-bold leading-none">
              {slides[currentSlide].subtext}
            </p>
            <Link 
              href="/products" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0"
            >
              Claim Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* 2. E-Commerce Premium Category Cards Slider/Grid */}
      <section className="w-full px-4 space-y-4 max-w-7xl mx-auto !mt-3">
        <div>
          <h2 className="text-base sm:text-2xl font-black text-slate-900 font-sans">Shop By Category</h2>
        </div>
        
        {/* Mobile: Horizontal Scroll Slider | Desktop: Grid */}
        <div className="flex gap-3.5 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
          {CATEGORIES.map((cat, idx) => {
            const localImages = [
              "/assets/hero_2.jpeg",
              "/assets/product_2.jpeg",
              "/assets/product_3.jpeg",
              "/assets/product_4.jpeg",
              "/assets/hero_1.jpeg"
            ];
            const imgSrc = localImages[idx] || localImages[0];
            return (
              <Link
                key={cat.name}
                href={`/products?category=${cat.name}`}
                className="relative rounded-xl overflow-hidden shadow-sm h-24 sm:h-44 w-[110px] md:w-full shrink-0 snap-start flex items-end group cursor-pointer border border-stone-200/50"
              >
                {/* Background Image */}
                <img 
                  src={imgSrc} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent group-hover:via-stone-900/50 transition-colors" />
                
                {/* Text Content */}
                <div className="relative z-10 p-2.5 space-y-0.5 w-full">
                  <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest block">
                    {cat.count} Products
                  </span>
                  <h3 className="text-[10px] sm:text-sm font-black text-white leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Best Seller/Featured Products - E-Commerce App Feed (2-Column Grid on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-900">Recommended Products</h2>
          </div>
          <Link href="/products" className="text-emerald-655 hover:text-emerald-700 text-xs font-extrabold shrink-0">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {featuredProducts.map((prod) => (
            <Link
              key={prod.id}
              href={`/products/${prod.id}`}
              className="bg-white border border-stone-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative text-left"
            >
              {/* Premium Discount Tag */}
              <div className="absolute top-2.5 left-2.5 z-10 bg-emerald-900 text-white text-[8px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                {prod.discount}% Off
              </div>

              <div className="p-3 flex-grow">
                {/* Visual Packaging Image Container */}
                <div className="aspect-square rounded-xl bg-stone-50 flex items-center justify-center mb-3.5 relative overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                  />
                </div>

                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400 block">{(prod as any).category}</span>
                <h3 className="text-xs font-black text-slate-905 mt-1 leading-snug line-clamp-2 transition-colors group-hover:text-emerald-700">
                  {prod.name}
                </h3>

                {/* Star Rating - Clean Typographic Layout */}
                <div className="flex items-center gap-1 mt-1.5">
                  <Star className="w-3 h-3 text-amber-500 fill-current shrink-0" />
                  <span className="text-[10px] text-slate-700 font-black">4.8</span>
                  <span className="text-[9px] text-slate-400 font-bold">({prod.reviews})</span>
                </div>
              </div>

              {/* Pricing & CTA panel */}
              <div className="p-3 pt-0 flex items-center justify-between gap-2 mt-auto">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-slate-900">₹{prod.currentPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 line-through font-medium">₹{prod.originalPrice.toLocaleString()}</span>
                </div>
                <span className="bg-emerald-50 text-emerald-805 border border-emerald-100/50 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all duration-300 shrink-0">
                  Enquire
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Shop By Crop - Premium Interactive Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div>
          <h2 className="text-base sm:text-2xl font-black text-slate-900">Customized Schedules By Crops</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {(() => {
            const cropImages = [
              "/assets/hero_1.jpeg", // Tomato
              "/assets/hero_2.jpeg", // Cotton
              "/assets/hero_3.jpeg", // Paddy
              "/assets/hero_2.jpeg", // Chilli
              "/assets/product_2.jpeg", // Sugarcane
              "/assets/product_3.jpeg", // Wheat
              "/assets/product_4.jpeg", // Brinjal
              "/assets/hero_1.jpeg"  // Mango
            ];

            return CROPS.map((crop, idx) => (
              <Link
                key={crop.name}
                href={`/products?search=${crop.name}`}
                className="relative rounded-2xl overflow-hidden shadow-sm h-36 w-full flex items-end group cursor-pointer border border-stone-200/50"
              >
                <img 
                  src={cropImages[idx]} 
                  alt={crop.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent group-hover:via-stone-900/50 transition-all" />
                
                <div className="relative z-10 p-3.5 space-y-0.5 w-full">
                  <h3 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {crop.name}
                  </h3>
                  <p className="text-[9px] text-stone-300 font-semibold truncate leading-none">
                    {crop.desc}
                  </p>
                </div>
              </Link>
            ));
          })()}
        </div>
      </section>

      {/* 6. D2C Feature Section - Mobile-First Unified Image Overlay Card */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-sm h-56 sm:h-64 md:h-[260px] bg-stone-900 w-full flex items-end p-4.5 sm:p-8">
          {/* Background Image */}
          <img 
            src="/assets/hero_2.jpeg" 
            alt="Greengrow Fertilizer factory dispatch unit" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          {/* Dark Gradient Mask for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />

          {/* Overlay Typography Container */}
          <div className="relative z-10 max-w-2xl space-y-2.5 text-white text-left">
            <div className="space-y-0.5">
              <span className="text-[8px] sm:text-[9px] font-black text-emerald-450 uppercase tracking-widest block">
                Direct to Farm
              </span>
              <h2 className="text-sm sm:text-xl md:text-2xl font-black leading-tight">
                India's Premier Factory-to-Farm Agricultural Brand
              </h2>
            </div>
            
            <p className="text-stone-300 text-[9px] sm:text-xs leading-normal max-w-xl font-medium">
              We operate a complete laboratory to synthesis cycle. Bypassing stockists, transport agents, and retail dealer grids saves farmers up to 70% while guaranteeing authentic fresh formulation batches.
            </p>

            {/* Compact Horizontal Row for Mobile */}
            <div className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[8px] sm:text-[10px] font-black text-emerald-400">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                Direct Prices
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                Free Delivery
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                Expert Helpline
              </span>
            </div>

            <div className="pt-0.5">
              <Link
                href="/about"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-black text-[9px] sm:text-xs uppercase tracking-wider inline-block shadow-md transition-all duration-300"
              >
                Explore Our Journey
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 6.2 Best Seller Products Feed */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-900">Best Seller Solubles</h2>
          </div>
          <Link href="/products" className="text-emerald-655 hover:text-emerald-700 text-xs font-extrabold shrink-0">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {bestSellers.map((prod) => (
            <Link
              key={prod.id}
              href={`/products/${prod.id}`}
              className="bg-white border border-stone-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative text-left"
            >
              {/* Premium Discount Tag */}
              <div className="absolute top-2.5 left-2.5 z-10 bg-emerald-900 text-white text-[8px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                {prod.discount}% Off
              </div>

              <div className="p-3 flex-grow">
                {/* Visual Packaging Image Container */}
                <div className="aspect-square rounded-xl bg-stone-50 flex items-center justify-center mb-3.5 relative overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                  />
                </div>

                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400 block">{(prod as any).category}</span>
                <h3 className="text-xs font-black text-slate-905 mt-1 leading-snug line-clamp-2 transition-colors group-hover:text-emerald-700">
                  {prod.name}
                </h3>

                {/* Star Rating - Clean Typographic Layout */}
                <div className="flex items-center gap-1 mt-1.5">
                  <Star className="w-3 h-3 text-amber-500 fill-current shrink-0" />
                  <span className="text-[10px] text-slate-700 font-black">4.9</span>
                  <span className="text-[9px] text-slate-400 font-bold">({prod.reviews})</span>
                </div>
              </div>

              {/* Pricing & CTA panel */}
              <div className="p-3 pt-0 flex items-center justify-between gap-2 mt-auto">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-slate-900">₹{prod.currentPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 line-through font-medium">₹{prod.originalPrice.toLocaleString()}</span>
                </div>
                <span className="bg-emerald-50 text-emerald-850 border border-emerald-100/50 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all duration-300 shrink-0">
                  Enquire
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Agricultural Blogs - Premium Editorial Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-left space-y-1">
          <h2 className="text-base sm:text-2xl font-black text-slate-900">Agri Advisor & News</h2>
          <p className="text-stone-500 text-xs sm:text-sm">Professional advice on crop safety, organic nutrients, and seasonal farming tips.</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3.5 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          {(() => {
            const blogImages = [
              "/assets/hero_3.jpeg", // Direct to farm
              "/assets/hero_1.jpeg", // Soybean
              "/assets/product_2.jpeg"  // Pest spray
            ];

            return blogs.map((blog, idx) => (
              <article key={idx} className="group cursor-pointer flex flex-col justify-between space-y-3.5 shrink-0 w-[240px] sm:w-[300px] md:w-full snap-start">
                <div>
                  {/* Blog Aspect Ratio Image Container */}
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative bg-stone-100 shadow-sm">
                    <img 
                      src={blogImages[idx]} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    />
                  </div>

                  {/* Metadata: Category & Date */}
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider mt-1">
                    <span className="text-emerald-700">{blog.category}</span>
                    <span className="text-stone-400">{blog.date}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm sm:text-base font-black text-slate-900 mt-2 leading-snug line-clamp-2 transition-colors group-hover:text-emerald-750">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 mt-1.5 font-medium">
                    {blog.desc}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-slate-900 group-hover:text-emerald-700 text-xs font-black inline-flex items-center gap-1 transition-colors">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            ));
          })()}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
