import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Leaf, 
  ShieldCheck, 
  Trophy, 
  Award, 
  Target, 
  TreePine, 
  Users, 
  BarChart3, 
  Droplets, 
  Recycle, 
  PackageX, 
  Bike, 
  School, 
  ChevronRight,
  TrendingUp,
  Clock,
  Zap,
  Info
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { ChallengeCard } from '../../components/ui/ChallengeCard';
import confetti from 'canvas-confetti';

export const LandingPage: React.FC = () => {
  const { challenges, user } = useEco();
  const [demoActive, setDemoActive] = useState(false);
  const [demoPoints, setDemoPoints] = useState(2450);

  const featuredChallenges = challenges.slice(0, 5);

  const handleDemoTap = () => {
    setDemoActive(true);
    setDemoPoints(prev => prev + 25);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20">
        {/* Background ambient mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-eco-lime/20 via-eco-primary/15 to-eco-sky/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-eco-subtle border border-eco-border text-xs font-bold text-eco-dark shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-eco-primary animate-pulse" />
                <span>Gamified Climate Action for Schools</span>
                <span className="text-eco-muted">•</span>
                <span className="text-eco-primary font-extrabold">Ages 10–17</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-6xl tracking-tight text-eco-dark leading-[1.1]">
                Turn Sustainability <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-primary via-emerald-600 to-eco-dark">
                  Into a Habit.
                </span>
              </h1>

              {/* Exact Requested Description */}
              <p className="text-base sm:text-lg lg:text-xl text-eco-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                EcoQuest transforms environmental education into interactive challenges that inspire students to take action, build lasting habits, and create measurable environmental impact.
              </p>

              {/* Exact Requested Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/student/dashboard"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-base shadow-md hover:shadow-eco transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Start Your Eco Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-eco-subtle text-eco-dark font-bold text-base border border-eco-border shadow-2xs transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>See How It Works</span>
                  <ChevronRight className="w-4 h-4 text-eco-muted" />
                </Link>
              </div>

              {/* Social Proof Mini Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-eco-muted font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-eco-primary" />
                  <span>Teacher Verified Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-primary" />
                  <span>Zero Screen Fatigue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-eco-primary" />
                  <span>EPA Verified Conversion</span>
                </div>
              </div>

            </div>

            {/* Right: Exact Requested Hero Dashboard Preview Card */}
            <div className="lg:col-span-5 relative">
              
              {/* Decorative background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-eco-primary via-eco-lime to-emerald-400 rounded-3xl blur-md opacity-30 animate-pulse-glow" />

              {/* Dashboard Preview Card */}
              <div className="relative bg-white rounded-3xl border border-eco-border shadow-xl p-6 sm:p-7 space-y-6">
                
                {/* Header with Aarav Avatar and Live Pill */}
                <div className="flex items-center justify-between pb-4 border-b border-eco-border/80">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-eco-dark via-eco-primary to-eco-lime flex items-center justify-center font-display font-extrabold text-white text-base shadow-inner">
                      AS
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-eco-dark">
                        Aarav Sharma
                      </h4>
                      <p className="text-xs text-eco-muted font-medium">Class 9-B • St. Jude School</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>12-day streak</span>
                  </div>
                </div>

                {/* Exact Requested Preview Stats:
                    - 2,450 Eco Points
                    - Green Guardian
                    - 12-day streak
                    - 37 challenges completed
                    - 18.4 kg estimated CO₂ avoided
                */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-eco-muted block">
                      Eco Points
                    </span>
                    <span className="text-2xl font-display font-extrabold text-eco-dark">
                      {demoPoints.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-eco-primary font-bold block mt-0.5">
                      +180 this week
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-eco-muted block">
                      Level
                    </span>
                    <span className="text-lg font-display font-black text-eco-primary block truncate">
                      Green Guardian
                    </span>
                    <span className="text-[10px] text-eco-muted font-medium block mt-0.5">
                      Tier 7 Guardian
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-eco-muted block">
                      Challenges Done
                    </span>
                    <span className="text-2xl font-display font-extrabold text-eco-dark">
                      37 completed
                    </span>
                    <span className="text-[10px] text-eco-muted font-medium block mt-0.5">
                      3 active today
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-eco-subtle border border-eco-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-eco-muted block">
                      Est. CO₂ Avoided
                    </span>
                    <span className="text-2xl font-display font-extrabold text-eco-dark">
                      18.4 kg
                    </span>
                    <span className="text-[10px] text-eco-muted font-medium block mt-0.5">
                      ~74 km drive avoided
                    </span>
                  </div>
                </div>

                {/* Interactive Demo Quest Preview Tap Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-eco-lime/20 border border-eco-primary/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-eco-dark">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-eco-primary fill-eco-primary" />
                      Active Quest: Plastic-Free Week
                    </span>
                    <span className="text-eco-primary">5 / 7 Days</span>
                  </div>
                  <div className="w-full h-2 bg-eco-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-eco-primary rounded-full" style={{ width: '71%' }} />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-eco-muted">Tap to test real-time XP award:</span>
                    <button
                      onClick={handleDemoTap}
                      className="px-3 py-1.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      {demoActive ? '🎉 +25 XP Added!' : 'Tap + Check In'}
                    </button>
                  </div>
                </div>

                {/* Bottom link into full student dashboard */}
                <Link
                  to="/student/dashboard"
                  className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
                >
                  <span>Open Aarav's Full Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Impact Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-eco-dark text-white rounded-3xl p-8 sm:p-12 shadow-eco-lg relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-eco-lime">
                Platform-Wide Verified Metrics
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                Measurable Impact Across Partner Schools
              </h2>
              <p className="text-sm text-white/75">
                Every challenge completed by a student is audited and aggregated into actionable green data.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="space-y-1 pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-display font-black text-eco-lime">
                  18,420+
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">kg CO₂ Avoided</div>
                <div className="text-[11px] text-white/60">Estimated reduction</div>
              </div>

              <div className="space-y-1 pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-display font-black text-white">
                  620,000+
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">L Water Conserved</div>
                <div className="text-[11px] text-white/60">Estimated savings</div>
              </div>

              <div className="space-y-1 pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-display font-black text-eco-lime">
                  42,500+
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Single-Use Plastics Avoided</div>
                <div className="text-[11px] text-white/60">Verified habit swaps</div>
              </div>

              <div className="space-y-1 pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-display font-black text-white">
                  120+
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">Schools Registered</div>
                <div className="text-[11px] text-white/60">Active classrooms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-eco-primary bg-eco-lime/20 px-3 py-1 rounded-full">
            The 3-Step Action Loop
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-eco-dark">
            How EcoQuest Turns Habits Into Fun
          </h2>
          <p className="text-sm sm:text-base text-eco-muted">
            Designed to bridge the gap between classroom environmental theory and tangible daily student action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl border border-eco-border p-7 shadow-2xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-eco-primary/10 text-eco-primary flex items-center justify-center font-display font-black text-xl">
              1
            </div>
            <h3 className="font-display font-bold text-xl text-eco-dark">
              Pick a Real-World Quest
            </h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Students choose from structured challenges across waste, water, plastic avoidance, low-emission commute, and energy conservation.
            </p>
            <div className="p-3 rounded-xl bg-eco-subtle text-xs text-eco-dark font-semibold">
              Example: Plastic-Free Week or Green Commute
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl border border-eco-border p-7 shadow-2xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-eco-primary/10 text-eco-primary flex items-center justify-center font-display font-black text-xl">
              2
            </div>
            <h3 className="font-display font-bold text-xl text-eco-dark">
              Submit Proof: Photo or Log
            </h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Snap a quick photo of your reusable bottle or write a short activity reflection. AI pre-checks confidence and teachers verify validity.
            </p>
            <div className="p-3 rounded-xl bg-eco-subtle text-xs text-eco-dark font-semibold">
              Child-safe: Proof photos are deleted post-verification
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl border border-eco-border p-7 shadow-2xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-eco-primary/10 text-eco-primary flex items-center justify-center font-display font-black text-xl">
              3
            </div>
            <h3 className="font-display font-bold text-xl text-eco-dark">
              Earn XP, Streaks & Impact
            </h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Watch your personal streak flame grow, earn mastery badges, climb class leaderboards, and contribute to the school's carbon report.
            </p>
            <div className="p-3 rounded-xl bg-eco-subtle text-xs text-eco-dark font-semibold">
              Instant feedback triggers positive habit reinforcement
            </div>
          </div>

        </div>
      </section>

      {/* 4. Gamification Section */}
      <section className="bg-gradient-to-b from-eco-subtle/50 to-white py-16 border-y border-eco-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-eco-primary bg-white px-3 py-1 rounded-full border border-eco-border">
              Duolingo-Inspired Gamification
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-eco-dark">
              Habit Loops That Actually Keep Kids Engaged
            </h2>
            <p className="text-sm sm:text-base text-eco-muted">
              We apply research-backed game dynamics to eliminate boredom and turn sustainability into an exciting daily challenge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
              <h4 className="font-display font-bold text-lg text-eco-dark">Daily Streaks</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Consistency is key. Logging just 1 verified action every 24 hours keeps the streak alive and earns multiplier bonuses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-eco-primary flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-eco-dark">8 Mastery Badges</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Unlock tiered achievements from Seed Starter to Tree Guardian, Plastic Warrior, and the prestigious 30-Day Streak.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-eco-dark">Class Leaderboards</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Friendly cohort tournaments where entire homerooms collaborate to win campus eco grants and community tree plantings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-eco-dark">XP & Levels</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Progress through levels from Sprout Scout to Green Guardian and Forest Sentinel as points accumulate.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Challenges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-eco-primary">
              Curated Curriculum
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-eco-dark mt-1">
              Featured Environmental Challenges
            </h2>
            <p className="text-sm sm:text-base text-eco-muted mt-1">
              Real-world tasks designed for school days, lunch hours, and daily commutes.
            </p>
          </div>

          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-eco-primary hover:text-eco-dark"
          >
            <span>View All Quests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge) => (
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
      </section>

      {/* 6. Environmental Impact & Science Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-white rounded-3xl border border-eco-border p-8 sm:p-12 shadow-2xs space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-eco-primary bg-eco-lime/20 px-3 py-1 rounded-full">
              ClimateTech Rigor
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-eco-dark">
              Converting Micro-Actions into Scientific Impact
            </h2>
            <p className="text-sm sm:text-base text-eco-muted">
              We never invent arbitrary green points. Every single action is tied to peer-reviewed conversion models:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-eco-subtle border border-eco-border space-y-2">
              <Leaf className="w-6 h-6 text-eco-primary" />
              <h4 className="font-bold text-base text-eco-dark">EPA GHG Equivalencies</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Calculates gasoline savings and grid electricity reductions from low-carbon commutes and vampire power shutoffs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-eco-subtle border border-eco-border space-y-2">
              <Droplets className="w-6 h-6 text-cyan-600" />
              <h4 className="font-bold text-base text-eco-dark">WaterSense Flow Metrics</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Accounts for 9.5 Liters saved per minute off showers and running school bathroom sink taps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-eco-subtle border border-eco-border space-y-2">
              <Recycle className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-base text-eco-dark">DEFRA Landfill Diversion</h4>
              <p className="text-xs text-eco-muted leading-relaxed">
                Models methane avoidance from food scrap composting and classroom dry waste segregation.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Note on Transparency:</strong> All environmental statistics on student and school dashboards are clearly labeled as estimated metrics based on verified challenge completions.
            </span>
          </div>
        </div>
      </section>

      {/* 7. For Schools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-subtle border border-eco-border text-xs font-bold text-eco-dark">
              <School className="w-4 h-4 text-eco-primary" />
              <span>For School Administrators & Teachers</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-eco-dark leading-tight">
              Turn Your Campus Into a Certified Green Leader
            </h2>

            <p className="text-sm sm:text-base text-eco-muted leading-relaxed">
              EcoQuest provides school boards, principals, and science departments with full turnkey sustainability management:
            </p>

            <ul className="space-y-3.5 text-sm text-eco-dark font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-eco-primary shrink-0 mt-0.5" />
                <span><strong>One-Tap Teacher Verification:</strong> Fast, non-intrusive review queue for homeroom teachers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-eco-primary shrink-0 mt-0.5" />
                <span><strong>Instant CSV Green Audit Export:</strong> Ready for school accreditation and state climate reporting.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-eco-primary shrink-0 mt-0.5" />
                <span><strong>Strict Student Privacy:</strong> COPPA and FERPA compliant. Submissions anonymized and pictures purged.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/for-schools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-eco-dark text-white font-bold text-sm hover:bg-eco-primary transition-colors"
              >
                <span>Explore School Management Features</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-eco-border shadow-eco space-y-6">
            <div className="flex items-center justify-between border-b border-eco-border pb-4">
              <h4 className="font-display font-bold text-base text-eco-dark">
                School Green Audit Sample
              </h4>
              <span className="text-[11px] font-bold text-eco-primary bg-eco-lime/20 px-2 py-0.5 rounded">
                Annual Audit
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-eco-subtle font-semibold">
                <span>Greenfield International School</span>
                <span className="text-eco-primary font-bold">14,250 kg CO₂ avoided</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-eco-subtle font-semibold">
                <span>Total Active Students</span>
                <span className="text-eco-dark font-bold">420 Students</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-eco-subtle font-semibold">
                <span>Verification Accuracy</span>
                <span className="text-eco-dark font-bold">98.4% verified</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <strong>Green Flag Eco-Schools Certification:</strong>
              <p>Greenfield International is currently tracking in the 94th percentile for campus habit compliance.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-eco-dark via-eco-primary to-eco-dark text-white rounded-3xl p-8 sm:p-16 text-center space-y-6 shadow-eco-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-eco-lime">
              Get Started In Minutes
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Ready to Turn Sustainability Into a Habit?
            </h2>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Join Aarav and thousands of students making everyday micro-choices that safeguard our planet's future.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/student/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-eco-lime hover:bg-white text-eco-dark font-display font-extrabold text-base shadow-lg transition-all"
              >
                Start Your Eco Journey (Aarav Demo)
              </Link>
              <Link
                to="/for-schools"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md transition-all"
              >
                Register Your School
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
