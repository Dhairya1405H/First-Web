import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  CalendarCheck, 
  FileText, 
  Leaf, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Award 
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-eco-dark to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-eco relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-eco-sky text-xs font-bold border border-white/20">
            <span>Executive School Oversight • Academic Year 2026–2027</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl">
            Greenfield International School Leadership
          </h1>
          <p className="text-white/85 text-base">
            Institutional analytics tracking attendance compliance, academic coursework, and audited sustainability benchmarks.
          </p>
        </div>
      </div>

      {/* 14. EXACT THREE UNIFIED ADMIN CARDS REQUESTED BY PROMPT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* School Attendance Card */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                School Attendance
              </span>
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-eco-dark">
              94.6%
            </div>
            <p className="text-xs text-eco-muted font-medium">
              School-wide daily average across 420 enrolled students in 12 classes.
            </p>
          </div>

          <Link
            to="/admin/attendance"
            className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
          >
            <span>View School-Wide Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Assignments Card */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                Assignments
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-eco-dark">
              86% <span className="text-sm font-bold text-eco-muted">submission rate</span>
            </div>
            <p className="text-xs text-eco-muted font-medium">
              342 on-time submissions across active science and civics coursework.
            </p>
          </div>

          <Link
            to="/admin/assignments"
            className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
          >
            <span>View Academic Audits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Sustainability Card */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                Sustainability
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-eco-primary">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-eco-dark">
              18,492 <span className="text-sm font-bold text-eco-muted">completed</span>
            </div>
            <p className="text-xs text-eco-muted font-medium">
              Verified eco-challenges: 14,250 kg CO₂ avoided and 85,000 L water saved.
            </p>
          </div>

          <Link
            to="/student/impact"
            className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
          >
            <span>Export Green Audit (CSV)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Class Comparison Preview */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-eco-border pb-4">
          <h3 className="font-display font-bold text-lg text-eco-dark">
            Executive Summary: Grade 8 & 9 Key Cohorts
          </h3>
          <span className="text-xs font-bold text-eco-sky bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Term 1 Standing
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-eco-subtle rounded-2xl">
            <span className="text-xs font-bold text-eco-muted block">Class 8-A</span>
            <span className="text-xl font-display font-black text-eco-dark">96%</span>
            <span className="text-[10px] text-eco-primary font-bold">Leader</span>
          </div>
          <div className="p-3 bg-eco-subtle rounded-2xl">
            <span className="text-xs font-bold text-eco-muted block">Class 8-B</span>
            <span className="text-xl font-display font-black text-eco-dark">94%</span>
            <span className="text-[10px] text-eco-muted">Average</span>
          </div>
          <div className="p-3 bg-eco-subtle rounded-2xl">
            <span className="text-xs font-bold text-eco-muted block">Class 8-C</span>
            <span className="text-xl font-display font-black text-eco-dark">95%</span>
            <span className="text-[10px] text-eco-muted">Strong</span>
          </div>
          <div className="p-3 bg-eco-subtle rounded-2xl">
            <span className="text-xs font-bold text-eco-muted block">Class 9-A</span>
            <span className="text-xl font-display font-black text-eco-dark">93%</span>
            <span className="text-[10px] text-amber-700 font-bold">Needs Focus</span>
          </div>
          <div className="p-3 bg-eco-subtle rounded-2xl">
            <span className="text-xs font-bold text-eco-muted block">Class 9-B</span>
            <span className="text-xl font-display font-black text-eco-dark">95%</span>
            <span className="text-[10px] text-eco-primary font-bold">Active</span>
          </div>
        </div>
      </div>

    </div>
  );
};
