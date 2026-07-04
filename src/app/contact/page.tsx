"use client";

import { useState } from "react";
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    farmName: "",
    mobileNumber: "",
    emailAddress: "",
    cityState: "",
    enquiryType: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        farmName: "",
        mobileNumber: "",
        emailAddress: "",
        cityState: "",
        enquiryType: "General Inquiry",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="py-6 sm:py-10 max-w-4xl mx-auto px-4 space-y-8">
      
      {/* 1. Page Header */}
      <section className="text-left space-y-0.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-650">
          Get In Touch
        </span>
        <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          We Are Here To Help You
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm font-medium max-w-xl">
          Have queries about application dosages, bulk orders, or shipping speeds? Send us a message, and our agronomists will revert promptly.
        </p>
      </section>

      {/* 2. Grid: Form & Contact details (Form loads first on mobile, columns on desktop) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Enquiry Form Card (Spans 7 columns) */}
        <div className="md:col-span-7 bg-white border border-stone-200/60 rounded-2xl p-5 sm:p-8 shadow-sm order-1">
          <div className="border-b border-stone-150 pb-4 mb-5">
            <h2 className="text-sm sm:text-base font-black text-slate-950">Send Corporate Enquiry</h2>
            <p className="text-[10px] sm:text-xs text-stone-400 font-semibold mt-0.5">Fill out your details to get support.</p>
          </div>

          {submitted ? (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-0.5">Enquiry Forwarded!</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-5 leading-normal">
                Your message has been sent. An agricultural advisor will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-emerald-650 hover:text-emerald-705 text-xs font-black transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile"
                    className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    required
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">Farm / Company Name</label>
                  <input
                    type="text"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">Enquiry Type</label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleInputChange}
                    className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-semibold"
                  >
                    <option>General Inquiry</option>
                    <option>Product Dosage Request</option>
                    <option>Dealer Partnership</option>
                    <option>Bulk Farm Procurement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">City & State</label>
                <input
                  type="text"
                  name="cityState"
                  required
                  value={formData.cityState}
                  onChange={handleInputChange}
                  placeholder="e.g. Bhopal, MP"
                  className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-wider mb-1.5">Message / Requirements</label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Explain your farming concerns or required product list..."
                  className="w-full bg-stone-50 text-slate-800 text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all resize-none font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Info Cards (Spans 5 columns, loads second on mobile) */}
        <div className="md:col-span-5 space-y-6 order-2">
          <div className="bg-white border border-stone-200/50 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 text-left">
            <h2 className="text-sm sm:text-base font-black text-slate-955 border-b border-stone-150 pb-3">Uttam Office Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-black text-stone-400 uppercase tracking-wider">Corporate Headquarters</span>
                  <p className="text-xs font-bold text-slate-700 mt-0.5 leading-relaxed">
                    Mx 175, E7 Extension, Arera Colony,<br />
                    Bhopal - 462016, Madhya Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-black text-stone-400 uppercase tracking-wider">Call Support</span>
                  <a href="tel:+917000528397" className="block text-xs font-bold text-slate-700 hover:text-emerald-600 mt-0.5">
                    +91 7000528397
                  </a>
                  <span className="block text-[8px] text-stone-400">Direct sales line & dealership cell</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-black text-stone-400 uppercase tracking-wider">Email Inquiry</span>
                  <a href="mailto:support@uttamorganic.com" className="block text-xs font-bold text-slate-700 hover:text-emerald-600 mt-0.5">
                    support@uttamorganic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-black text-stone-400 uppercase tracking-wider">Office Hours</span>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    <span className="text-[10px] font-normal text-stone-400">Closed on Sundays & Holidays</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Iframe */}
          <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-stone-200/50 relative shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.8624103197607!2d77.43391787612711!3d23.211656809756184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c2272e51bb%3A0xe54d2459b9a67232!2sArera%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh%20462016!5e0!3m2!1sen!2sin!4v1719876543210!5m2!1sen!2sin" 
              className="w-full h-full border-0" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </section>
    </div>
  );
}
