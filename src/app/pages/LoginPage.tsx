import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LogIn, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, isSessionExpired } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Show message if session expired
  useEffect(() => {
    if (isSessionExpired) {
      setError('Your session has expired. Please log in again.');
    }
  }, [isSessionExpired]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Please enter your password');
      return false;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password, rememberMe);

      if (result.success && user) {
        // Redirect based on user's role
        if (user.role === 'Admin') {
          navigate('/admin-dashboard', { replace: true });
        } else if (user.role === 'Financial Advisor') {
          navigate('/advisor-dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    const demoPassword = demoEmail === 'admin@fundinsight.com' ? 'admin123' : 
                        demoEmail === 'advisor@fundinsight.com' ? 'advisor123' : 'user123';
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    
    try {
      const result = await login(demoEmail, demoPassword, false);
      if (result.success) {
        // User will redirect due to useEffect
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001f3f] to-[#0a0e27] px-4 py-12">
      <div className="w-full space-y-6">
        {/* Logo/Header */}
        <div className="text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">FundInsight Pro</h1>
          <p className="mt-2 text-white/80">Secure Investment Platform</p>
        </div>

        {/* Login Card */}
        <Card className="mx-auto w-full max-w-md border-0 bg-[#141829] p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-white/70">
              Sign in to access your personalized fund insights and investment portfolio
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Session Expired Alert */}
            {error && isSessionExpired && (
              <div className="flex gap-3 rounded-lg border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 p-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-[var(--color-warning)]" />
                <p className="text-sm text-[var(--color-warning)]">{error}</p>
              </div>
            )}

            {/* Error Message */}
            {error && !isSessionExpired && (
              <div className="flex gap-3 rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-[var(--color-danger)]" />
                <p className="text-sm text-[var(--color-danger)]">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-[var(--color-text-primary)]">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[var(--color-text-secondary)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] pl-10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-[var(--color-text-primary)]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-[var(--color-text-secondary)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} disabled={loading} />
              <span className="text-sm text-[var(--color-text-secondary)]">Keep me signed in</span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 bg-[var(--color-accent)] py-5 text-base font-semibold text-white hover:opacity-95 disabled:opacity-50"
            >
              <LogIn className="h-5 w-5" />
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 space-y-3 border-t border-[var(--color-border-subtle)] pt-6">
            <p className="text-center text-xs font-semibold uppercase text-[var(--color-text-secondary)]">
              Demo Accounts
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('user@fundinsight.com')}
                disabled={loading}
                className="w-full rounded-lg border border-[var(--color-border-subtle)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 disabled:opacity-50"
              >
                Sign in as User
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@fundinsight.com')}
                disabled={loading}
                className="w-full rounded-lg border border-[var(--color-border-subtle)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 disabled:opacity-50"
              >
                Sign in as Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('advisor@fundinsight.com')}
                disabled={loading}
                className="w-full rounded-lg border border-[var(--color-border-subtle)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 disabled:opacity-50"
              >
                Sign in as Advisor
              </button>
            </div>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} FundInsight Pro. Secure investment platform.</p>
          <p className="mt-1 text-xs text-white/50">
            Disclaimer: Past performance does not guarantee future results. Please consult a financial advisor.
          </p>
        </div>
      </div>
    </div>
  );
}
