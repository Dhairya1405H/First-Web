import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Filter, 
  Search, 
  ArrowRight 
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { ChallengeCard } from '../../components/ui/ChallengeCard';

export const PublicChallengesPage: React.FC = () => {
  const { challenges } = useEco();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Plastic', 'Transport', 'Water', 'Energy', 'Waste', 'Biodiversity'];

  const filtered = challenges.filter(c => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-eco-primary bg-eco-lime/20 px-3 py-1 rounded-full">
          Curated Environmental Quests
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-eco-dark">
          School Challenge Catalog
        </h1>
        <p className="text-base sm:text-lg text-eco-muted">
          Browse standards-aligned challenges designed for elementary, middle, and high school students to practice daily climate action.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-eco-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search challenges by keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-eco-border bg-eco-subtle/50 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary/40 focus:bg-white"
            />
          </div>

          <Link
            to="/student/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Log In as Student</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-eco-border/60">
          <span className="text-xs font-bold text-eco-muted mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Pillar:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-eco-dark text-white shadow-xs'
                  : 'bg-eco-subtle text-eco-muted hover:text-eco-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            featured={challenge.id === 'plastic-free-week'}
            onAction={() => {
              window.location.href = '/student/challenges';
            }}
          />
        ))}
      </div>

    </div>
  );
};
