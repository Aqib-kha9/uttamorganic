import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const shopByCategories = [
    "Fertilizers", "Pesticides", "Fungicides", "Herbicides", "Combos"
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Products", href: "/products" },
    { name: "Product Categories", href: "/categories" },
    { name: "Dealer / Distributor Form", href: "/dealer" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy & Terms", href: "/privacy" }
  ];

  return (
    <footer className="bg-stone-50 text-stone-600 border-t border-stone-200/80 pt-16 pb-10">
      {/* 1. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4 text-left">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 block">UTTAM ORGANIC</span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-650 font-bold block -mt-1">D2C Agrochemicals</span>
            </div>
          </Link>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">
            India's direct-to-farm crop protectant and bio-stimulant synthesis brand. Delivering certified, lab-tested batches straight from the factory door to your field.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-2.5 pt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-emerald-600 hover:border-emerald-600/30 transition-all shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-emerald-600 hover:border-emerald-600/30 transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-emerald-600 hover:border-emerald-600/30 transition-all shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Solutions Categories */}
        <div className="space-y-4 text-left">
          <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest">Solutions</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
            {shopByCategories.map((cat) => (
              <li key={cat}>
                <Link href={`/products?category=${cat}`} className="hover:text-emerald-650 transition-colors">
                  {cat} Solutions
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Navigation Links */}
        <div className="space-y-4 text-left">
          <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-bold">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-emerald-655 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Support */}
        <div className="space-y-4 text-left">
          <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest">Corporate Office</h4>
          <div className="space-y-3.5 text-xs sm:text-sm font-bold text-stone-500">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-normal">
                Mx 175, E7 Extension, Arera Colony,<br />
                Bhopal - 462016, Madhya Pradesh, India
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href="tel:+917000528397" className="hover:text-emerald-650 transition-colors">
                +91 7000528397
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href="mailto:support@uttamorganic.com" className="hover:text-emerald-650 transition-colors">
                support@uttamorganic.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Copyright and links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mt-6 border-t border-stone-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-stone-500">
        <p>© {new Date().getFullYear()} Uttam Organic Private Limited. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-stone-700">Privacy Policy</Link>
          <Link href="/privacy" className="hover:text-stone-700">Terms of Service</Link>
          <a href="https://wa.me/917000528397" target="_blank" rel="noopener noreferrer" className="text-emerald-650 hover:text-emerald-700 flex items-center gap-1">
            WhatsApp Support <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
