import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TreePine, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Camera, 
  FileText, 
  Flame, 
  Trophy, 
  Users, 
  Leaf, 
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-subtle border border-eco-border text-xs font-bold text-eco-primary">
          <Sparkles className="w-4 h-4 fill-eco-primary" />
          <span>The EcoQuest Methodology</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-eco-dark">
          How EcoQuest Works: From Action to Verified Impact
        </h1>
        <p className="text-base sm:text-lg text-eco-muted leading-relaxed">
          Traditional environmental education stops in the textbook. EcoQuest builds a continuous positive feedback loop that turns eco-friendly actions into lifelong daily habits.
        </p>
      </div>

      {/* The 3 Core Stages */}
      <div className="space-y-12">
        
        {/* Stage 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-eco-border shadow-2xs">
          <div className="space-y-4">
            <span className="w-10 h-10 rounded-xl bg-eco-primary text-white flex items-center justify-center font-display font-black text-lg">
              1
            </span>
            <h2 className="font-display font-bold text-2xl text-eco-dark">
              Structured Daily & Weekly Quests
            </h2>
            <p className="text-sm text-eco-muted leading-relaxed">
              Challenges are broken down into bite-sized daily objectives. Rather than vague goals like "help the planet", students get specific quests:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-eco-text font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-eco-primary" />
                <span>Plastic-Free Week: Swap all disposables for steel bottles & lunchboxes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-eco-primary" />
                <span>Green Commute: Cycle or walk to school 5 days in a row</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-eco-primary" />
                <span>Water Saver: 4-minute timed shower playlist</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-eco-subtle border border-eco-border space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-eco-primary">Pedagogical Benefit</div>
            <h4 className="font-bold text-base text-eco-dark">Reduces Overwhelm & Eco-Anxiety</h4>
            <p className="text-xs text-eco-muted leading-relaxed">
              Giving students immediate agency transforms climate feelings from passive anxiety into active empowerment and confidence.
            </p>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-eco-border shadow-2xs">
          <div className="space-y-4 lg:order-2">
            <span className="w-10 h-10 rounded-xl bg-eco-primary text-white flex items-center justify-center font-display font-black text-lg">
              2
            </span>
            <h2 className="font-display font-bold text-2xl text-eco-dark">
              Child-Safe AI Pre-Check & Teacher Verification
            </h2>
            <p className="text-sm text-eco-muted leading-relaxed">
              Accountability matters. Submissions are backed by photo proof or structured activity logs for students without smartphones.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-eco-text font-medium">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-eco-primary" />
                <span>AI computer vision analyzes object detection (reusable containers, bikes)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-eco-primary" />
                <span>Homeroom teachers approve high-value badges with a 1-tap queue</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-eco-primary" />
                <span>Photos are automatically purged post-audit to protect child privacy</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-eco-subtle border border-eco-border space-y-3 lg:order-1">
            <div className="font-bold text-xs uppercase tracking-wider text-eco-primary">Verification Pipeline</div>
            <h4 className="font-bold text-base text-eco-dark">Instant Gratification + Anti-Cheat</h4>
            <p className="text-xs text-eco-muted leading-relaxed">
              Students receive instantaneous points feedback, while teacher spot-checks ensure data integrity for official school green audit reports.
            </p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-eco-border shadow-2xs">
          <div className="space-y-4">
            <span className="w-10 h-10 rounded-xl bg-eco-primary text-white flex items-center justify-center font-display font-black text-lg">
              3
            </span>
            <h2 className="font-display font-bold text-2xl text-eco-dark">
              Collective Class Impact & Rewards
            </h2>
            <p className="text-sm text-eco-muted leading-relaxed">
              Individual habits compound into massive school-wide outcomes that students celebrate together:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-eco-text font-medium">
              <li className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-eco-primary" />
                <span>Homeroom leaderboards encourage positive peer accountability</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-eco-primary" />
                <span>School-wide green audits are generated for parent assemblies</span>
              </li>
              <li className="flex items-center gap-2">
                <TreePine className="w-4 h-4 text-eco-primary" />
                <span>Class milestones unlock real tree plantings on school campus grounds</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-eco-subtle border border-eco-border space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-eco-primary">Real-World Outcome</div>
            <h4 className="font-bold text-base text-eco-dark">Measurable Carbon Reductions</h4>
            <p className="text-xs text-eco-muted leading-relaxed">
              Schools see immediate drops in single-use cafeteria waste, reduced morning car congestion, and verified energy conservation.
            </p>
          </div>
        </div>

      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-eco-dark to-eco-primary text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
        <h3 className="font-display font-bold text-2xl sm:text-3xl">
          Experience the Student Journey Today
        </h3>
        <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base">
          Try the active student dashboard, inspect challenges, view leaderboards, and test the verification flow.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/student/dashboard"
            className="px-6 py-3.5 rounded-xl bg-eco-lime text-eco-dark font-bold text-sm shadow hover:bg-white transition-colors"
          >
            Launch Student Dashboard
          </Link>
          <Link
            to="/challenges"
            className="px-6 py-3.5 rounded-xl bg-white/15 text-white font-bold text-sm hover:bg-white/25 transition-colors"
          >
            Explore All Challenges
          </Link>
        </div>
      </div>

    </div>
  );
};
