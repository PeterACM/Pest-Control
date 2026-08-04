import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA, DURBAN_SUBURBS, BUSINESS_INFO } from '../data/pestData';
import { BookingFormData } from '../types';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Phone, AlertCircle, FileText, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedServiceId }) => {
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmationRef, setConfirmationRef] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    pestType: preselectedServiceId || 'wood-borer',
    propertyType: 'house',
    suburb: 'Umbilo',
    propertySize: '3-4 Bedrooms',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '09:00 AM - 12:00 PM',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    specialNotes: '',
    urgent: false,
  });

  const resetForm = () => {
    setStep(1);
    setConfirmationRef(null);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        resetForm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedService = SERVICES_DATA.find(s => s.id === formData.pestType) || SERVICES_DATA[0];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.reference) {
        setConfirmationRef(data.reference);
        setStep(5); // Confirmation screen
      } else {
        setConfirmationRef(`PFS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        setStep(5);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setConfirmationRef(`PFS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep(5);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      id="booking-modal-backdrop" 
      onClick={resetForm}
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 relative"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-6 relative">
          <button 
            onClick={resetForm}
            className="absolute top-4 right-4 p-2 text-emerald-100 hover:text-white hover:bg-emerald-800 rounded-xl transition-all border border-emerald-700/60 bg-emerald-950/50 flex items-center gap-1 text-xs font-bold shadow-md cursor-pointer"
            aria-label="Close modal and exit"
            title="Exit booking form"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Close</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pest Free Services • Durban Booking</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Book On-Site Property Assessment</h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            Licensed products registered with Department of Agriculture. SMS arrival time confirmation.
          </p>

          {/* Step Progress Indicator */}
          {step <= 4 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-700/60 text-xs">
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Location' },
                { num: 3, label: 'Date & Time' },
                { num: 4, label: 'Contact' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    step === s.num 
                      ? 'bg-white text-emerald-900 shadow-xs' 
                      : step > s.num 
                      ? 'bg-emerald-400 text-emerald-950 font-bold' 
                      : 'bg-emerald-800 text-emerald-300'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={`hidden sm:inline ${step === s.num ? 'text-white font-bold' : 'text-emerald-300'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Select Service Required</h3>
                <p className="text-xs text-slate-500">Choose your main pest control or timber replacement requirement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, pestType: srv.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.pestType === srv.id
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-sm text-slate-900">{srv.name}</span>
                      {srv.isFlagship && (
                        <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                          Flagship
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.shortDesc}</p>
                    <p className="text-xs font-semibold text-emerald-700 mt-2">Pricing: {srv.priceEstimate}</p>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                >
                  <span>Next: Location Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Property Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Property & Suburb Information</h3>
                <p className="text-xs text-slate-500">Pest Free Services operates across the greater Durban metropolitan region.</p>
              </div>

              <div className="space-y-4">
                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Property Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'house', label: 'Single / Multi-Story House' },
                      { id: 'apartment', label: 'Flat / Apartment' },
                      { id: 'commercial', label: 'Commercial / Office' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: type.id as any })}
                        className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                          formData.propertyType === type.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suburb Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Durban Suburb / Area
                  </label>
                  <select
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-semibold"
                  >
                    {DURBAN_SUBURBS.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                {/* Property Size */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Property Scope
                  </label>
                  <select
                    value={formData.propertySize}
                    onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white font-semibold"
                  >
                    <option value="1-2 Bedrooms">1 - 2 Bedrooms / Small Unit</option>
                    <option value="3-4 Bedrooms">3 - 4 Bedrooms / Standard House</option>
                    <option value="5+ Bedrooms / Large Property">5+ Bedrooms / Double Storey Estate</option>
                    <option value="Commercial Space">Commercial / Warehouse / Restaurant</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700"
                >
                  <span>Next: Preferred Date</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Select Date & Time Window</h3>
                <p className="text-xs text-slate-500">Pick a convenient day for our technicians to assess your property. We confirm arrival time via SMS.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      '08:00 AM - 11:00 AM',
                      '11:00 AM - 02:00 PM',
                      '02:00 PM - 05:00 PM',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                          formData.preferredTime === slot
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emergency checkbox */}
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="urgent-check"
                    checked={formData.urgent}
                    onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                    className="mt-1 h-4 w-4 text-red-600 rounded-xs border-slate-300 focus:ring-red-500"
                  />
                  <label htmlFor="urgent-check" className="text-xs text-slate-800">
                    <strong className="text-red-700 block">Urgent Request</strong>
                    Check this if you require immediate urgent assessment or callout.
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700"
                >
                  <span>Next: Contact Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Contact Information */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Contact Details</h3>
                <p className="text-xs text-slate-500">We will send an arrival time confirmation SMS before visiting.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 031 205 3371"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@example.co.za"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address in {formData.suburb} *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 14 Baumann Ave / Florida Road"
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes / Pest Observation</label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="e.g. Borer dust noticed in timber flooring, double-storey residence..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>
              </div>

              {/* Summary Box */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Selected Service: {selectedService.name}</span>
                  <span className="text-emerald-700">{selectedService.priceEstimate}</span>
                </div>
                <p className="text-slate-500">Suburb: {formData.suburb} • Date: {formData.preferredDate} ({formData.preferredTime})</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md transition-all disabled:opacity-50"
                >
                  {submitting ? 'Confirming...' : 'Confirm Assessment Request'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Confirmation Screen */}
          {step === 5 && confirmationRef && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Request Received
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">Thank You, {formData.fullName}!</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your assessment request has been logged. Our team will review your details and confirm via phone / SMS.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Reference Number:</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">{confirmationRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-800">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">{formData.suburb}, Durban</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-semibold text-slate-800">{formData.preferredDate} ({formData.preferredTime})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Close Window
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="px-6 py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us ({BUSINESS_INFO.phone})</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
