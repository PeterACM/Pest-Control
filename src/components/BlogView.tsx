import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_ARTICLES, BUSINESS_INFO } from '../data/pestData';
import { BlogArticle } from '../types';
import { Search, Calendar, Clock, User, ArrowRight, X, Bookmark, Share2, Tag, ShieldCheck } from 'lucide-react';

interface BlogViewProps {
  onOpenBooking: () => void;
  selectedArticleId?: string;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenBooking, selectedArticleId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(
    selectedArticleId ? BLOG_ARTICLES.find(a => a.id === selectedArticleId) || null : null
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeArticle) {
        setActiveArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  const categories = ['All', 'Wood-Borer & Termites', 'Eco Tips', 'Handyman Repair', 'Durban Pest Guide'];

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-view-container" className="space-y-0 bg-white">
      {/* Header (BACKGROUND: Strong Deep Emerald Green bg-emerald-900) */}
      <motion.section 
        id="blog-header-section" 
        className="py-16 bg-emerald-900 text-white border-b-4 border-emerald-950"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-black text-white bg-red-700 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            SEO Pest Prevention Tips & Advice
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Durban Homeowner's Pest Guide
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
            Expert insights from Grant Arnold on identifying wood-borer early, eco-friendly pest prevention, and maintaining timber fixtures in coastal KwaZulu-Natal.
          </p>

          {/* Search & Category Filter */}
          <div className="pt-4 max-w-xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search borer signs, eco tips, or Durban repairs..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-emerald-500 text-slate-900 text-sm focus:ring-2 focus:ring-red-500 focus:outline-hidden bg-white shadow-xl font-bold"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedCategory === cat
                      ? 'bg-red-700 text-white shadow-lg border border-red-500'
                      : 'bg-emerald-950 text-emerald-100 hover:bg-emerald-800 border border-emerald-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Articles Grid (BACKGROUND: Deep Dark Slate bg-slate-950) */}
      <motion.section 
        id="blog-grid-section" 
        className="py-16 bg-slate-950 text-white border-b-4 border-emerald-600"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-emerald-200 text-sm font-bold">
              No articles found matching "{searchTerm}". Try another search term or filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <motion.article
                  key={art.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveArticle(art)}
                  className="p-6 rounded-3xl bg-emerald-900 text-white border-2 border-emerald-500 shadow-xl hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-emerald-200 mb-3">
                      <span className="font-black text-white bg-red-700 px-3 py-1 rounded-md border border-red-500 uppercase tracking-wider text-[10px]">
                        {art.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold">
                        <Clock className="w-3.5 h-3.5 text-amber-300" /> {art.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-white mb-2 leading-snug hover:text-amber-300 transition-colors">
                      {art.title}
                    </h2>

                    <p className="text-xs text-emerald-100 line-clamp-3 mb-4 leading-relaxed font-medium">
                      {art.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {art.tags.map((t) => (
                        <span key={t} className="text-[10px] text-white bg-slate-950 border border-emerald-600 px-2 py-0.5 rounded-md font-semibold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-800 flex items-center justify-between text-xs font-black">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-[10px] border border-red-500">
                        GA
                      </div>
                      <span>{art.author}</span>
                    </div>

                    <span className="text-amber-300 flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      Read Tip <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-3xl w-full shadow-2xl relative my-8 cursor-default"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 bg-slate-50 border border-slate-200 flex items-center gap-1.5 text-xs font-extrabold transition-all shadow-xs cursor-pointer"
                aria-label="Exit article and return to app"
                title="Exit article"
              >
                <X className="w-5 h-5 text-slate-700" />
                <span className="hidden sm:inline">Close Article</span>
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
                    <span className="bg-emerald-100 px-2.5 py-0.5 rounded-md">{activeArticle.category}</span>
                    <span>• {activeArticle.readTime}</span>
                    <span>• Published: {activeArticle.date}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {activeArticle.title}
                  </h1>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                      GA
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{activeArticle.author}</p>
                      <p className="text-emerald-800">Founder, Pest Free Services Durban</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert("Article link copied!");
                    }}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300 font-semibold"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Article Body Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {activeArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* CTA Callout Inside Article */}
                <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
                  <h3 className="font-bold text-base text-emerald-400">Noticed Wood-Borer or Pest Damage in Your Durban Home?</h3>
                  <p className="text-xs text-slate-300">
                    Don't wait for timber structural damage. Grant Arnold offers bio-friendly non-fumigation inspections across greater Durban.
                  </p>
                  <div className="pt-1 flex gap-3">
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onOpenBooking();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Book Bio Inspection Now
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700"
                    >
                      Call Grant Directly
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
