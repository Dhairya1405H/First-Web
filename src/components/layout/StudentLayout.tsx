import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Flame, 
  Sparkles, 
  PlusCircle, 
  Bell, 
  ShieldCheck, 
  CheckCircle2,
  TreePine,
  Award
} from 'lucide-react';
import { StudentSidebar } from './StudentSidebar';
import { SubmitProofModal } from '../ui/SubmitProofModal';
import { useEco } from '../../context/EcoContext';

export const StudentLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const { user, celebrationBadge, setCelebrationBadge, activeRole, setActiveRole } = useEco();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-eco-bg flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        <StudentSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-eco-text/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileSidebarOpen(false)} 
          />
          <div className="relative w-72 max-w-xs bg-white h-full z-10 shadow-2xl flex flex-col">
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-eco-muted hover:text-eco-dark hover:bg-eco-subtle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <StudentSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-eco-border px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Mobile menu button & breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-eco-muted hover:text-eco-dark hover:bg-eco-subtle md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden sm:block">
              <div className="text-[11px] font-bold uppercase tracking-wider text-eco-muted">
                {user.school} • {user.grade}
              </div>
              <div className="text-sm font-extrabold text-eco-dark flex items-center gap-1.5">
                <span>Welcome back, {user.name}</span>
                <span className="text-eco-primary">🌱</span>
              </div>
            </div>
          </div>

          {/* Gamification Pills & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 shadow-2xs group cursor-default"
              title={`${user.streak} days of continuous sustainable actions!`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold">{user.streak} Days</span>
            </div>

            {/* Eco Points Pill */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-eco-subtle border border-eco-border text-eco-dark shadow-2xs cursor-default"
              title="Total accumulated Eco Points"
            >
              <Sparkles className="w-4 h-4 text-eco-primary fill-eco-primary" />
              <span className="text-xs sm:text-sm font-extrabold text-eco-dark">
                {user.points.toLocaleString()} <span className="text-eco-muted font-normal text-xs hidden sm:inline">pts</span>
              </span>
            </div>

            {/* Log Action Button */}
            <button
              onClick={() => setSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-eco transition-all duration-150"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Log Eco Action</span>
              <span className="sm:hidden">Log</span>
            </button>

            {/* Role Demo switcher */}
            <div className="hidden lg:flex items-center bg-eco-subtle rounded-lg p-0.5 border border-eco-border text-[11px] font-semibold">
              <span className="px-2 text-eco-muted">Role:</span>
              <Link
                to="/student/dashboard"
                onClick={() => setActiveRole('student')}
                className={`px-2 py-0.5 rounded ${activeRole === 'student' ? 'bg-eco-primary text-white font-bold' : 'text-eco-muted hover:text-eco-dark'}`}
              >
                Student
              </Link>
              <Link
                to="/teacher/dashboard"
                onClick={() => setActiveRole('teacher')}
                className={`px-2 py-0.5 rounded ${activeRole === 'teacher' ? 'bg-eco-dark text-white font-bold' : 'text-eco-muted hover:text-eco-dark'}`}
              >
                Teacher
              </Link>
              <Link
                to="/admin/dashboard"
                onClick={() => setActiveRole('admin')}
                className={`px-2 py-0.5 rounded ${activeRole === 'admin' ? 'bg-eco-sky text-white font-bold' : 'text-eco-muted hover:text-eco-dark'}`}
              >
                Admin
              </Link>
            </div>

          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

      {/* Proof Submission Modal */}
      <SubmitProofModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
      />

      {/* Celebration Modal (if badge clicked) */}
      {celebrationBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 border border-eco-border shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-eco-dark via-eco-primary to-eco-lime flex items-center justify-center shadow-eco-glow">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-eco-primary">
                {celebrationBadge.tier} Badge
              </span>
              <h3 className="font-display font-extrabold text-2xl text-eco-dark mt-1">
                {celebrationBadge.name}
              </h3>
              <p className="text-sm text-eco-muted mt-2">
                {celebrationBadge.description}
              </p>
            </div>
            {celebrationBadge.unlocked ? (
              <div className="py-2 px-3 rounded-xl bg-eco-subtle text-eco-dark text-xs font-semibold">
                Unlocked on {celebrationBadge.unlockedAt || 'Oct 2026'}
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-eco-muted">
                  <span>Progress</span>
                  <span>{celebrationBadge.progress} / {celebrationBadge.maxProgress}</span>
                </div>
                <div className="w-full h-2.5 bg-eco-subtle rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-eco-primary rounded-full transition-all"
                    style={{ width: `${Math.round(((celebrationBadge.progress || 0) / (celebrationBadge.maxProgress || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            <button
              onClick={() => setCelebrationBadge(null)}
              className="w-full py-2.5 rounded-xl bg-eco-primary text-white font-bold text-sm hover:bg-eco-dark transition-colors"
            >
              Keep Going!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
