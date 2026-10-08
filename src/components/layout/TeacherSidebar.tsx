import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  ShieldCheck, 
  GraduationCap, 
  TreePine, 
  ArrowLeft,
  Users,
  LogOut
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

interface TeacherSidebarProps {
  onCloseMobile?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { submissions, assignments, logout } = useEco();
  const pendingVerifications = submissions.filter(s => s.status === 'pending').length;

  const navItems = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', path: '/teacher/attendance', icon: CalendarCheck, badge: '94%' },
    { name: 'Assignments', path: '/teacher/assignments', icon: FileText, badge: `${assignments.length} Active` },
    { name: 'Eco Verifications', path: '/teacher/verifications', icon: ShieldCheck, badge: `${pendingVerifications} Queue` },
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
              Teacher Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-eco-muted">
          Teacher Management
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
                    ? 'bg-eco-dark text-white shadow-sm'
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

      {/* Teacher Profile Info */}
      <div className="p-4 border-t border-eco-border/80 bg-eco-bg/60 space-y-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-eco-border shadow-xs">
          <div className="w-10 h-10 rounded-full bg-eco-dark text-white flex items-center justify-center font-bold text-sm shadow-inner">
            PM
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-eco-text truncate">Priya Mehta</h5>
            <p className="text-[11px] text-eco-muted truncate font-medium">Class 9-B Homeroom & Env. Sci</p>
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
