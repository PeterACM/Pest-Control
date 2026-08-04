import React, { useState } from 'react';
import { PageView } from '../types';
import { BUSINESS_INFO } from '../data/pestData';
import { PhoneCall, Menu, X, ShieldCheck, Phone } from 'lucide-react';
import pestLogo from '../assets/images/pest.png';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: PageView; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About Us' },
    { page: 'services', label: 'Services' },
    { page: 'testimonials', label: 'Testimonials' },
    { page: 'blog', label: 'Pest Guide' },
    { page: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b-2 border-emerald-600 shadow-md">
      {/* Primary Navigation Bar */}
      <div className="w-full px-2 sm:px-4 lg:px-6 h-22 sm:h-24 flex items-center justify-between">
        {/* Brand Logo Header */}
        <button 
          id="logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center group focus:outline-hidden py-1 shrink-0"
          aria-label="Pest Free Services Home"
        >
          <img 
            src={pestLogo} 
            alt="Pest Free Services Logo" 
            className="h-16 sm:h-20 lg:h-22 max-h-24 w-auto object-contain transition-transform group-hover:scale-105"
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
        </button>

        {/* Desktop Nav Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            
            // Turn "Contact" into the CTA button
            if (item.page === 'contact') {
              return (
                <button
                  key={item.page}
                  id="nav-link-contact-cta"
                  onClick={() => handleNavClick('contact')}
                  className="ml-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 border border-emerald-600 shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-200" />
                  <span>Contact</span>
                </button>
              );
            }

            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Emergency Direct Phone Call */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
            id="emergency-call-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-700 hover:bg-red-800 border border-red-600 shadow-md transition-all"
          >
            <Phone className="w-4 h-4 text-white animate-bounce" />
            <span>Call Us ({BUSINESS_INFO.phone})</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold hover:bg-emerald-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-emerald-800" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-white border-b-2 border-emerald-600 px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;

              if (item.page === 'contact') {
                return (
                  <button
                    key={item.page}
                    id="mobile-nav-contact-cta"
                    onClick={() => handleNavClick('contact')}
                    className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 border border-emerald-600 shadow-md flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Contact</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.page}
                  id={`mobile-nav-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              id="mobile-call-btn"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold text-white bg-red-700 hover:bg-red-800 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us Directly ({BUSINESS_INFO.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
