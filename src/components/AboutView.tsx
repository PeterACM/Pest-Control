import React from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/pestData';
import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Building2, FileText, PhoneCall, Sparkles, Wrench } from 'lucide-react';
import woodBorerTreatmentImg from '../assets/images/wood_borer_treatment_1784765757008.jpg';

interface AboutViewProps {
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBooking }) => {
  return (
    <div id="about-view-container" className="space-y-0 bg-white">
      {/* Page Header */}
      <motion.section 
        id="about-header-section" 
        className="py-16 bg-emerald-900 text-white border-b-4 border-emerald-950"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            About Pest Free Services CC
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Professional Pest Control & Assessment Standards
          </h1>
          <p className="text-emerald-100 text-base mt-3 leading-relaxed font-medium">
            Trading as Pest Free Services since April 2011, we deliver registered chemical pest control and alternative-to-fumigation solutions across Durban and KwaZulu-Natal.
          </p>
        </div>
      </motion.section>

      {/* Origin & Standards Section */}
      <motion.section 
        id="about-story-section" 
        className="py-16 bg-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-600 bg-slate-950">
                <img 
                  src={woodBorerTreatmentImg} 
                  alt="Wood Borer Treatment Assessment Durban" 
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = '/wood_borer_treatment_1784765757008.jpg';
                    }
                  }}
                />
              </div>
              <div className="mt-4 p-5 rounded-2xl bg-emerald-900 text-white border-2 border-emerald-500 shadow-xl text-xs">
                <strong className="text-amber-300 block mb-1 uppercase font-black text-xs tracking-wide">Dept. of Agriculture Licensing</strong>
                It is compulsory to use registered chemical products to treat wood borer and timber pests. All treatments comply strictly with South African agricultural regulations.
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-black text-white bg-emerald-700 px-3.5 py-1 rounded-md uppercase tracking-wider">
                Company Profile & History
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Specialists in Wood-Borer, Termite & Roach Control
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                Pest Free Services was founded in 2011 by Grant Arnold. Over the past 14+ years, the company has evolved into a premier pest control provider serving residential homes, commercial premises, and body corporates throughout KwaZulu-Natal.
              </p>

              <div className="p-5 bg-emerald-950 text-white rounded-2xl border-2 border-emerald-500 shadow-xl space-y-2">
                <p className="text-xs font-black text-amber-300 uppercase tracking-wide">Compulsory Property Assessments:</p>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  We specialize in providing an effective alternative to fumigation using registered borer control products. However, an on-site property assessment is compulsory to inspect timber accessibility. If timber is sealed within inaccessible voids, we refer property owners to trusted tent fumigators.
                </p>
              </div>

              <div className="p-5 bg-red-900 text-white rounded-2xl border-2 border-red-500 shadow-xl space-y-2">
                <p className="text-xs font-black text-amber-300 uppercase tracking-wide">Specialist Sub-Contracted Wood Replacement:</p>
                <p className="text-xs text-slate-100 leading-relaxed font-medium">
                  When wood-borer or rot damages timber fixtures, Pest Free Services dispatches experienced, independent sub-contractors who specialize in repairing and replacing damaged roof structures, doors, window frames, and flooring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Corporate Credentials Card */}
      <motion.section 
        id="credentials-section" 
        className="py-16 bg-slate-950 text-white border-b-4 border-emerald-600"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-emerald-950 bg-emerald-400 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              Transparency & Legal Registration
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
              Official Business Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-emerald-900 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-2">
              <Building2 className="w-8 h-8 text-amber-300 mb-2" />
              <h3 className="text-xs font-black text-emerald-200 uppercase">Registered Name</h3>
              <p className="text-sm font-black text-white">{BUSINESS_INFO.name}</p>
              <p className="text-xs text-emerald-200">Close Corporation (CC)</p>
            </div>

            <div className="p-6 bg-emerald-900 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-2">
              <FileText className="w-8 h-8 text-amber-300 mb-2" />
              <h3 className="text-xs font-black text-emerald-200 uppercase">Registration No</h3>
              <p className="text-sm font-black text-white">{BUSINESS_INFO.regNumber}</p>
              <p className="text-xs text-emerald-200">Incorp. 28 April 2011</p>
            </div>

            <div className="p-6 bg-emerald-900 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-2">
              <Award className="w-8 h-8 text-amber-300 mb-2" />
              <h3 className="text-xs font-black text-emerald-200 uppercase">Licensing & VAT</h3>
              <p className="text-sm font-black text-white">VAT: {BUSINESS_INFO.vatNumber}</p>
              <p className="text-xs text-emerald-200">Dept. of Agriculture Licensed</p>
            </div>

            <div className="p-6 bg-emerald-900 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-2">
              <MapPin className="w-8 h-8 text-amber-300 mb-2" />
              <h3 className="text-xs font-black text-emerald-200 uppercase">Registered Address</h3>
              <p className="text-xs font-black text-white">{BUSINESS_INFO.address}</p>
              <p className="text-xs text-emerald-200">Umbilo, Durban, 4001</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section 
        id="values-section" 
        className="py-16 bg-emerald-800 text-white"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Our Core Service & Operating Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 shadow-xl space-y-3">
              <Award className="w-8 h-8 text-emerald-700" />
              <h3 className="text-lg font-black text-slate-900">Roach Gel Cleanliness Partnership</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Our cockroach gel applications provide targeted, professional control. We partner with residents to eliminate harborage attractions like cardboard boxes and old newspapers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 shadow-xl space-y-3">
              <Wrench className="w-8 h-8 text-emerald-700" />
              <h3 className="text-lg font-black text-slate-900">Wood Replacement Sub-Contractors</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                We dispatch trusted timber sub-contractors to quote on replacing damaged roof structures, doors, window sashes, and floorboards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 shadow-xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-700" />
              <h3 className="text-lg font-black text-slate-900">SMS Time Confirmation</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                We respect your schedule: upon booking, our team dispatches an SMS confirming our exact arrival and commencement time.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-sm shadow-2xl transition-all border border-red-500 cursor-pointer"
            >
              Request On-Site Property Assessment
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
