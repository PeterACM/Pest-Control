import React from 'react';
import { motion } from 'motion/react';
import { Hero } from './Hero';
import { SERVICES_DATA, TESTIMONIALS_DATA, BLOG_ARTICLES, BUSINESS_INFO } from '../data/pestData';
import { PageView } from '../types';
import { ShieldAlert, Bug, Footprints, Bed, Sparkles, Wind, ShieldCheck, Wrench, CheckCircle2, XCircle, ArrowRight, Award, PhoneCall, Star, FileText, Calendar, AlertTriangle } from 'lucide-react';
import grantArnoldFounderImg from '../assets/images/Wood borer1.png';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectArticle: (articleId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectService,
  onSelectArticle,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-6 h-6 text-emerald-600" />,
    Bug: <Bug className="w-6 h-6 text-emerald-600" />,
    Footprints: <Footprints className="w-6 h-6 text-emerald-600" />,
    Bed: <Bed className="w-6 h-6 text-emerald-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-emerald-600" />,
    Wind: <Wind className="w-6 h-6 text-emerald-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    Wrench: <Wrench className="w-6 h-6 text-emerald-600" />,
  };

  return (
    <div id="home-view-container" className="space-y-0">
      {/* Hero Section */}
      <Hero
        onOpenBooking={onOpenBooking}
        onNavigateToServices={() => onNavigate('services')}
        onNavigateToAbout={() => onNavigate('about')}
      />

      {/* SECTION 1: Alternative to Fumigation Assessment Table */}
      <motion.section 
        id="comparison-section" 
        className="py-16 bg-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black text-white bg-emerald-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              The Pest Free Approach
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
              The Effective Alternative to Fumigation
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-2 font-medium">
              We specialize in providing an alternative to tent fumigation using Department of Agriculture licensed products. An on-site assessment is compulsory to determine timber accessibility.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-800">
              <thead>
                <tr className="bg-slate-950 text-white text-sm">
                  <th className="p-4 sm:p-5 font-black uppercase tracking-wide w-1/3 border-b-2 border-slate-800">Feature</th>
                  <th className="p-4 sm:p-5 font-black bg-emerald-700 text-white w-1/3 border-b-2 border-emerald-500 shadow-md">
                    <span className="flex items-center gap-2 text-base">
                      <ShieldCheck className="w-6 h-6 text-emerald-200" />
                      Pest Free Services Method
                    </span>
                  </th>
                  <th className="p-4 sm:p-5 font-black bg-slate-800 text-white w-1/3 border-b-2 border-slate-700">
                    Traditional Tent Fumigation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm font-semibold">
                <tr className="hover:bg-emerald-50/50">
                  <td className="p-4 font-extrabold text-slate-900">Initial Assessment Requirement</td>
                  <td className="p-4 bg-emerald-100 text-emerald-950 font-black flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    Compulsory On-Site Inspection (Checks accessibility of timber)
                  </td>
                  <td className="p-4 bg-slate-50 text-slate-800 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    Referred if timber is inside sealed inaccessible gaps
                  </td>
                </tr>
                <tr className="hover:bg-emerald-50/50">
                  <td className="p-4 font-extrabold text-slate-900">Evacuation Guidelines</td>
                  <td className="p-4 bg-emerald-100 text-emerald-950 font-black flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    Part Evacuation may be required during application
                  </td>
                  <td className="p-4 bg-slate-50 text-slate-800 font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-slate-600 shrink-0" />
                    Full 1 to 2 Days Evacuation under Tents
                  </td>
                </tr>
                <tr className="hover:bg-emerald-50/50">
                  <td className="p-4 font-extrabold text-slate-900">Licensing & Chemicals</td>
                  <td className="p-4 bg-emerald-100 text-emerald-950 font-black flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    Licensed Products (Dept. of Agriculture Registered)
                  </td>
                  <td className="p-4 bg-slate-50 text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" />
                    Registered Fumigant Gases
                  </td>
                </tr>
                <tr className="hover:bg-emerald-50/50">
                  <td className="p-4 font-extrabold text-slate-900">Cockroach Control Approach</td>
                  <td className="p-4 bg-emerald-100 text-emerald-950 font-black flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    Targeted Gel Baiting + Client Cleanliness Partnership
                  </td>
                  <td className="p-4 bg-slate-50 text-slate-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                    Standard spray without sanitation partnership
                  </td>
                </tr>
                <tr className="hover:bg-emerald-50/50">
                  <td className="p-4 font-extrabold text-slate-900">Wood Replacement & Timber Repairs</td>
                  <td className="p-4 bg-emerald-100 text-emerald-950 font-black flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    Dispatched Trusted Sub-Contractors (Roofs, doors, windows, floors)
                  </td>
                  <td className="p-4 bg-slate-50 text-slate-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                    No timber repair sub-contractors dispatched
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: Core Services Grid */}
      <motion.section 
        id="services-grid-section" 
        className="py-16 bg-emerald-900 text-white border-b-4 border-emerald-950"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                Pest Control & Wood Replacement
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
                Our Licensed Pest Control Services
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-emerald-950 hover:bg-emerald-100 font-extrabold text-sm bg-white px-5 py-3 rounded-xl shadow-lg border-2 border-emerald-400 transition-all transform hover:-translate-y-0.5"
            >
              <span>View All Detailed Services</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl bg-white text-slate-900 border-2 transition-all flex flex-col justify-between shadow-xl ${
                  srv.isFlagship
                    ? 'border-red-600 ring-4 ring-red-500/30'
                    : 'border-emerald-200 hover:border-emerald-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-md">
                      {iconMap[srv.iconName]}
                    </div>
                    {srv.isFlagship && (
                      <span className="bg-red-700 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                        Flagship Specialty
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">{srv.name}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mb-4">{srv.shortDesc}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200">
                    {srv.priceEstimate}
                  </span>
                  <button
                    onClick={() => {
                      onSelectService(srv.id);
                      onNavigate('services');
                    }}
                    className="text-xs font-black text-red-700 hover:text-red-900 flex items-center justify-end gap-1 pt-1"
                  >
                    Service Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: Company Origin & Assessment Requirement */}
      <motion.section 
        id="history-section" 
        className="py-16 bg-slate-950 text-white border-b-4 border-emerald-600"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500 bg-slate-900">
                <img 
                  src={grantArnoldFounderImg} 
                  alt="Pest Free Services Assessment Team" 
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = '/grant_arnold_founder_1784765744784.jpg';
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-red-700 text-white p-5 rounded-2xl shadow-2xl border-2 border-white max-w-xs hidden sm:block">
                <p className="text-xs font-black text-amber-300 uppercase tracking-wide">COMPULSORY ASSESSMENT</p>
                <p className="text-xs text-white mt-1 font-semibold leading-snug">
                  On-site timber assessment verifies accessibility before applying alternative to fumigation products.
                </p>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-black text-emerald-950 bg-emerald-400 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                Pest Free Services Standards
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Responsible Pest Control & Assessment Standards
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                At <strong>Pest Free Services</strong> (Incorporated 2011, CC Reg B2011063958), we prioritize thorough assessments and licensed chemical application registered with the Department of Agriculture.
              </p>

              <div className="p-5 bg-emerald-900/90 rounded-2xl border-l-4 border-red-500 shadow-xl space-y-2 text-white">
                <p className="text-xs font-black text-amber-300 uppercase tracking-wide">Real Assessment Case Study:</p>
                <p className="text-xs text-slate-100 italic leading-relaxed">
                  "During an assessment of a double-storey residence, borer was discovered in structural timber inside a narrow gap between building levels. Because physical access for chemical application was impossible, we referred the owner to a trusted fumigator for tenting. Assessment is compulsory to determine if our alternative to fumigation can be applied!"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-200">
                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Targeted Roach Gel Application</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Sub-contractors for Wood Replacement</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>On-Site Property Assessment</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>SMS Arrival Time Confirmation</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-lg border border-emerald-400 inline-flex items-center gap-2 transition-all"
                >
                  <span>Read About Our Company</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4: Emergency Alert Banner */}
      <motion.section 
        id="emergency-banner-section" 
        className="py-12 bg-red-800 text-white border-y-4 border-red-950 shadow-2xl"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white text-red-700 flex items-center justify-center shrink-0 shadow-2xl border-2 border-red-300 font-black">
                <ShieldAlert className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Need Pest Control or a Property Transfer Assessment?</h3>
                <p className="text-xs sm:text-sm text-red-100 mt-1 font-semibold">
                  Contact Pest Free Services directly for urgent Durban pest requests.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                className="px-6 py-4 rounded-xl bg-white hover:bg-emerald-50 text-red-900 font-black text-sm shadow-2xl transition-all flex items-center gap-2.5 border-2 border-red-300"
              >
                <PhoneCall className="w-5 h-5 text-red-600 animate-pulse" />
                <span>Call Us ({BUSINESS_INFO.phone})</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="px-6 py-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-black text-sm border-2 border-emerald-500 shadow-xl"
              >
                Book Inspection
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: Testimonials Spotlight */}
      <motion.section 
        id="testimonials-spotlight-section" 
        className="py-16 bg-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-white bg-emerald-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              Client Feedback
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Trusted Across Durban & KZN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.slice(0, 3).map((t, idx) => (
              <motion.div 
                key={t.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-emerald-50/50 border-2 border-emerald-200 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 italic font-medium leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-200">
                  <p className="font-black text-sm text-slate-900">{t.clientName}</p>
                  <p className="text-xs font-bold text-emerald-800">{t.suburb} • {t.serviceType}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('testimonials')}
              className="text-sm font-black text-emerald-800 hover:text-red-700 underline underline-offset-4 transition-colors"
            >
              Read all verified reviews & submit your feedback →
            </button>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6: Blog / SEO Tips Teaser */}
      <motion.section 
        id="blog-teaser-section" 
        className="py-16 bg-emerald-800 text-white"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                Pest Prevention Guides
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
                Helpful Articles for KZN Property Owners
              </h2>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 text-emerald-950 hover:bg-emerald-100 font-extrabold text-sm bg-white px-5 py-3 rounded-xl shadow-lg border-2 border-emerald-400"
            >
              <span>Explore All Blog Articles</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.slice(0, 3).map((art, idx) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => {
                  onSelectArticle(art.id);
                  onNavigate('blog');
                }}
                className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-emerald-300 shadow-xl hover:border-red-500 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-sm">{art.category}</span>
                    <span className="font-semibold text-slate-600">{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2 hover:text-emerald-800 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-700 line-clamp-3 font-medium mb-4">{art.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>By {art.author}</span>
                  <span className="text-red-700 flex items-center gap-1 font-black">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};
