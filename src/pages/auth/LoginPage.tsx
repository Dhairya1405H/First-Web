import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  TreePine, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  GraduationCap,
  Building,
  Users,
  Check
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, activeRole, authLoading } = useEco();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to destination or dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const target = (location.state as any)?.from?.pathname || `/${activeRole}/dashboard`;
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, activeRole, navigate, location]);

  const validate = (): boolean => {
    setErrorMessage(null);
    if (!usernameOrEmail.trim()) {
      setErrorMessage('Please enter your school email or username.');
      return false;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await login(usernameOrEmail.trim(), password);

    if (result.success && result.user) {
      const targetRole = result.user.role || 'student';
      const destination = (location.state as any)?.from?.pathname || `/${targetRole}/dashboard`;
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
      setIsSubmitting(false);
    }
  };

  // Demo accounts helper to test credentials with 1 click
  const selectDemoAccount = (role: 'student' | 'teacher' | 'admin') => {
    setErrorMessage(null);
    if (role === 'student') {
      setUsernameOrEmail('aarav@greenfield.edu');
      setPassword('password123');
    } else if (role === 'teacher') {
      setUsernameOrEmail('teacher@greenfield.edu');
      setPassword('password123');
    } else if (role === 'admin') {
      setUsernameOrEmail('admin@greenfield.edu');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen bg-eco-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-eco-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-eco-lime/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-eco-dark via-eco-primary to-eco-lime flex items-center justify-center text-white shadow-xl shadow-eco-primary/20 mb-4 transform hover:scale-105 transition-transform duration-300">
            <TreePine className="w-9 h-9 text-white" />
          </div>

          <h1 className="font-display font-extrabold text-3xl tracking-tight text-eco-dark">
            Eco<span className="text-eco-primary">Quest</span>
          </h1>
          <p className="mt-1 text-sm font-semibold text-eco-muted">
            Schools Environmental Gamification Platform
          </p>
        </div>

        {/* Main Login Card */}
        <div className="mt-7 bg-white py-8 px-6 sm:px-10 shadow-xl shadow-eco-dark/5 rounded-3xl border border-eco-border/80">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-eco-text">
              Sign in to your account
            </h2>
            <p className="text-xs text-eco-muted mt-1 font-medium">
              Enter your credentials to access student quests, classrooms, and school analytics.
            </p>
          </div>

          {/* Error Message Alert Banner */}
          {errorMessage && (
            <div 
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5 animate-shake"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username or Email Input */}
            <div>
              <label 
                htmlFor="username-email"
                className="block text-xs font-bold uppercase tracking-wider text-eco-text mb-1.5"
              >
                Username or School Email
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-eco-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="username-email"
                  type="text"
                  autoComplete="username"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="e.g. aarav@greenfield.edu or aarav"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm font-medium rounded-xl border border-eco-border bg-white placeholder-eco-muted/60 text-eco-text focus:outline-none focus:ring-2 focus:ring-eco-primary/30 focus:border-eco-primary transition-all"
                />
              </div>
            </div>

            {/* Password Input with Show/Hide Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password-input"
                  className="block text-xs font-bold uppercase tracking-wider text-eco-text"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo password for all accounts is: password123')}
                  className="text-[11px] font-semibold text-eco-primary hover:text-eco-dark transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-eco-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-11 py-2.5 text-sm font-medium rounded-xl border border-eco-border bg-white placeholder-eco-muted/60 text-eco-text focus:outline-none focus:ring-2 focus:ring-eco-primary/30 focus:border-eco-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-eco-muted hover:text-eco-dark transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-eco-primary" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-eco-primary focus:ring-eco-primary border-eco-border"
                />
                <span className="text-xs font-semibold text-eco-muted">
                  Keep me signed in
                </span>
              </label>

              <span className="text-[11px] text-eco-muted flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-primary" />
                SSL Encrypted
              </span>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-eco-primary hover:bg-eco-dark active:scale-[0.99] disabled:opacity-60 transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to EcoQuest</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Switcher */}
          <div className="mt-6 pt-5 border-t border-eco-border/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-eco-muted">
                Quick Test Accounts:
              </span>
              <span className="text-[10px] font-bold text-eco-primary bg-eco-subtle px-2 py-0.5 rounded-full">
                1-Click Autofill
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => selectDemoAccount('student')}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-eco-border/90 bg-eco-bg/50 hover:bg-eco-subtle hover:border-eco-primary/40 transition-all text-center group"
              >
                <div className="w-7 h-7 rounded-lg bg-eco-primary/10 text-eco-primary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-eco-text">Student</span>
                <span className="text-[10px] text-eco-muted font-medium">Aarav</span>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('teacher')}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-eco-border/90 bg-eco-bg/50 hover:bg-eco-subtle hover:border-eco-dark/40 transition-all text-center group"
              >
                <div className="w-7 h-7 rounded-lg bg-eco-dark/10 text-eco-dark flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-eco-text">Teacher</span>
                <span className="text-[10px] text-eco-muted font-medium">Priya</span>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('admin')}
                className="flex flex-col items-center justify-center p-2 rounded-xl border border-eco-border/90 bg-eco-bg/50 hover:bg-eco-subtle hover:border-eco-sky/40 transition-all text-center group"
              >
                <div className="w-7 h-7 rounded-lg bg-eco-sky/10 text-eco-sky flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Building className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-eco-text">Admin</span>
                <span className="text-[10px] text-eco-muted font-medium">Principal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-eco-muted font-medium">
          <p>Greenfield International School • EcoQuest K-12 Security</p>
        </div>
      </div>
    </div>
  );
};
