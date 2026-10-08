import React from 'react';
import { 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Droplets, 
  Zap, 
  Recycle, 
  Bike, 
  PackageX, 
  TreePine,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Challenge } from '../../types';

interface ChallengeCardProps {
  challenge: Challenge;
  onAction?: (challenge: Challenge) => void;
  featured?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onAction,
  featured = false,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Plastic':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Transport':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Water':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Energy':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Waste':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Biodiversity':
        return 'bg-lime-50 text-lime-800 border-lime-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-600 bg-emerald-50';
      case 'Medium':
        return 'text-amber-600 bg-amber-50';
      case 'Hard':
        return 'text-rose-600 bg-rose-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageX':
        return <PackageX className="w-5 h-5 text-rose-600" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-blue-600" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Recycle':
        return <Recycle className="w-5 h-5 text-emerald-600" />;
      case 'TreePine':
        return <TreePine className="w-5 h-5 text-lime-700" />;
      default:
        return <Sparkles className="w-5 h-5 text-eco-primary" />;
    }
  };

  const percentage = Math.round((challenge.progress / challenge.total) * 100);
  const isComplete = challenge.progress >= challenge.total || challenge.status === 'completed';

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white ${
        featured
          ? 'border-eco-primary/40 shadow-eco ring-1 ring-eco-primary/20 hover:shadow-eco-lg'
          : 'border-eco-border shadow-xs hover:shadow-eco hover:border-eco-primary/30'
      }`}
    >
      {/* Top Details */}
      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Category, Difficulty & Points Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getCategoryColor(challenge.category)}`}>
              {challenge.category}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-eco-lime/20 border border-eco-lime/40 text-eco-dark font-extrabold text-xs shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-eco-primary fill-eco-primary" />
            <span>+{challenge.points} pts</span>
          </div>
        </div>

        {/* Title & Icon Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-eco-subtle border border-eco-border/80 flex items-center justify-center shrink-0">
            {getCategoryIcon(challenge.icon)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-base sm:text-lg text-eco-dark leading-snug group-hover:text-eco-primary transition-colors">
              {challenge.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-eco-muted mt-1 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {challenge.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-primary" />
                {challenge.requiresProof === 'both' ? 'Photo or Log' : challenge.requiresProof === 'photo' ? 'Photo Proof' : 'Daily Log'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-eco-muted leading-relaxed line-clamp-2">
          {challenge.description}
        </p>

        {/* Progress Section */}
        <div className="pt-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-eco-dark">
              Progress: <span className="text-eco-primary">{challenge.progress}</span> / {challenge.total} days
            </span>
            <span className="text-eco-muted">{percentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-eco-subtle rounded-full overflow-hidden border border-eco-border/40">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete ? 'bg-eco-primary' : 'bg-gradient-to-r from-eco-primary to-eco-lime'
              }`}
              style={{ width: `${Math.min(100, percentage)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Footer / CTA */}
      <div className="p-4 sm:p-5 bg-eco-subtle/50 border-t border-eco-border/70 flex items-center justify-between gap-3">
        <div className="text-[11px] text-eco-muted font-medium">
          {isComplete ? (
            <span className="inline-flex items-center gap-1 text-eco-primary font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          ) : (
            <span>Reward on completion: <strong className="text-eco-dark">+{challenge.points} XP</strong></span>
          )}
        </div>

        <button
          onClick={() => onAction && onAction(challenge)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
            isComplete
              ? 'bg-eco-subtle text-eco-dark hover:bg-eco-border/70 border border-eco-border'
              : 'bg-eco-primary hover:bg-eco-dark text-white shadow-xs hover:shadow-eco'
          }`}
        >
          <span>{isComplete ? 'View Summary' : challenge.progress > 0 ? 'Continue Challenge' : 'Start Challenge'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
