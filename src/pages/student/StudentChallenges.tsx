import React, { useState } from 'react';
import { 
  Target, 
  Search, 
  Filter, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  ShieldCheck 
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { ChallengeCard } from '../../components/ui/ChallengeCard';
import { SubmitProofModal } from '../../components/ui/SubmitProofModal';
import { Challenge, ChallengeCategory } from '../../types';

export const StudentChallenges: React.FC = () => {
  const { challenges } = useEco();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalChallengeId, setActiveModalChallengeId] = useState<string | null>(null);

  const categories = ['All', 'Plastic', 'Transport', 'Water', 'Energy', 'Waste', 'Biodiversity'];
  const statuses = ['All', 'Active', 'Completed', 'Available'];

  const filteredChallenges = challenges.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Active' && c.status === 'active') ||
      (selectedStatus === 'Completed' && c.status === 'completed') ||
      (selectedStatus === 'Available' && c.status === 'available');
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <Target className="w-4 h-4" />
            <span>Interactive Eco-Challenges</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Quest Library & Active Challenges
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Complete daily sustainability tasks, verify your actions with photos or logs, and earn Eco Points.
          </p>
        </div>

        <button
          onClick={() => setActiveModalChallengeId(challenges[0]?.id || '')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-sm hover:shadow-eco transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log Eco Action Proof</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-eco-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges (e.g. plastic, commute, water)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-eco-border bg-eco-subtle/50 text-sm focus:outline-none focus:ring-2 focus:ring-eco-primary/40 focus:bg-white transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-eco-subtle rounded-xl border border-eco-border text-xs font-bold w-full md:w-auto overflow-x-auto">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === status
                    ? 'bg-eco-primary text-white shadow-xs'
                    : 'text-eco-muted hover:text-eco-dark'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-eco-border/60">
          <span className="text-xs font-bold text-eco-muted mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-eco-dark text-white shadow-xs'
                  : 'bg-eco-subtle/70 text-eco-muted hover:text-eco-dark hover:bg-eco-subtle'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              featured={challenge.id === 'plastic-free-week'}
              onAction={(ch) => setActiveModalChallengeId(ch.id)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-eco-border space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-eco-subtle text-eco-muted flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-eco-dark">No challenges found</h3>
          <p className="text-sm text-eco-muted max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters to see more quests.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStatus('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-eco-primary text-white text-xs font-bold hover:bg-eco-dark transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Verification Dialog */}
      {activeModalChallengeId && (
        <SubmitProofModal
          isOpen={Boolean(activeModalChallengeId)}
          onClose={() => setActiveModalChallengeId(null)}
          defaultChallengeId={activeModalChallengeId}
        />
      )}

    </div>
  );
};
