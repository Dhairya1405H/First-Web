import React from 'react';
import { 
  Sprout, 
  Droplets, 
  Recycle, 
  Zap, 
  TreePine, 
  ShieldAlert, 
  Bike, 
  Flame, 
  Lock, 
  Sparkles, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { Badge } from '../../types';
import { useEco } from '../../context/EcoContext';

interface BadgeCardProps {
  badge: Badge;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const { setCelebrationBadge } = useEco();

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return <Sprout className="w-8 h-8 text-amber-700" />;
      case 'Droplets':
        return <Droplets className="w-8 h-8 text-blue-600" />;
      case 'Recycle':
        return <Recycle className="w-8 h-8 text-emerald-600" />;
      case 'Zap':
        return <Zap className="w-8 h-8 text-amber-500 fill-amber-500" />;
      case 'TreePine':
        return <TreePine className="w-8 h-8 text-emerald-800" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-8 h-8 text-emerald-600" />;
      case 'Bike':
        return <Bike className="w-8 h-8 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-8 h-8 text-amber-600 fill-amber-600" />;
      default:
        return <Award className="w-8 h-8 text-eco-primary" />;
    }
  };

  const getTierColors = (tier: string, unlocked: boolean) => {
    if (!unlocked) {
      return {
        bg: 'bg-gray-100 border-gray-200 text-gray-400',
        badgeBg: 'bg-gray-200 text-gray-600',
        ring: 'ring-gray-200'
      };
    }

    switch (tier) {
      case 'Bronze':
        return {
          bg: 'bg-gradient-to-b from-amber-50/80 to-amber-100/40 border-amber-300 text-amber-900',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          ring: 'ring-amber-300'
        };
      case 'Silver':
        return {
          bg: 'bg-gradient-to-b from-slate-50 to-slate-100/60 border-slate-300 text-slate-800',
          badgeBg: 'bg-slate-200 text-slate-700 border-slate-300',
          ring: 'ring-slate-300'
        };
      case 'Gold':
        return {
          bg: 'bg-gradient-to-b from-amber-50 to-yellow-100/60 border-yellow-300 text-yellow-950',
          badgeBg: 'bg-yellow-200 text-yellow-900 border-yellow-300',
          ring: 'ring-yellow-400'
        };
      case 'Emerald':
        return {
          bg: 'bg-gradient-to-b from-emerald-50 to-eco-lime/20 border-eco-primary/50 text-eco-dark',
          badgeBg: 'bg-eco-lime/30 text-eco-dark border-eco-lime/50',
          ring: 'ring-eco-primary'
        };
      default:
        return {
          bg: 'bg-white border-eco-border text-eco-dark',
          badgeBg: 'bg-eco-subtle text-eco-dark border-eco-border',
          ring: 'ring-eco-primary'
        };
    }
  };

  const colors = getTierColors(badge.tier, badge.unlocked);

  return (
    <div
      onClick={() => setCelebrationBadge(badge)}
      className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
        badge.unlocked
          ? `${colors.bg} shadow-xs hover:shadow-eco hover:-translate-y-1`
          : 'bg-white border-eco-border/80 opacity-80 hover:opacity-100 hover:border-eco-muted/40'
      }`}
    >
      <div className="space-y-3">
        {/* Tier & Status Pill */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${colors.badgeBg}`}>
            {badge.tier}
          </span>
          {badge.unlocked ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-eco-primary">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Unlocked</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-bold text-eco-muted">
              <Lock className="w-3.5 h-3.5" />
              <span>Locked</span>
            </span>
          )}
        </div>

        {/* Icon & Glow */}
        <div className="flex justify-center my-3">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
              badge.unlocked
                ? 'bg-white ring-4 ' + colors.ring
                : 'bg-eco-subtle text-eco-muted border border-eco-border'
            }`}
          >
            {badge.unlocked ? (
              getBadgeIcon(badge.icon)
            ) : (
              <div className="relative">
                <div className="opacity-40">{getBadgeIcon(badge.icon)}</div>
                <Lock className="w-4 h-4 text-eco-muted absolute -top-1 -right-1" />
              </div>
            )}
          </div>
        </div>

        {/* Badge Name & Info */}
        <div className="text-center space-y-1">
          <h4 className="font-display font-extrabold text-base text-eco-dark group-hover:text-eco-primary transition-colors">
            {badge.name}
          </h4>
          <p className="text-xs text-eco-muted leading-relaxed line-clamp-2">
            {badge.description}
          </p>
        </div>
      </div>

      {/* Bottom Progress or Date */}
      <div className="pt-4 mt-3 border-t border-eco-border/50">
        {badge.unlocked ? (
          <div className="text-[11px] text-center font-medium text-eco-muted">
            Achieved {badge.unlockedAt || 'Recently'}
          </div>
        ) : badge.progress !== undefined && badge.maxProgress !== undefined ? (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-eco-muted">
              <span>Progress</span>
              <span>{badge.progress} / {badge.maxProgress}</span>
            </div>
            <div className="w-full h-2 bg-eco-subtle rounded-full overflow-hidden border border-eco-border/40">
              <div
                className="h-full bg-gradient-to-r from-eco-primary to-eco-lime rounded-full"
                style={{ width: `${Math.round((badge.progress / badge.maxProgress) * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-center font-bold text-eco-muted">
            Complete related quests to unlock
          </div>
        )}
      </div>
    </div>
  );
};
