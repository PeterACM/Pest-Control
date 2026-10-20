import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, AlertTriangle, ShieldCheck, Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/pestData';

// WhatsApp number in international format (South Africa +27, no leading 0, no spaces)
const WHATSAPP_NUMBER = '27827986705';
const SHOW_DELAY_MS = 1500;

// Lives in memory only, so it resets on every page load/refresh (popup shows on every visit)
// but stops the popup re-opening when someone navigates back to Home within the same visit.
let shownThisPageLoad = false;

const QUICK_CONCERNS = [
  'Rats / mice in my home',
  'Cockroach infestation',
  'Termites',
  'Wood borer',
];

export const UrgentHelpPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Open automatically on every page load, shortly after the site appears
  useEffect(() => {
    if (shownThisPageLoad) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => {
      shownThisPageLoad = true;
      setIsOpen(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Focus the input when opened; close on Escape; lock background scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 250);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setDismissed(true);
  };

  const sendToWhatsApp = (e?: React.FormEvent) => {
    e?.preventDefault();
    const concern = message.trim();
    if (!concern) return;
    const text = `URGENT pest control request (from website):\n\n${concern}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
    close();
  };

  const callHref = `tel:${BUSINESS_INFO.mobile.replace(/\s+/g, '')}`;

  return (
    <>
      {/* Full-page urgent popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="urgent-popup-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="urgent-popup-title"
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white px-6 pt-7 pb-6">
                <button
                  onClick={close}
                  aria-label="Close urgent help popup"
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl text-red-100 hover:text-white hover:bg-red-900/40 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Emergency Response
                </div>

                <h2
                  id="urgent-popup-title"
                  className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight flex items-start gap-2"
                >
                  <AlertTriangle className="w-7 h-7 mt-0.5 shrink-0 text-amber-300" />
                  <span>Need urgent pest control?</span>
                </h2>
                <p className="mt-2 text-sm text-red-100 leading-relaxed">
                  Tell us what&rsquo;s going on and we&rsquo;ll pick it up straight away on WhatsApp.
                </p>
              </div>

              {/* Body */}
              <form onSubmit={sendToWhatsApp} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="urgent-concern"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    What&rsquo;s your concern?
                  </label>
                  <textarea
                    id="urgent-concern"
                    ref={inputRef}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendToWhatsApp();
                      }
                    }}
                    placeholder="e.g. Rats in my ceiling, Umbilo — need help today..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium resize-none focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Quick concerns */}
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_CONCERNS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setMessage((prev) => (prev.trim() ? `${prev.trim()}. ${c}` : c));
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send on WhatsApp
                </button>

                <div className="flex items-center justify-between gap-3 text-xs">
                  <a
                    href={callHref}
                    className="flex items-center gap-1.5 font-bold text-red-700 hover:text-red-800"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Rather call? {BUSINESS_INFO.mobile}
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Not now
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Licensed &amp; registered
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> Durban emergency callouts
                  </span>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small re-open button after dismissal */}
      <AnimatePresence>
        {dismissed && !isOpen && (
          <motion.button
            id="urgent-reopen-btn"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white pl-3.5 pr-4 py-3 rounded-full shadow-2xl border-2 border-white text-xs font-extrabold cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            Urgent help
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
