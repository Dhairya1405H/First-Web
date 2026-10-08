import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  GraduationCap 
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const TeacherDashboard: React.FC = () => {
  const { submissions, assignments, verifySubmission } = useEco();

  const pendingVerifications = submissions.filter(s => s.status === 'pending');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-eco-dark to-eco-primary text-white p-6 sm:p-8 rounded-3xl shadow-eco relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-eco-lime text-xs font-bold border border-white/20">
            <span>Homeroom & Environmental Science • Class 9-B</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl">
            Welcome back, Priya Mehta! 👩‍🏫
          </h1>
          <p className="text-white/85 text-base">
            Unified Educator Console: Manage attendance, evaluate coursework, and verify student climate action.
          </p>
        </div>
      </div>

      {/* 13. EXACT THREE UNIFIED CARDS REQUESTED BY PROMPT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Attendance Today Card */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                Attendance Today
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-eco-dark">
              94%
            </div>
            <p className="text-xs text-eco-muted font-medium">
              31 present, 1 late, 1 absent out of 33 students in Class 9-B.
            </p>
          </div>

          <Link
            to="/teacher/attendance"
            className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
          >
            <span>Take / Edit Attendance</span>
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
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-eco-dark">
              12 <span className="text-sm font-bold text-eco-muted">pending submissions</span>
            </div>
            <p className="text-xs text-eco-muted font-medium">
              Climate Change Essay due in 3 days. 24 students submitted.
            </p>
          </div>

          <Link
            to="/teacher/assignments"
            className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
          >
            <span>Grade & Manage Coursework</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Challenges Card */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">
                Challenges
              </span>
              <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-eco-dark">
              18 <span className="text-sm font-bold text-eco-muted">pending verifications</span>
            </div>
            <p className="text-xs text-eco-muted font-medium">
              Student photo proofs & commute activity logs ready for review.
            </p>
          </div>

          <Link
            to="/teacher/verifications"
            className="w-full py-2.5 rounded-xl bg-eco-subtle hover:bg-eco-border/60 text-eco-dark text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-eco-border"
          >
            <span>Open Verification Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Quick Eco Verification Queue Preview */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-eco-border pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-eco-dark">
              Active Eco-Quest Proof Queue
            </h3>
            <p className="text-xs text-eco-muted mt-0.5">
              Review real student action photos and logs to approve points and update class standings.
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            {pendingVerifications.length} Pending
          </span>
        </div>

        <div className="space-y-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-2xl bg-eco-subtle/50 border border-eco-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-eco-dark">{sub.studentName}</span>
                  <span className="text-xs text-eco-muted">• {sub.challengeTitle}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    sub.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sub.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-eco-muted">{sub.notes}</p>
              </div>

              {sub.status === 'pending' ? (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => verifySubmission(sub.id, 'verified')}
                    className="px-3.5 py-1.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    Approve (+{sub.points} pts)
                  </button>
                  <button
                    onClick={() => verifySubmission(sub.id, 'rejected')}
                    className="px-3 py-1.5 rounded-xl border border-eco-border text-eco-muted hover:text-eco-dark text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-eco-primary flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
