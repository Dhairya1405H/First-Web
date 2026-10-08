import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  School, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  FileDown, 
  Users, 
  TreePine, 
  ArrowRight, 
  Check, 
  Sparkles,
  Calculator,
  Sliders
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const ForSchoolsPage: React.FC = () => {
  const { submissions, verifySubmission } = useEco();
  const [studentCount, setStudentCount] = useState<number>(450);

  // Projected metrics based on EPA model
  const projectedCo2 = Math.round(studentCount * 38.5); // kg per school year
  const projectedWater = Math.round(studentCount * 1420); // Liters
  const projectedPlastics = Math.round(studentCount * 95); // single-use items

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-eco-primary bg-eco-lime/20 px-3 py-1 rounded-full">
          Institutional Platform
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-eco-dark">
          Empower Your Entire School with Verifiable Climate Action
        </h1>
        <p className="text-base sm:text-lg text-eco-muted">
          EcoQuest equips principals, science faculties, and eco-clubs with turnkey habit management, automated data collection, and verified sustainability reporting.
        </p>
      </div>

      {/* Interactive School Impact Estimator */}
      <div className="bg-gradient-to-r from-eco-dark to-eco-primary text-white rounded-3xl p-8 sm:p-12 shadow-eco-lg space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-lime">
            <Calculator className="w-4 h-4" />
            <span>Interactive Campus Impact Calculator</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
            See What Your School Can Achieve
          </h2>
          <p className="text-sm text-white/80">
            Slide the student enrollment count below to preview estimated annual environmental savings:
          </p>
        </div>

        {/* Slider */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
          <div className="flex justify-between items-center text-sm font-bold">
            <span>Enrolled Students Participating:</span>
            <span className="font-display font-black text-2xl text-eco-lime">{studentCount} Students</span>
          </div>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={studentCount}
            onChange={(e) => setStudentCount(Number(e.target.value))}
            className="w-full accent-eco-lime h-2.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/60">
            <span>100 Students (Single Grade)</span>
            <span>1,000 Students</span>
            <span>2,000+ Students (District)</span>
          </div>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-black text-eco-lime">
              {projectedCo2.toLocaleString()} kg
            </div>
            <div className="text-xs sm:text-sm font-bold">Est. CO₂ Avoided / Year</div>
            <div className="text-[11px] text-white/70">~{(projectedCo2 * 4).toLocaleString()} car km equivalent</div>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-black text-white">
              {projectedWater.toLocaleString()} L
            </div>
            <div className="text-xs sm:text-sm font-bold">Est. Water Conserved</div>
            <div className="text-[11px] text-white/70">~{Math.round(projectedWater / 60)} showers saved</div>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-black text-eco-lime">
              {projectedPlastics.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm font-bold">Single-Use Plastics Avoided</div>
            <div className="text-[11px] text-white/70">Direct cafeteria waste reduction</div>
          </div>
        </div>
      </div>

      {/* Teacher Verification Queue Preview */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-eco-primary">
              Live Teacher Portal Preview
            </span>
            <h3 className="font-display font-bold text-2xl text-eco-dark mt-1">
              Teacher Verification Queue
            </h3>
            <p className="text-xs sm:text-sm text-eco-muted mt-0.5">
              Teachers can review and approve student submissions in 1 click:
            </p>
          </div>
          <span className="text-xs font-bold text-eco-dark bg-eco-subtle border border-eco-border px-3 py-1.5 rounded-xl self-start">
            Pending Queue: {submissions.filter(s => s.status === 'pending').length} item(s)
          </span>
        </div>

        <div className="divide-y divide-eco-border">
          {submissions.map((sub) => (
            <div key={sub.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                <div className="text-[11px] text-eco-muted/70">Submitted {sub.submittedAt}</div>
              </div>

              {sub.status === 'pending' ? (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => verifySubmission(sub.id, 'verified')}
                    className="px-3.5 py-1.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    ✓ Approve (+{sub.points} pts)
                  </button>
                  <button
                    onClick={() => verifySubmission(sub.id, 'rejected')}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs transition-colors cursor-pointer"
                  >
                    ✕ Request Revision
                  </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-eco-primary flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Approved
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3 Pillars for Schools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-7 rounded-3xl border border-eco-border shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-eco-subtle text-eco-primary flex items-center justify-center">
            <FileDown className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-lg text-eco-dark">Instant Green Audit Reports</h4>
          <p className="text-xs text-eco-muted leading-relaxed">
            One-click CSV exports listing exact carbon and waste diversion figures for school board presentations, accreditation, and parent open days.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-eco-border shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-eco-subtle text-eco-primary flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-lg text-eco-dark">Curriculum Alignment</h4>
          <p className="text-xs text-eco-muted leading-relaxed">
            Designed to integrate directly with middle and high school biology, environmental science, and civics curricula without adding grading burden.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-eco-border shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-eco-subtle text-eco-primary flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-display font-bold text-lg text-eco-dark">Student Privacy First</h4>
          <p className="text-xs text-eco-muted leading-relaxed">
            Fully compliant with COPPA, FERPA, and international minor protection laws. No biometric retention, no advertisements, and minimal data collection.
          </p>
        </div>
      </div>

    </div>
  );
};
