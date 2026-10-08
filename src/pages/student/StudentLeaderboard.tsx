import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Medal, 
  Sparkles, 
  Leaf, 
  Users, 
  ArrowUp, 
  ShieldCheck, 
  Award,
  ChevronUp
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const StudentLeaderboard: React.FC = () => {
  const { leaderboard, user } = useEco();
  const [activeTab, setActiveTab] = useState<'class' | 'grade' | 'school'>('class');

  const top3 = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Eco Champions Arena</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            Class & School Leaderboard
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Compete with classmates and neighboring grades to earn points, avoid emissions, and claim the Green Cup.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1.5 bg-white border border-eco-border rounded-2xl shadow-2xs">
          <button
            onClick={() => setActiveTab('class')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'class'
                ? 'bg-eco-primary text-white shadow-xs'
                : 'text-eco-muted hover:text-eco-dark'
            }`}
          >
            Class 9-B
          </button>
          <button
            onClick={() => setActiveTab('grade')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'grade'
                ? 'bg-eco-primary text-white shadow-xs'
                : 'text-eco-muted hover:text-eco-dark'
            }`}
          >
            Grade 9 Cohort
          </button>
          <button
            onClick={() => setActiveTab('school')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'school'
                ? 'bg-eco-primary text-white shadow-xs'
                : 'text-eco-muted hover:text-eco-dark'
            }`}
          >
            School-Wide
          </button>
        </div>
      </div>

      {/* Top 3 Podiums */}
      <div className="bg-gradient-to-b from-eco-subtle to-white rounded-3xl border border-eco-border p-6 sm:p-8 pt-10">
        <h3 className="text-center font-display font-black text-xl text-eco-dark mb-8">
          🏆 Top Environmental Champions
        </h3>

        <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto items-end">
          
          {/* 2nd Place */}
          {top3[1] && (
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative">
                <img
                  src={top3[1].avatar}
                  alt={top3[1].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-slate-300 shadow-md"
                />
                <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center font-black text-xs shadow">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-eco-dark truncate max-w-[100px] sm:max-w-none">
                  {top3[1].name}
                </h4>
                <p className="font-display font-extrabold text-sm sm:text-base text-slate-700">
                  {top3[1].points.toLocaleString()} pts
                </p>
                <span className="text-[10px] text-eco-muted block font-medium">
                  {top3[1].streak}d streak
                </span>
              </div>
              <div className="w-full h-24 sm:h-32 bg-slate-100 rounded-t-2xl border-t-2 border-slate-300 flex items-center justify-center text-slate-400 font-extrabold text-lg">
                #2
              </div>
            </div>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <div className="flex flex-col items-center text-center space-y-2 -mt-6">
              <div className="relative">
                <Crown className="w-8 h-8 text-amber-500 fill-amber-500 mx-auto -mb-1 animate-bounce" />
                <img
                  src={top3[0].avatar}
                  alt={top3[0].name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-amber-400 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm shadow">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-eco-dark truncate max-w-[120px] sm:max-w-none">
                  {top3[0].name}
                </h4>
                <p className="font-display font-black text-base sm:text-xl text-eco-primary">
                  {top3[0].points.toLocaleString()} pts
                </p>
                <span className="text-[11px] font-bold text-amber-600 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-500" />
                  {top3[0].streak}d streak
                </span>
              </div>
              <div className="w-full h-32 sm:h-44 bg-gradient-to-t from-amber-100/70 to-amber-200/90 rounded-t-2xl border-t-4 border-amber-400 flex items-center justify-center text-amber-700 font-black text-2xl shadow-inner">
                #1
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative">
                <img
                  src={top3[2].avatar}
                  alt={top3[2].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-amber-700/40 shadow-md"
                />
                <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-xs shadow">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-eco-dark truncate max-w-[100px] sm:max-w-none">
                  {top3[2].name}
                </h4>
                <p className="font-display font-extrabold text-sm sm:text-base text-amber-900">
                  {top3[2].points.toLocaleString()} pts
                </p>
                <span className="text-[10px] text-eco-muted block font-medium">
                  {top3[2].streak}d streak
                </span>
              </div>
              <div className="w-full h-20 sm:h-24 bg-amber-50/80 rounded-t-2xl border-t-2 border-amber-700/50 flex items-center justify-center text-amber-800/60 font-extrabold text-lg">
                #3
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-eco-border flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-eco-dark">
              Rankings & Live Standings
            </h3>
            <p className="text-xs text-eco-muted">
              Updated automatically after each verified challenge submission
            </p>
          </div>
          <div className="text-xs font-semibold text-eco-muted">
            Showing Top Champions
          </div>
        </div>

        <div className="divide-y divide-eco-border/70">
          {leaderboard.map((entry) => {
            const isAarav = entry.name.includes('Aarav');
            return (
              <div
                key={entry.id}
                className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                  isAarav
                    ? 'bg-eco-lime/20 border-l-4 border-l-eco-primary ring-1 ring-inset ring-eco-primary/30'
                    : 'hover:bg-eco-subtle/50'
                }`}
              >
                {/* Left: Rank, Avatar, Name */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-8 text-center shrink-0">
                    {entry.rank <= 3 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">
                        #{entry.rank}
                      </span>
                    ) : (
                      <span className="font-display font-extrabold text-sm text-eco-muted">
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm sm:text-base font-bold truncate ${isAarav ? 'text-eco-dark font-black' : 'text-eco-text'}`}>
                        {entry.name}
                      </span>
                      {isAarav && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-eco-primary text-white px-2 py-0.5 rounded-full shadow-2xs">
                          You (Aarav)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-eco-muted mt-0.5 font-medium">
                      <span>{entry.className}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        {entry.streak} days
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{entry.challengesCompleted} quests done</span>
                    </div>
                  </div>
                </div>

                {/* Right: Points & CO2 */}
                <div className="text-right shrink-0">
                  <div className="font-display font-extrabold text-base sm:text-lg text-eco-dark">
                    {entry.points.toLocaleString()} <span className="text-xs font-bold text-eco-muted">pts</span>
                  </div>
                  <div className="text-xs text-eco-muted font-medium flex items-center justify-end gap-1 mt-0.5">
                    <Leaf className="w-3 h-3 text-eco-primary" />
                    <span>~{entry.co2SavedKg} kg CO₂</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class vs Class Tournament Widget */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-eco-primary" />
            <h3 className="font-display font-extrabold text-lg text-eco-dark">
              Inter-Class Green Tournament
            </h3>
          </div>
          <span className="text-xs font-bold text-eco-primary bg-eco-subtle px-3 py-1 rounded-full border border-eco-border">
            October Cup
          </span>
        </div>

        <p className="text-xs sm:text-sm text-eco-muted">
          Your class’s collective actions directly increase Class 9-B’s score. The winning class wins a native fruit tree garden dedicated on campus!
        </p>

        <div className="space-y-3 pt-2">
          {/* Class 9-B (User's class) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-eco-dark flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-eco-primary" />
                <strong>Class 9-B (Your Class)</strong>
              </span>
              <span className="text-eco-primary">18,450 pts (1st Place)</span>
            </div>
            <div className="w-full h-3 bg-eco-subtle rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-eco-primary to-eco-lime rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          {/* Class 9-A */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-eco-muted flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                Class 9-A
              </span>
              <span className="text-eco-muted">16,920 pts (2nd Place)</span>
            </div>
            <div className="w-full h-3 bg-eco-subtle rounded-full overflow-hidden">
              <div className="h-full bg-slate-400 rounded-full" style={{ width: '76%' }} />
            </div>
          </div>

          {/* Class 9-C */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-eco-muted flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Class 9-C
              </span>
              <span className="text-eco-muted">14,300 pts (3rd Place)</span>
            </div>
            <div className="w-full h-3 bg-eco-subtle rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '64%' }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
