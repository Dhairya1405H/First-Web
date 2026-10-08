import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Award, 
  Target, 
  ArrowRight, 
  Leaf, 
  Droplets, 
  Recycle, 
  PackageX, 
  Bike, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Calendar,
  Zap,
  Info,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { useEco } from '../../context/EcoContext';
import { BadgeCard } from '../../components/ui/BadgeCard';

export const StudentDashboard: React.FC = () => {
  const { 
    user, 
    challenges, 
    badges, 
    leaderboard, 
    weeklyActivity, 
    activeChallenge, 
    continueCurrentChallenge 
  } = useEco();

  // Find recent 3 unlocked badges
  const recentAchievements = badges.filter(b => b.unlocked).slice(0, 3);

  // Top 5 from class leaderboard
  const classLeaderboardPreview = leaderboard.slice(0, 5);

  const plasticChallenge = challenges.find(c => c.id === 'plastic-free-week') || activeChallenge;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-r from-eco-dark to-eco-primary text-white p-6 sm:p-8 rounded-3xl shadow-eco relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-eco-lime/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-eco-lime">
            <Flame className="w-3.5 h-3.5 fill-eco-lime text-eco-lime animate-pulse" />
            <span>{user.streak}-Day Habit Streak Active</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white">
            Good morning, Aarav! 🌱
          </h1>
          <p className="text-white/85 text-base sm:text-lg font-medium">
            Small actions. Big impact.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            to="/student/challenges"
            className="px-4 py-2.5 rounded-xl bg-white text-eco-dark font-bold text-sm hover:bg-eco-lime transition-colors shadow-sm"
          >
            Explore Quests
          </Link>
          <Link
            to="/student/impact"
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md transition-colors"
          >
            View Impact
          </Link>
        </div>
      </div>

      {/* 2. Statistic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Eco Points */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs hover:shadow-eco transition-all">
          <div className="flex items-center justify-between text-eco-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Eco Points</span>
            <div className="p-2 rounded-xl bg-eco-lime/20 text-eco-dark">
              <Sparkles className="w-4 h-4 text-eco-primary fill-eco-primary" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-eco-dark">
            {user.points.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-eco-primary mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+180 this week</span>
          </div>
        </div>

        {/* Level */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs hover:shadow-eco transition-all">
          <div className="flex items-center justify-between text-eco-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Level</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-eco-primary">
              <Award className="w-4 h-4 text-eco-primary" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-display font-black text-eco-dark truncate" title={user.level}>
            {user.level}
          </div>
          <div className="text-[11px] font-medium text-eco-muted mt-1 truncate">
            Level {user.levelNumber} • 550 XP to Lv. 8
          </div>
        </div>

        {/* Challenges Completed */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs hover:shadow-eco transition-all">
          <div className="flex items-center justify-between text-eco-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Challenges</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-eco-dark">
            {user.challengesCompleted}
          </div>
          <div className="text-[11px] font-medium text-eco-muted mt-1">
            3 active in progress
          </div>
        </div>

        {/* Rank */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs hover:shadow-eco transition-all">
          <div className="flex items-center justify-between text-eco-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Class Rank</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Trophy className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-eco-dark">
            #{user.rank}
          </div>
          <div className="text-[11px] font-semibold text-amber-700 mt-1">
            Top 10% in Class 9-B
          </div>
        </div>

        {/* Estimated CO2 Avoided */}
        <div className="col-span-2 sm:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-eco-border shadow-2xs hover:shadow-eco transition-all">
          <div className="flex items-center justify-between text-eco-muted mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Est. CO₂ Avoided</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-eco-primary">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-eco-dark">
            {user.co2AvoidedKg} <span className="text-sm font-bold text-eco-muted">kg</span>
          </div>
          <div className="text-[11px] font-medium text-eco-muted mt-1 flex items-center gap-1">
            <Info className="w-3 h-3 text-eco-primary" />
            <span>Clearly estimated</span>
          </div>
        </div>

      </div>

      {/* Upcoming Section (Combines Academic Assignment & Eco Challenge) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-eco-primary" />
            <h3 className="font-display font-extrabold text-xl text-eco-dark">Upcoming</h3>
          </div>
          <span className="text-xs text-eco-muted font-semibold">
            Unified Schoolwork & Sustainability Feed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Upcoming Assignment */}
          <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-eco-muted bg-eco-subtle px-2.5 py-1 rounded-lg border border-eco-border">
                  Academic Assignment
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Due in 3 days
                </span>
              </div>
              <h4 className="font-display font-bold text-lg text-eco-dark">
                Climate Change Essay
              </h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Environmental Science with Teacher Priya Mehta • 500-word essay on tangible student actions.
              </p>
            </div>

            <div className="pt-2 border-t border-eco-border/60 flex items-center justify-between">
              <span className="text-xs font-black text-eco-dark">50 Max Points (+20 XP)</span>
              <Link
                to="/student/assignments/asg-1"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-eco-primary hover:text-eco-dark group"
              >
                <span>Open</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Upcoming Challenge */}
          <div className="bg-white p-5 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  Sustainability Challenge
                </span>
                <span className="text-xs font-bold text-eco-primary bg-eco-lime/20 px-2 py-0.5 rounded-full border border-eco-lime/40">
                  Day 5 / 7
                </span>
              </div>
              <h4 className="font-display font-bold text-lg text-eco-dark">
                Plastic-Free Week
              </h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Avoid single-use bottles, straws, and polybags. Keep your reusable bottle and steel lunchbox.
              </p>
            </div>

            <div className="pt-2 border-t border-eco-border/60 flex items-center justify-between">
              <span className="text-xs font-black text-eco-primary">+100 Eco Points</span>
              <button
                onClick={continueCurrentChallenge}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-eco-primary hover:text-eco-dark group cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Large Current Challenge Card: Plastic-Free Week */}
      <div className="bg-white rounded-3xl border-2 border-eco-primary/30 p-6 sm:p-8 shadow-eco relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-eco-lime/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                Current Challenge
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-eco-subtle text-eco-muted">
                Waste & Plastics
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                Active Streak Day
              </span>
            </div>

            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-eco-dark tracking-tight">
                {plasticChallenge.title}
              </h2>
              <p className="text-sm sm:text-base text-eco-muted mt-2 leading-relaxed">
                {plasticChallenge.description}
              </p>
            </div>

            {/* Progress indicators */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="text-eco-dark">
                  Progress: <strong className="text-eco-primary font-black">{plasticChallenge.progress}</strong> / {plasticChallenge.total} days
                </span>
                <span className="text-eco-primary font-bold">
                  {Math.round((plasticChallenge.progress / plasticChallenge.total) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-3.5 bg-eco-subtle rounded-full overflow-hidden border border-eco-border">
                <div
                  className="h-full bg-gradient-to-r from-eco-primary via-emerald-500 to-eco-lime rounded-full transition-all duration-500"
                  style={{ width: `${(plasticChallenge.progress / plasticChallenge.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-eco-muted">
                {plasticChallenge.total - plasticChallenge.progress > 0
                  ? `Just ${plasticChallenge.total - plasticChallenge.progress} more day(s) to earn the bonus milestone!`
                  : 'Challenge completed! Amazing dedication to zero plastic!'}
              </p>
            </div>
          </div>

          {/* Action side */}
          <div className="bg-eco-subtle/80 border border-eco-border rounded-2xl p-6 flex flex-col items-center text-center justify-center shrink-0 min-w-[260px] space-y-4">
            <div className="p-3 bg-white rounded-2xl shadow-xs border border-eco-border">
              <PackageX className="w-8 h-8 text-rose-600" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                Completion Reward
              </div>
              <div className="text-2xl font-display font-extrabold text-eco-primary mt-0.5">
                +{plasticChallenge.points} Eco Points
              </div>
              <div className="text-xs text-eco-muted mt-1">
                + Unlocks Plastic Warrior badge
              </div>
            </div>

            <button
              onClick={continueCurrentChallenge}
              className="w-full py-3 px-5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-md hover:shadow-eco transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Continue Challenge</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Weekly Activity Chart & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Activity Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-eco-dark">
                Weekly Activity & Points
              </h3>
              <p className="text-xs text-eco-muted mt-0.5">
                Points earned through verified environmental habits (Mon – Sun)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-eco-primary bg-eco-subtle px-3 py-1.5 rounded-xl border border-eco-border">
              <Calendar className="w-3.5 h-3.5" />
              <span>This Week: 800 pts</span>
            </div>
          </div>

          {/* Recharts Component */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3ECE4" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={{ stroke: '#E3ECE4' }} 
                  tick={{ fill: '#647067', fontSize: 12, fontWeight: 600 }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#647067', fontSize: 11 }} 
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-eco-dark text-white p-3 rounded-xl shadow-lg border border-eco-lime/30 text-xs space-y-1">
                          <p className="font-extrabold text-eco-lime">{data.day}</p>
                          <p className="font-bold">+{data.points} Eco Points</p>
                          <p className="text-white/80">~{data.co2} kg CO₂ avoided</p>
                          <p className="text-white/80">{data.challenges} challenge check-in(s)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="points" 
                  fill="#16A34A" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-eco-muted pt-2 border-t border-eco-border/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-xs bg-eco-primary" />
              <span>Eco Points Earned</span>
            </div>
            <span>Highest day: <strong>Saturday (180 pts)</strong></span>
          </div>
        </div>

        {/* Recent Achievements (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-eco-dark">
                  Recent Achievements
                </h3>
                <p className="text-xs text-eco-muted mt-0.5">Badges earned by Aarav</p>
              </div>
              <Link
                to="/student/achievements"
                className="text-xs font-bold text-eco-primary hover:text-eco-dark flex items-center gap-1"
              >
                <span>All Badges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentAchievements.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-eco-subtle/70 border border-eco-border hover:bg-eco-subtle transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-eco-border shadow-2xs flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-eco-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-eco-dark truncate">{badge.name}</h4>
                      <span className="text-[10px] font-bold text-eco-primary uppercase">{badge.tier}</span>
                    </div>
                    <p className="text-[11px] text-eco-muted truncate mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Badge Teaser */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-eco-lime/20 border border-amber-200/60 mt-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
              <span>Next Unlock: Plastic Warrior</span>
              <span>42 / 50</span>
            </div>
            <div className="w-full h-2 bg-amber-200/50 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '84%' }} />
            </div>
            <p className="text-[10px] text-amber-800/80 mt-1.5 font-medium">
              Only 8 more plastic-free items avoided to earn Emerald Tier!
            </p>
          </div>
        </div>

      </div>

      {/* 5. Class Leaderboard & Environmental Impact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Class Leaderboard Widget (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-eco-dark">
                Class 9-B Leaderboard
              </h3>
              <p className="text-xs text-eco-muted mt-0.5">Top environmental champions</p>
            </div>
            <Link
              to="/student/leaderboard"
              className="text-xs font-bold text-eco-primary hover:text-eco-dark flex items-center gap-1"
            >
              <span>Full Board</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {classLeaderboardPreview.map((entry) => {
              const isAarav = entry.name.includes('Aarav');
              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    isAarav
                      ? 'bg-eco-lime/20 border-2 border-eco-primary/60 shadow-xs'
                      : 'bg-eco-subtle/50 hover:bg-eco-subtle border border-eco-border/70'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-6 text-center font-display font-black text-xs ${
                        entry.rank === 1
                          ? 'text-amber-500'
                          : entry.rank === 2
                          ? 'text-slate-500'
                          : entry.rank === 3
                          ? 'text-amber-700'
                          : 'text-eco-muted'
                      }`}
                    >
                      #{entry.rank}
                    </span>

                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold truncate ${isAarav ? 'text-eco-dark font-extrabold' : 'text-eco-text'}`}>
                          {entry.name}
                        </span>
                        {isAarav && (
                          <span className="text-[10px] font-extrabold bg-eco-primary text-white px-1.5 py-0.2 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-eco-muted font-medium flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        {entry.streak} streak
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-display font-extrabold text-xs sm:text-sm text-eco-dark">
                      {entry.points.toLocaleString()} pts
                    </div>
                    <div className="text-[10px] text-eco-muted font-medium">
                      ~{entry.co2SavedKg} kg CO₂
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Impact Cards (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-eco-dark">
                Aarav's Environmental Impact
              </h3>
              <p className="text-xs text-eco-muted mt-0.5">
                Measurable, tangible contributions verified across all completed quests
              </p>
            </div>
            <span className="text-[11px] font-bold text-eco-primary bg-eco-lime/20 border border-eco-lime/40 px-2.5 py-1 rounded-full">
              Verified Scientific Conversion
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            
            {/* 18.4 kg estimated CO2 avoided */}
            <div className="p-4 rounded-2xl bg-eco-subtle/80 border border-eco-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-eco-muted uppercase tracking-wider">CO₂ Avoided</span>
                <Leaf className="w-4 h-4 text-eco-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-eco-dark">
                18.4 kg <span className="text-xs font-bold text-eco-muted">estimated</span>
              </div>
              <p className="text-[11px] text-eco-muted leading-tight">
                Equivalent to <strong>74 km</strong> avoided in a conventional combustion car.
              </p>
            </div>

            {/* 620 L estimated water saved */}
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Water Saved</span>
                <Droplets className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-cyan-950">
                620 L <span className="text-xs font-bold text-cyan-700">estimated</span>
              </div>
              <p className="text-[11px] text-cyan-800 leading-tight">
                Equal to <strong>10 full baths</strong> or 1,240 refilled water bottles.
              </p>
            </div>

            {/* 14 kg estimated waste diverted */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Waste Diverted</span>
                <Recycle className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-emerald-950">
                14 kg <span className="text-xs font-bold text-emerald-700">estimated</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-tight">
                Segregated dry waste and compost kept out of regional landfills.
              </p>
            </div>

            {/* 42 plastic items avoided */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Plastic Avoided</span>
                <PackageX className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-rose-950">
                42 items <span className="text-xs font-bold text-rose-700">avoided</span>
              </div>
              <p className="text-[11px] text-rose-800 leading-tight">
                Single-use bottles, straws, and disposable cutlery avoided.
              </p>
            </div>

            {/* 28 green commutes */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Green Commutes</span>
                <Bike className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-blue-950">
                28 commutes <span className="text-xs font-bold text-blue-700">completed</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-tight">
                Walked, cycled, or rode the school bus to campus.
              </p>
            </div>

            {/* Summary CTA */}
            <div className="p-4 rounded-2xl bg-eco-dark text-white flex flex-col justify-between space-y-2">
              <div className="text-xs font-bold text-eco-lime uppercase tracking-wider">
                Full Green Audit
              </div>
              <p className="text-xs text-white/80 leading-snug">
                Export verified impact certificate for school portfolios and awards.
              </p>
              <Link
                to="/student/impact"
                className="text-xs font-bold text-eco-lime hover:text-white flex items-center gap-1"
              >
                <span>View Full Audit & Science</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          <div className="p-3 bg-eco-subtle rounded-xl text-xs text-eco-muted flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-eco-primary shrink-0" />
              <span>All environmental metrics are clearly labeled as estimated based on DEFRA and EPA standard models.</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
