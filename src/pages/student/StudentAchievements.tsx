import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  TreePine, 
  Filter 
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { BadgeCard } from '../../components/ui/BadgeCard';

export const StudentAchievements: React.FC = () => {
  const { badges, user } = useEco();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;

  const filteredBadges = badges.filter((b) => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <Award className="w-4 h-4" />
            <span>Badges & Mastery</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Eco Badges & Milestones
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Unlock badges by consistently logging verifiable environmental actions and hitting habit streaks.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center p-1.5 bg-white border border-eco-border rounded-2xl shadow-2xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'all'
                ? 'bg-eco-primary text-white shadow-xs'
                : 'text-eco-muted hover:text-eco-dark'
            }`}
          >
            All Badges ({totalCount})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'unlocked'
                ? 'bg-eco-primary text-white shadow-xs'
                : 'text-eco-muted hover:text-eco-dark'
            }`}
          >
            Unlocked ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'locked'
                ? 'bg-eco-primary text-white shadow-xs'
                : 'text-eco-muted hover:text-eco-dark'
            }`}
          >
            In Progress ({totalCount - unlockedCount})
          </button>
        </div>
      </div>

      {/* Level Banner & Progression Bar */}
      <div className="bg-gradient-to-r from-eco-dark via-eco-primary to-eco-lime p-6 sm:p-8 rounded-3xl text-white shadow-eco relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-eco-lime uppercase tracking-widest">
                Current Guardian Tier
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mt-0.5">
                Level {user.levelNumber}: {user.level}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/80">Next Level:</span>
              <div className="font-display font-bold text-lg text-white">
                Level 8: Forest Sentinel
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-white/90">
              <span>{user.xpCurrent} XP</span>
              <span>{user.xpNextLevel} XP</span>
            </div>
            <div className="w-full h-3.5 bg-black/30 rounded-full overflow-hidden border border-white/20 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-eco-lime to-white rounded-full transition-all duration-700"
                style={{ width: `${Math.round((user.xpCurrent / user.xpNextLevel) * 100)}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-white/80">
            Earn <strong>550 more XP</strong> from active challenges or daily streaks to level up and unlock the Forest Sentinel badge!
          </p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>

      {/* Badge Tier Guide */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-4">
        <h3 className="font-display font-bold text-lg text-eco-dark">
          Badge Mastery Tiers & Honor Roll
        </h3>
        <p className="text-xs sm:text-sm text-eco-muted">
          Badges in EcoQuest correspond to real-world impact milestones validated by school teachers:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800">Bronze Tier</span>
            <p className="text-xs text-amber-900/80 mt-1">First steps, orientation, and beginner habit logs.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">Silver Tier</span>
            <p className="text-xs text-slate-800/80 mt-1">Consistent 7-day habits and community sorting.</p>
          </div>
          <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200">
            <span className="text-xs font-black uppercase tracking-wider text-yellow-800">Gold Tier</span>
            <p className="text-xs text-yellow-900/80 mt-1">Two-week commitments and biodiversity guardianship.</p>
          </div>
          <div className="p-4 rounded-2xl bg-eco-lime/20 border border-eco-lime/40">
            <span className="text-xs font-black uppercase tracking-wider text-eco-dark">Emerald Tier</span>
            <p className="text-xs text-eco-dark/80 mt-1">Mastery level, month-long streaks, and campus leadership.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
