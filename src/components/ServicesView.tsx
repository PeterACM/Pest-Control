import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA, DURBAN_SUBURBS } from '../data/pestData';
import { ServiceItem } from '../types';
import { ShieldAlert, Bug, Footprints, Bed, Sparkles, Wind, ShieldCheck, Wrench, CheckCircle2, ArrowRight, Calendar, Calculator, Shield } from 'lucide-react';

interface ServicesViewProps {
  onOpenBooking: () => void;
  selectedServiceId?: string;
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onOpenBooking,
  selectedServiceId,
  onSelectServiceForBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pest' | 'repair'>('all');
  const [selectedSub, setSelectedSub] = useState<string>('Umbilo');
  const [propertyType, setPropertyType] = useState<string>('house');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.category === activeFilter;
  });

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-8 h-8 text-emerald-600" />,
    Bug: <Bug className="w-8 h-8 text-emerald-600" />,
    Footprints: <Footprints className="w-8 h-8 text-emerald-600" />,
    Bed: <Bed className="w-8 h-8 text-emerald-600" />,
    Sparkles: <Sparkles className="w-8 h-8 text-emerald-600" />,
    Wind: <Wind className="w-8 h-8 text-emerald-600" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    Wrench: <Wrench className="w-8 h-8 text-emerald-600" />,
  };

  return (
    <div id="services-view-container" className="space-y-0 bg-white">
      {/* Header */}
      <motion.section 
        id="services-header-section" 
        className="py-16 bg-emerald-900 text-white border-b-4 border-emerald-950"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            Pest Free Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Pest Control & Wood Replacement
          </h1>
          <p className="text-emerald-100 text-base mt-3 leading-relaxed font-medium">
            Licensed chemical treatments registered with the Department of Agriculture, Roach Gel Control, Rodent Control, and Sub-Contracted Wood Replacement.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center flex-wrap gap-2 mt-8">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'pest', label: 'Pest Control Services' },
              { id: 'repair', label: 'Wood Replacement Sub-Contractors' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  activeFilter === f.id
                    ? 'bg-red-700 text-white shadow-lg ring-2 ring-red-400'
                    : 'bg-emerald-950 text-emerald-100 hover:bg-emerald-800 border border-emerald-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services List */}
      <motion.section 
        id="services-list-section" 
        className="py-16 bg-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filteredServices.map((srv, idx) => {
            return (
              <motion.div
                key={srv.id}
                id={`service-card-${srv.id}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-8 rounded-3xl border-2 transition-all shadow-xl ${
                  srv.isFlagship
                    ? 'bg-emerald-50/80 border-red-600 ring-4 ring-red-500/20'
                    : 'bg-white border-emerald-200 hover:border-emerald-500'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-white flex items-center justify-center shrink-0 font-bold shadow-md border-2 border-emerald-500">
                        {iconMap[srv.iconName]}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{srv.name}</h2>
                          {srv.isFlagship && (
                            <span className="bg-red-700 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                              Flagship Specialty
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-extrabold text-emerald-800 mt-0.5">Pricing: {srv.priceEstimate}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{srv.fullDesc}</p>

                    <div className="p-4 bg-emerald-900 text-white rounded-2xl border border-emerald-600 shadow-md flex items-start gap-3 text-xs">
                      <Shield className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300 font-extrabold uppercase tracking-wide">Key Specification: </strong>
                        <span className="font-medium text-emerald-100">{srv.bioAdvantage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action Column */}
                  <div className="lg:col-span-4 bg-slate-950 text-white p-6 rounded-2xl border-2 border-emerald-500 space-y-4 text-xs shadow-xl">
                    <h3 className="font-black text-white text-sm border-b border-slate-800 pb-2 uppercase tracking-wide">Service Highlights</h3>
                    <ul className="space-y-2 text-slate-200 font-semibold">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Licensed with Dept. of Agriculture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Compulsory On-Site Assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>SMS Arrival Confirmation</span>
                      </li>
                    </ul>

                    <button
                      onClick={() => {
                        onSelectServiceForBooking(srv.id);
                        onOpenBooking();
                      }}
                      className="w-full py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-lg transition-colors flex items-center justify-center gap-2 border border-red-500"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Request Inspection for {srv.name.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Service Request Inquiry Panel */}
      <motion.section 
        id="estimate-calculator-section" 
        className="py-16 bg-slate-950 text-white"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 p-8 rounded-3xl border-2 border-emerald-500 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-900 flex items-center justify-center font-black shadow-md">
                <Calculator className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Durban Assessment Request</h2>
                <p className="text-xs text-emerald-200 font-medium">Select your suburb & property type to request an on-site property assessment.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-white">
              <div>
                <label className="block text-emerald-200 mb-1 uppercase tracking-wide">Select Suburb</label>
                <select
                  value={selectedSub}
                  onChange={(e) => setSelectedSub(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-emerald-500 text-slate-900 bg-white font-extrabold"
                >
                  {DURBAN_SUBURBS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 mb-1 uppercase tracking-wide">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-emerald-500 text-slate-900 bg-white font-extrabold"
                >
                  <option value="apartment">Flat / Apartment</option>
                  <option value="house">Single / Multi-Story Residence</option>
                  <option value="commercial">Commercial / Industrial Property</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-white text-slate-900 rounded-2xl border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <p className="text-xs text-emerald-900 font-black uppercase tracking-wide">Inspection Plan for {selectedSub} ({propertyType}):</p>
                <p className="text-2xl font-black text-red-700 mt-0.5">
                  Request On-Site Property Assessment
                </p>
                <p className="text-[11px] text-slate-600 font-semibold">Includes compulsory on-site check & SMS time confirmation.</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-lg shrink-0 border border-red-500"
              >
                Book On-Site Assessment
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
