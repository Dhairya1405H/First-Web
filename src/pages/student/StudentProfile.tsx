import React from 'react';
import { 
  User, 
  Flame, 
  Sparkles, 
  Trophy, 
  Award, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  School, 
  Calendar,
  Lock,
  Camera,
  FileText
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const StudentProfile: React.FC = () => {
  const { user, submissions, badges } = useEco();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar with Streak Badge */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-eco-dark via-eco-primary to-eco-lime flex items-center justify-center font-display font-black text-white text-3xl sm:text-4xl shadow-md">
              AS
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white rounded-2xl p-1.5 shadow-md flex items-center gap-1 text-xs font-black">
              <Flame className="w-4 h-4 fill-white" />
              <span>{user.streak}d</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-eco-dark">
                  {user.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-eco-muted mt-0.5">
                  <School className="w-4 h-4 text-eco-primary" />
                  <span>{user.school} • {user.grade}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-eco-lime/20 border border-eco-lime/40 text-eco-dark font-extrabold text-xs self-center sm:self-auto">
                <Award className="w-4 h-4 text-eco-primary" />
                <span>Level {user.levelNumber}: {user.level}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-eco-muted max-w-xl">
              Student Climate Ambassador leading campus waste segregation and zero-single-use cafeteria initiatives.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-eco-muted">
              <span>Member since: <strong>August 2026</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-eco-primary">
                <ShieldCheck className="w-4 h-4" /> Child-Safe Anonymized Profile
              </span>
            </div>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-eco-border/70 text-center">
          <div className="p-3 bg-eco-subtle/50 rounded-2xl">
            <span className="text-xs text-eco-muted font-bold block">Eco Points</span>
            <span className="text-xl sm:text-2xl font-display font-black text-eco-dark">{user.points.toLocaleString()}</span>
          </div>
          <div className="p-3 bg-eco-subtle/50 rounded-2xl">
            <span className="text-xs text-eco-muted font-bold block">Class Rank</span>
            <span className="text-xl sm:text-2xl font-display font-black text-amber-600">#{user.rank}</span>
          </div>
          <div className="p-3 bg-eco-subtle/50 rounded-2xl">
            <span className="text-xs text-eco-muted font-bold block">Challenges Completed</span>
            <span className="text-xl sm:text-2xl font-display font-black text-eco-dark">{user.challengesCompleted}</span>
          </div>
          <div className="p-3 bg-eco-subtle/50 rounded-2xl">
            <span className="text-xs text-eco-muted font-bold block">Badges Earned</span>
            <span className="text-xl sm:text-2xl font-display font-black text-eco-primary">5 / 8</span>
          </div>
        </div>
      </div>

      {/* Verification Timeline Feed */}
      <div className="bg-white rounded-3xl border border-eco-border shadow-2xs p-6 sm:p-7 space-y-5">
        <div>
          <h3 className="font-display font-bold text-xl text-eco-dark">
            Verified Submissions & Activity Log
          </h3>
          <p className="text-xs text-eco-muted mt-0.5">
            Chronological record of verified environmental actions with teacher approvals
          </p>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-4 sm:p-5 rounded-2xl bg-eco-subtle/60 border border-eco-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-eco-border flex items-center justify-center text-eco-primary shrink-0 shadow-2xs">
                  {sub.proofType === 'photo' ? (
                    <Camera className="w-5 h-5 text-eco-primary" />
                  ) : (
                    <FileText className="w-5 h-5 text-eco-primary" />
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-eco-dark">{sub.challengeTitle}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-eco-muted">{sub.notes}</p>
                  <span className="text-[11px] text-eco-muted/80 block font-medium">
                    Submitted: {sub.submittedAt}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                <span className="font-display font-extrabold text-sm text-eco-primary">
                  +{sub.points} pts
                </span>
                {sub.aiVerification && (
                  <span className="text-[10px] text-eco-muted font-medium">
                    AI match: {Math.round(sub.aiVerification.confidence * 100)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
