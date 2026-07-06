import { ShieldCheck, FileText, Scale } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white border border-slate-200/60 shadow-xl rounded-3xl p-6 sm:p-10 space-y-10">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 text-center space-y-2">
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Legal Policies
          </span>
          <h1 className="text-3xl font-black text-slate-950">Privacy Policy & Terms of Service</h1>
          <p className="text-slate-400 text-xs">Last updated: July 2026</p>
        </div>

        {/* Section 1: Privacy Policy */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-lg">
            <ShieldCheck className="w-5 h-5" />
            <h2>Privacy Policy</h2>
          </div>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">
            <p>
              At Greengrow Fertilizer, accessible from greengrowfertilizer25@gmail.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Greengrow Fertilizer and how we use it.
            </p>
            <h3 className="font-bold text-slate-900 text-sm">Information We Collect</h3>
            <p>
              When you submit an inquiry form or dealership request, we ask for your name, farm/company name, mobile number, email address, and geographic location. This data is strictly used to evaluate dealership applications or provide customized agricultural consultation.
            </p>
            <h3 className="font-bold text-slate-900 text-sm">Data Safety</h3>
            <p>
              We do not sell, rent, or lease your personal information to third-party marketing companies. All inputs are handled in accordance with Indian IT security standards.
            </p>
          </div>
        </section>

        {/* Section 2: Terms of Service */}
        <section className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-lg">
            <Scale className="w-5 h-5" />
            <h2>Terms & Conditions</h2>
          </div>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use Greengrow Fertilizer if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <h3 className="font-bold text-slate-900 text-sm">Product Suitability</h3>
            <p>
              Agrochemical treatments and fertilizer recommendations depend on local soil condition, ambient water purity, and ambient heat levels. Greengrow Fertilizer is not directly liable for crop losses resulting from wrong application dosages or off-label use. Please consult our agronomists for customized schedules.
            </p>
            <h3 className="font-bold text-slate-900 text-sm">Copyright</h3>
            <p>
              Unless otherwise stated, Greengrow Fertilizer owns the intellectual property rights for all material on Greengrow Fertilizer. All intellectual property rights are reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
