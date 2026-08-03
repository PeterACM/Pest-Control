import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/pestData';
import { Testimonial } from '../types';
import { Star, ShieldCheck, Award, MessageSquare, Plus, CheckCircle2, User, X, Search, ThumbsUp, Filter, Sparkles, Check, ArrowUpDown } from 'lucide-react';

interface TestimonialsViewProps {
  onOpenBooking: () => void;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ onOpenBooking }) => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSuburb, setSelectedSuburb] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({
    't1': 24,
    't2': 18,
    't3': 31,
    't4': 15,
  });
  const [userVotedHelpful, setUserVotedHelpful] = useState<Record<string, boolean>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const [newReview, setNewReview] = useState({
    clientName: '',
    suburb: 'Morningside',
    quote: '',
    serviceType: 'Wood-Borer Control',
    rating: 5,
  });

  const handleToggleHelpful = (id: string) => {
    const isVoted = userVotedHelpful[id];
    setUserVotedHelpful((prev) => ({ ...prev, [id]: !isVoted }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (isVoted ? -1 : 1),
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.clientName || !newReview.quote) return;

    const newId = `t-${Date.now()}`;
    const reviewToAdd: Testimonial = {
      id: newId,
      clientName: newReview.clientName,
      suburb: `${newReview.suburb}, Durban`,
      quote: newReview.quote,
      rating: newReview.rating,
      serviceType: newReview.serviceType,
      year: new Date().getFullYear().toString(),
      verifiedBadge: true,
    };

    setReviews([reviewToAdd, ...reviews]);
    setHelpfulCounts((prev) => ({ ...prev, [newId]: 1 }));
    setRecentlyAddedId(newId);
    setIsModalOpen(false);
    setNewReview({
      clientName: '',
      suburb: 'Morningside',
      quote: '',
      serviceType: 'Wood-Borer Control',
      rating: 5,
    });
  };

  // Service options
  const serviceCategories = [
    'All',
    'Wood-Borer Control',
    'Cockroach Control',
    'Termite Treatment',
    'Rodent Control',
    'Wood Replacement Sub-Contractors',
  ];

  // Unique suburbs
  const suburbsList = useMemo(() => {
    const subs = new Set<string>();
    reviews.forEach((r) => {
      const cleanSub = r.suburb.split(',')[0].trim();
      if (cleanSub) subs.add(cleanSub);
    });
    return ['All', ...Array.from(subs)];
  }, [reviews]);

  // Rating breakdown stats
  const totalReviewsCount = reviews.length;
  const rating5Count = reviews.filter((r) => r.rating === 5).length;
  const rating4Count = reviews.filter((r) => r.rating === 4).length;

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        const matchesSearch =
          r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.serviceType.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat =
          selectedCategory === 'All' ||
          r.serviceType.toLowerCase().includes(selectedCategory.toLowerCase());

        const matchesSuburb =
          selectedSuburb === 'All' ||
          r.suburb.toLowerCase().includes(selectedSuburb.toLowerCase());

        const matchesRating =
          selectedRating === 'All' || r.rating === selectedRating;

        return matchesSearch && matchesCat && matchesSuburb && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') {
          return (helpfulCounts[b.id] || 0) - (helpfulCounts[a.id] || 0);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return b.id.localeCompare(a.id);
      });
  }, [reviews, searchTerm, selectedCategory, selectedSuburb, selectedRating, sortBy, helpfulCounts]);

  return (
    <div id="testimonials-view-container" className="space-y-0 bg-white">
      {/* Header */}
      <motion.section 
        id="testimonials-header-section" 
        className="py-16 bg-emerald-900 text-white border-b-4 border-emerald-950"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            Verified Durban Feedback
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            14+ Years of Service Results & Customer Trust
          </h1>
          <p className="text-emerald-100 text-base mt-3 leading-relaxed font-medium">
            Read authentic reviews from homeowners, body corporates, and commercial clients across North Beach, Umbilo, Morningside, Umhlanga, and Westville.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-xl border border-red-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>Leave Your Feedback</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Case Study Spotlight: Baumann Ave North Beach */}
      <motion.section 
        id="case-study-section" 
        className="py-16 bg-slate-950 text-white border-b-4 border-emerald-600"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-emerald-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-700 text-white text-xs font-black border border-red-500 shadow-md">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>LANDMARK CASE STUDY • JANUARY 2012</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  The Baumann Avenue Block of Flats Assessment (North Beach, Durban)
                </h2>

                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
                  Before a new tenant was scheduled to occupy a borer-damaged flat, Pest Free Services conducted a targeted treatment using registered borer control products. Rather than tenting the entire multi-story building, the team treated the accessible apartment directly.
                </p>

                <div className="p-5 rounded-2xl bg-slate-950 border-2 border-emerald-500 text-xs text-slate-100 space-y-2 shadow-inner">
                  <p className="font-black text-amber-300 uppercase tracking-wide">Site Supervisor Official Report:</p>
                  <p className="italic text-slate-200 text-sm font-medium">
                    "All wood-borer inside the treated flat were eliminated completely. Dead adult beetles were found outside the unit along the corridor — clear proof the treatment penetrated the accessible timber without requiring a tent!"
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2 text-xs text-amber-300 font-black uppercase tracking-wider">
                  <span>✓ Department of Agriculture Registered Products</span>
                  <span>✓ Saved Body Corporate Significant Tenting Costs</span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border-2 border-emerald-400 text-center space-y-3 shadow-xl">
                <p className="text-4xl font-black text-amber-300">650+</p>
                <p className="text-xs font-black text-white uppercase tracking-wider">Durban Properties Assessed</p>
                <p className="text-[11px] text-emerald-200">Continuous operation since CC incorporation on 28 April 2011.</p>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-lg transition-colors border border-red-500"
                >
                  Book Your Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Interactive Rating Summary & Filter Controls Section */}
      <motion.section 
        id="interactive-controls-section"
        className="py-12 bg-emerald-950 text-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Summary Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-emerald-900/90 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-2xl">
            {/* Score */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-emerald-700 pb-6 md:pb-0 md:pr-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-5xl font-black text-white">4.9</span>
                <div className="text-left">
                  <div className="flex text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <p className="text-xs font-extrabold text-emerald-200 mt-1">Based on {totalReviewsCount} Verified Reviews</p>
                </div>
              </div>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                Proven satisfaction rating across wood-borer, termite, roach, and rodent applications in Durban.
              </p>
            </div>

            {/* Interactive Rating Breakdown Bars */}
            <div className="md:col-span-8 space-y-3">
              <p className="text-xs font-black text-amber-300 uppercase tracking-wide">Click a bar to filter reviews by star rating:</p>
              
              {/* 5-Star Bar */}
              <button
                onClick={() => setSelectedRating(selectedRating === 5 ? 'All' : 5)}
                className={`w-full group text-left flex items-center gap-3 p-2 rounded-xl transition-all ${
                  selectedRating === 5 ? 'bg-red-700 text-white shadow-md' : 'hover:bg-emerald-800'
                }`}
              >
                <span className="text-xs font-black w-12 text-amber-300">5 Stars</span>
                <div className="flex-1 bg-slate-950 h-3.5 rounded-full overflow-hidden border border-emerald-600">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.round((rating5Count / totalReviewsCount) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-extrabold text-white w-12 text-right">{rating5Count} reviews</span>
              </button>

              {/* 4-Star Bar */}
              <button
                onClick={() => setSelectedRating(selectedRating === 4 ? 'All' : 4)}
                className={`w-full group text-left flex items-center gap-3 p-2 rounded-xl transition-all ${
                  selectedRating === 4 ? 'bg-red-700 text-white shadow-md' : 'hover:bg-emerald-800'
                }`}
              >
                <span className="text-xs font-black w-12 text-amber-300">4 Stars</span>
                <div className="flex-1 bg-slate-950 h-3.5 rounded-full overflow-hidden border border-emerald-600">
                  <div 
                    className="bg-amber-300 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.round((rating4Count / totalReviewsCount) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-extrabold text-white w-12 text-right">{rating4Count} reviews</span>
              </button>
            </div>
          </div>

          {/* Interactive Search & Filter Toolbar */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Bar */}
              <div className="md:col-span-5 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reviews by name, suburb, or keyword..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-emerald-500 text-slate-900 text-sm bg-white font-bold focus:ring-2 focus:ring-red-500 shadow-lg"
                />
              </div>

              {/* Suburb Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-emerald-500 text-slate-900 text-xs font-extrabold bg-white shadow-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="All">📍 All Suburbs ({suburbsList.length - 1} Areas)</option>
                  {suburbsList.filter(s => s !== 'All').map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Sort By Select */}
              <div className="md:col-span-4 flex items-center gap-2">
                <div className="w-full relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-3 rounded-2xl border-2 border-emerald-500 text-slate-900 text-xs font-extrabold bg-white shadow-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="newest">🔥 Sort: Newest First</option>
                    <option value="helpful">👍 Sort: Most Helpful Votes</option>
                    <option value="rating">⭐ Sort: Highest Rating</option>
                  </select>
                </div>

                {(searchTerm || selectedCategory !== 'All' || selectedSuburb !== 'All' || selectedRating !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedSuburb('All');
                      setSelectedRating('All');
                    }}
                    className="px-4 py-3 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shrink-0 shadow-md border border-red-500"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Service Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-extrabold text-emerald-300 self-center mr-2 uppercase tracking-wide">Filter Service:</span>
              {serviceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedCategory === cat
                      ? 'bg-red-700 text-white shadow-lg ring-2 ring-red-400'
                      : 'bg-emerald-900 text-emerald-100 hover:bg-emerald-800 border border-emerald-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials List Grid */}
      <motion.section 
        id="reviews-grid-section" 
        className="py-16 bg-white border-b-4 border-emerald-700"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-emerald-50 rounded-3xl border-2 border-emerald-200 p-8">
              <p className="text-lg font-black text-slate-900">No reviews found matching your search filters.</p>
              <p className="text-xs text-slate-600 mt-1 font-medium">Try clearing search terms or selecting 'All' service categories.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedSuburb('All');
                  setSelectedRating('All');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-red-700 text-white font-black text-xs shadow-md"
              >
                Show All Reviews
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((t) => {
                const isRecentlyAdded = t.id === recentlyAddedId;
                const isVoted = !!userVotedHelpful[t.id];
                const votesCount = helpfulCounts[t.id] || 0;

                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className={`p-6 rounded-2xl text-white border-2 transition-all flex flex-col justify-between shadow-xl ${
                      isRecentlyAdded
                        ? 'bg-emerald-950 border-red-500 ring-4 ring-red-500/30'
                        : 'bg-emerald-900 border-emerald-500 hover:border-amber-400'
                    }`}
                  >
                    <div>
                      {/* Top Bar with rating & badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex text-amber-300">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          {isRecentlyAdded && (
                            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-md">
                              Just Added
                            </span>
                          )}
                          <span className="text-xs font-black text-emerald-300">{t.year}</span>
                        </div>
                      </div>

                      {/* Review Quote */}
                      <p className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed mb-4 font-medium">
                        "{t.quote}"
                      </p>
                    </div>

                    <div>
                      {/* Author Info */}
                      <div className="pt-4 border-t border-emerald-800 flex items-center justify-between mb-3">
                        <div>
                          <p className="font-black text-xs text-white">{t.clientName}</p>
                          <p className="text-[11px] text-emerald-200 font-semibold">{t.suburb} • {t.serviceType}</p>
                        </div>
                        {t.verifiedBadge && (
                          <span className="text-[10px] bg-red-700 text-white font-black px-2.5 py-0.5 rounded-full border border-red-500 shadow-md">
                            Verified
                          </span>
                        )}
                      </div>

                      {/* Interactive Helpful Vote Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-emerald-800/60 text-xs">
                        <span className="text-[11px] text-emerald-300 font-bold">Was this review helpful?</span>
                        <button
                          onClick={() => handleToggleHelpful(t.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black transition-all ${
                            isVoted
                              ? 'bg-amber-400 text-slate-950 shadow-md'
                              : 'bg-emerald-950 hover:bg-emerald-800 text-emerald-200 border border-emerald-700'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-slate-950' : 'text-amber-300'}`} />
                          <span>{votesCount}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Leave Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border-4 border-emerald-600 cursor-default my-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 flex items-center gap-1 text-xs font-bold transition-all cursor-pointer shadow-xs"
                aria-label="Close feedback modal and return to app"
                title="Exit modal"
              >
                <X className="w-5 h-5" />
                <span className="hidden sm:inline">Close</span>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center font-black shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Leave Feedback for Pest Free Services</h3>
                  <p className="text-xs text-slate-600 font-medium">Share your experience with our team.</p>
                </div>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs font-bold text-slate-700">
                <div>
                  <label className="block text-slate-900 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.clientName}
                    onChange={(e) => setNewReview({ ...newReview, clientName: e.target.value })}
                    placeholder="e.g. Amanda Reddy"
                    className="w-full p-3 rounded-xl border-2 border-emerald-300 text-sm focus:ring-2 focus:ring-red-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 mb-1">Durban Suburb *</label>
                  <input
                    type="text"
                    required
                    value={newReview.suburb}
                    onChange={(e) => setNewReview({ ...newReview, suburb: e.target.value })}
                    placeholder="e.g. Morningside"
                    className="w-full p-3 rounded-xl border-2 border-emerald-300 text-sm focus:ring-2 focus:ring-red-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 mb-1">Service Received</label>
                  <select
                    value={newReview.serviceType}
                    onChange={(e) => setNewReview({ ...newReview, serviceType: e.target.value })}
                    className="w-full p-3 rounded-xl border-2 border-emerald-300 text-sm font-semibold focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="Wood-Borer Control">Wood-Borer Control</option>
                    <option value="Cockroach Control">Cockroach Control</option>
                    <option value="Termite Treatment">Termite Treatment</option>
                    <option value="Rodent Control">Rodent Control</option>
                    <option value="Wood Replacement Sub-Contractors">Wood Replacement Sub-Contractors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-900 mb-1">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`p-2.5 rounded-xl border-2 text-sm font-black transition-all ${
                          newReview.rating >= star 
                            ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md' 
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                      >
                        ★ {star}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 mb-1">Your Detailed Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder="Describe your pest control or wood replacement experience..."
                    className="w-full p-3 rounded-xl border-2 border-emerald-300 text-sm focus:ring-2 focus:ring-red-500 font-semibold"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-xl border border-red-500"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
