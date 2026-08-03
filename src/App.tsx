/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { TestimonialsView } from './components/TestimonialsView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('wood-borer');
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 antialiased">
      {/* Top Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Animated Page Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentPage === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBooking()}
                onSelectService={(serviceId) => {
                  setPreselectedServiceId(serviceId);
                }}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {currentPage === 'about' && (
              <AboutView
                onOpenBooking={() => handleOpenBooking()}
              />
            )}

            {currentPage === 'services' && (
              <ServicesView
                onOpenBooking={() => handleOpenBooking()}
                selectedServiceId={preselectedServiceId}
                onSelectServiceForBooking={(srvId) => setPreselectedServiceId(srvId)}
              />
            )}

            {currentPage === 'testimonials' && (
              <TestimonialsView
                onOpenBooking={() => handleOpenBooking()}
              />
            )}

            {currentPage === 'blog' && (
              <BlogView
                onOpenBooking={() => handleOpenBooking()}
                selectedArticleId={selectedArticleId}
              />
            )}

            {currentPage === 'contact' && (
              <ContactView
                onOpenBooking={() => handleOpenBooking()}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />
    </div>
  );
}
