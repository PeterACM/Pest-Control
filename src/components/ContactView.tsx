import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO, DURBAN_SUBURBS } from '../data/pestData';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert, CheckCircle2, Building2, PhoneCall } from 'lucide-react';

interface ContactViewProps {
  onOpenBooking: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenBooking }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    suburb: 'Umbilo',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitted(true);
  };

  return (
    <div id="contact-view-container" className="space-y-0 bg-white">
      {/* Header */}
      <motion.section 
        id="contact-header-section" 
        className="py-16 bg-emerald-900 text-white border-b-4 border-emerald-950"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            Direct Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Contact Pest Free Services
          </h1>
          <p className="text-emerald-100 text-base mt-3 leading-relaxed font-medium">
            Have questions about wood-borer assessments, termite control, roach gel application, or timber repairs in Durban? Get in touch with our team today.
          </p>
        </div>
      </motion.section>

      {/* Main Contact Grid */}
      <motion.section 
        id="contact-content-section" 
        className="py-16 bg-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* Emergency Banner */}
              <div className="p-6 bg-red-800 text-white border-2 border-red-500 rounded-3xl space-y-3 shadow-2xl">
                <div className="flex items-center gap-3 text-amber-300">
                  <ShieldAlert className="w-7 h-7 animate-bounce" />
                  <h3 className="font-black text-lg uppercase tracking-wide">Pest Control Line</h3>
                </div>
                <p className="text-xs text-red-100 leading-relaxed font-medium">
                  For urgent pest control inquiries or borer inspection requests in greater Durban:
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3.5 rounded-xl bg-red-950 hover:bg-black text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl border border-red-500 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>Call Us: {BUSINESS_INFO.phone}</span>
                </a>
              </div>

              {/* Direct Details */}
              <div className="p-6 bg-emerald-900 text-white rounded-3xl border-2 border-emerald-500 space-y-6 shadow-xl">
                <h3 className="text-base font-black text-white border-b border-emerald-700 pb-3 uppercase tracking-wider">Durban HQ Details</h3>

                <div className="space-y-4 text-xs font-semibold text-emerald-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-black uppercase text-[11px]">Physical Address</strong>
                      <span>{BUSINESS_INFO.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-black uppercase text-[11px]">Landline Phone</strong>
                      <a href={`tel:${BUSINESS_INFO.landline.replace(/\s+/g, '')}`} className="hover:text-amber-300 font-bold block text-sm">
                        Tel: {BUSINESS_INFO.landline}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-black uppercase text-[11px]">Email Inquiries</strong>
                      <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-amber-300 font-bold">
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-black uppercase text-[11px]">Operating Hours</strong>
                      <span>{BUSINESS_INFO.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 text-emerald-100 rounded-2xl border border-emerald-600 text-xs space-y-1">
                  <p className="font-black text-white">{BUSINESS_INFO.name}</p>
                  <p className="text-emerald-300">Close Corp Reg: {BUSINESS_INFO.regNumber}</p>
                  <p className="text-amber-300">P36112 Department of Agriculture Licensed</p>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-3xl border-2 border-emerald-200 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-md mx-auto">
                      Thank you for contacting Pest Free Services. Our team will review your query and respond promptly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">Send an Inquiry</h2>
                      <p className="text-xs text-slate-600 font-medium mt-1">Fill out the form below and we will contact you promptly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                      <div>
                        <label className="block text-slate-900 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Smith"
                          className="w-full p-3 rounded-xl border-2 border-emerald-300 focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-900 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 031 205 3371"
                          className="w-full p-3 rounded-xl border-2 border-emerald-300 focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-900 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@example.co.za"
                          className="w-full p-3 rounded-xl border-2 border-emerald-300 focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-900 mb-1">Durban Suburb</label>
                        <select
                          value={formData.suburb}
                          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                          className="w-full p-3 rounded-xl border-2 border-emerald-300 text-sm font-semibold focus:ring-2 focus:ring-red-500 bg-white"
                        >
                          {DURBAN_SUBURBS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-900 mb-1">Message or Service Request *</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe your wood-borer assessment, pest control, or wood replacement needs..."
                          className="w-full p-3 rounded-xl border-2 border-emerald-300 focus:ring-2 focus:ring-red-500 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-sm shadow-xl border border-red-500 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Greater Durban Service Area Map Visual */}
      <motion.section 
        id="map-coverage-section" 
        className="py-16 bg-slate-950 text-white"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-emerald-900 text-white border-2 border-emerald-500 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">Greater Durban Service Coverage</h2>
                <p className="text-xs text-emerald-200 font-medium mt-1">Providing licensed pest control & timber replacement services across Durban since 2011.</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-lg border border-red-500 shrink-0"
              >
                Book Assessment in Your Area
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {DURBAN_SUBURBS.map((sub) => (
                <span key={sub} className="text-xs bg-slate-950 text-amber-300 px-3.5 py-1.5 rounded-xl border border-emerald-600 font-bold shadow-md">
                  ✓ {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
