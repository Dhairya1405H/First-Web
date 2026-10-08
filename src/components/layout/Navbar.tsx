import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  TreePine, 
  ShieldCheck, 
  GraduationCap, 
  Flame, 
  Award,
  LogOut,
  LogIn
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, activeRole, setActiveRole, isAuthenticated, logout } = useEco();

  const isStudentRoute = location.pathname.startsWith('/student');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'For Schools', path: '/for-schools' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-eco-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-eco-dark via-eco-primary to-eco-lime flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-eco-dark group-hover:text-eco-primary transition-colors">
                Eco<span className="text-eco-primary">Quest</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-eco-lime/20 text-eco-dark rounded">
                Schools
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-eco-primary bg-eco-subtle/80 font-bold'
                      : 'text-eco-muted hover:text-eco-dark hover:bg-eco-subtle/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Quick Demo Role Switcher Pill */}
                <div className="flex items-center bg-eco-subtle border border-eco-border/80 rounded-full p-1 text-xs font-medium text-eco-muted">
                  <Link
                    to="/student/dashboard"
                    onClick={() => setActiveRole('student')}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      activeRole === 'student'
                        ? 'bg-eco-primary text-white font-semibold shadow-sm'
                        : 'hover:text-eco-dark'
                    }`}
                  >
                    Student
                  </Link>
                  <Link
                    to="/teacher/dashboard"
                    onClick={() => setActiveRole('teacher')}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      activeRole === 'teacher'
                        ? 'bg-eco-dark text-white font-semibold shadow-sm'
                        : 'hover:text-eco-dark'
                    }`}
                    title="Open Teacher Portal"
                  >
                    Teacher
                  </Link>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setActiveRole('admin')}
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      activeRole === 'admin'
                        ? 'bg-eco-sky text-white font-semibold shadow-sm'
                        : 'hover:text-eco-dark'
                    }`}
                    title="Open Admin Console"
                  >
                    Admin
                  </Link>
                </div>

                {/* Dashboard Launcher */}
                <Link
                  to={`/${activeRole}/dashboard`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-eco-primary text-white font-semibold text-sm hover:bg-eco-dark shadow-sm hover:shadow-eco transition-all duration-200"
                >
                  <Flame className="w-4 h-4 text-eco-lime animate-pulse" />
                  <span>{user.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Sign Out Button */}
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/login', { replace: true });
                  }}
                  title="Sign Out"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-eco-border text-eco-muted hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-eco-primary text-white font-bold text-sm hover:bg-eco-dark shadow-md transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated ? (
              <Link
                to={`/${activeRole}/dashboard`}
                className="px-3 py-1.5 rounded-lg bg-eco-primary text-white text-xs font-bold"
              >
                App
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg bg-eco-primary text-white text-xs font-bold"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-eco-text hover:bg-eco-subtle transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-eco-border bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-eco-primary bg-eco-subtle font-bold'
                    : 'text-eco-text hover:bg-eco-subtle'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-eco-border flex flex-col gap-2">
            <Link
              to="/student/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-eco-primary text-white font-bold text-center shadow"
            >
              <Flame className="w-4 h-4 text-eco-lime" />
              Enter Student Dashboard (Aarav)
            </Link>
            <div className="flex justify-between items-center text-xs text-eco-muted px-1 pt-2">
              <span>Demo Role:</span>
              <div className="flex gap-1.5">
                {(['student', 'teacher', 'admin'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveRole(role);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs capitalize ${
                      activeRole === role ? 'bg-eco-dark text-white font-bold' : 'bg-eco-subtle text-eco-text'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
