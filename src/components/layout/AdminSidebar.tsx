import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  BarChart3, 
  TreePine, 
  ArrowLeft,
  Building,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useEco();
  const navItems = [
    { name: 'Executive Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'School Attendance', path: '/admin/attendance', icon: CalendarCheck, badge: '94.6%' },
    { name: 'Assignments Audit', path: '/admin/assignments', icon: FileText, badge: '86%' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-eco-border flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-eco-border/80 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-eco-dark to-eco-sky flex items-center justify-center text-white shadow-sm">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight text-eco-dark">
              Eco<span className="text-eco-primary">Quest</span>
            </span>
            <span className="block text-[10px] font-bold text-eco-sky uppercase tracking-wider">
              Admin Console
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-eco-muted">
          Institutional Governance
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
                    ? 'bg-eco-sky text-white shadow-sm'
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

      {/* Admin User Info */}
      <div className="p-4 border-t border-eco-border/80 bg-eco-bg/60 space-y-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-eco-border shadow-xs">
          <div className="w-10 h-10 rounded-full bg-eco-sky text-white flex items-center justify-center font-bold text-sm shadow-inner">
            DR
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-eco-text truncate">Dr. Rajesh Patel</h5>
            <p className="text-[11px] text-eco-muted truncate font-medium">Principal & Academic Dean</p>
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
