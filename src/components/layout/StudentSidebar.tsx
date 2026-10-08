import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck,
  FileText,
  Target, 
  Trophy, 
  Award, 
  Leaf, 
  BookOpen, 
  User, 
  Flame, 
  TreePine, 
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

interface StudentSidebarProps {
  onCloseMobile?: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { user, challenges, assignments, logout } = useEco();

  const activeCount = challenges.filter(c => c.status === 'active').length;
  const pendingAssignmentsCount = assignments.length;

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', path: '/student/attendance', icon: CalendarCheck, badge: '92%' },
    { name: 'Assignments', path: '/student/assignments', icon: FileText, badge: `${pendingAssignmentsCount} Tasks` },
    { name: 'Challenges', path: '/student/challenges', icon: Target, badge: `${activeCount} Active` },
    { name: 'Leaderboard', path: '/student/leaderboard', icon: Trophy, badge: `#${user.rank}` },
    { name: 'Achievements', path: '/student/achievements', icon: Award },
    { name: 'My Impact', path: '/student/impact', icon: Leaf },
    { name: 'Learning', path: '/student/learning', icon: BookOpen },
    { name: 'Profile', path: '/student/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-eco-border flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-eco-border/80 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-eco-dark to-eco-primary flex items-center justify-center text-white shadow-sm">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight text-eco-dark">
              Eco<span className="text-eco-primary">Quest</span>
            </span>
            <span className="block text-[10px] font-bold text-eco-muted uppercase tracking-wider">
              Student App
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-eco-muted">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-eco-primary text-white shadow-sm'
                    : 'text-eco-muted hover:text-eco-dark hover:bg-eco-subtle/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-eco-muted'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-eco-subtle text-eco-dark border border-eco-border'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Aarav Mini Profile & Back to site */}
      <div className="p-4 border-t border-eco-border/80 bg-eco-bg/60 space-y-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-eco-border shadow-xs">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-eco-primary to-eco-lime flex items-center justify-center font-extrabold text-white text-base shadow-inner">
              AS
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5" title="12-Day Habit Streak">
              <Flame className="w-3 h-3 fill-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-eco-text truncate">{user.name}</h5>
              <span className="text-[10px] font-extrabold text-eco-primary bg-eco-lime/20 px-1.5 py-0.2 rounded">
                Lv. {user.levelNumber}
              </span>
            </div>
            <p className="text-[11px] text-eco-muted truncate font-medium">{user.level}</p>
          </div>
        </div>

        <button
          onClick={async () => {
            await logout();
            navigate('/login', { replace: true });
          }}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
