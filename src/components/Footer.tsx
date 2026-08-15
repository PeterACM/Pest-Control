import React from 'react';
import { PageView } from '../types';
import { BUSINESS_INFO } from '../data/pestData';
import { MapPin, ShieldCheck, Facebook } from 'lucide-react';
import pestLogo from '../assets/images/pest.png';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-200 py-10 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Logo Header */}
          <div className="flex items-center shrink-0">
            <img 
              src={pestLogo} 
              alt="Pest Free Services Logo" 
              className="h-16 sm:h-20 w-auto bg-white p-1.5 rounded-xl shadow-md border border-emerald-400 object-contain"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.dataset.tried1) {
                  target.dataset.tried1 = 'true';
                  target.src = '/pest.png';
                } else if (!target.dataset.tried2) {
                  target.dataset.tried2 = 'true';
                  target.src = '/images/pest.png';
                } else if (!target.dataset.tried3) {
                  target.dataset.tried3 = 'true';
                  target.src = '/assets/images/pest.png';
                }
              }}
            />
          </div>

          {/* Location Section */}
          <div className="flex items-start gap-3 text-slate-300 max-w-md">
            <MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Location</h4>
              <p className="text-sm font-medium">{BUSINESS_INFO.address}</p>
            </div>
          </div>

          {/* Business Registration & Licence Section */}
          <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-700/60 text-xs space-y-1 text-slate-300 shadow-inner min-w-[280px]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Business Registration & Licence
            </h4>
            <p><strong className="text-white">Close Corp Reg:</strong> {BUSINESS_INFO.regNumber}</p>
            <p><strong className="text-white">Licence:</strong> P36112 Department of Agriculture Licensed</p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Grant's Pest Free Services CC. All rights reserved. Durban, KwaZulu-Natal.</p>
        </div>
      </div>
    </footer>
  );
};
