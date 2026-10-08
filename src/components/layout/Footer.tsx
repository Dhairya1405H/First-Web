import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Heart, Shield, Leaf, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-eco-dark text-white pt-16 pb-12 border-t border-eco-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-eco-lime flex items-center justify-center text-eco-dark font-black">
                <TreePine className="w-5 h-5 text-eco-dark" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Eco<span className="text-eco-lime">Quest</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Gamified environmental education platform empowering K-12 students to build daily climate habits and generate verified school impact.
            </p>
            <div className="flex items-center gap-2 text-xs text-eco-lime font-medium pt-1">
              <Leaf className="w-4 h-4" />
              <span>Certified Child-Safe & Carbon Neutral</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-eco-lime">Platform</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/challenges" className="hover:text-white transition-colors">Challenge Catalog</Link></li>
              <li><Link to="/for-schools" className="hover:text-white transition-colors">For School Principals</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Mission</Link></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-eco-lime">Student Portal</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link to="/student/dashboard" className="hover:text-white transition-colors">Aarav's Dashboard</Link></li>
              <li><Link to="/student/challenges" className="hover:text-white transition-colors">Active Challenges</Link></li>
              <li><Link to="/student/leaderboard" className="hover:text-white transition-colors">Class Leaderboards</Link></li>
              <li><Link to="/student/achievements" className="hover:text-white transition-colors">Badges & Streaks</Link></li>
              <li><Link to="/student/impact" className="hover:text-white transition-colors">Estimated Impact</Link></li>
            </ul>
          </div>

          {/* School & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-eco-lime">Verification & Safety</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Submissions undergo student privacy checks and teacher validation. Photos are deleted post-verification in accordance with child protection standards.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
              <div className="flex items-center gap-1.5 text-eco-lime font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>COPPA & FERPA Compliant</span>
              </div>
              <p className="text-[11px] text-white/60">
                All metrics calculated using EPA & IPCC conversion factors.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 EcoQuest Platform. All rights reserved. Designed for Environmental Impact.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-eco-lime fill-eco-lime" /> for clean air & water
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
