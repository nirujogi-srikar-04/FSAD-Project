import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LogIn, Lock, Mail, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useApp();
  const [email, setEmail] = useState('admin@fundinsight.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (user?.role === 'Admin') {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError('Please enter your email address');
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
      const result = await login(email, password, false);

      if (result.success && user?.role === 'Admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (result.success && user?.role !== 'Admin') {
        setError('This account does not have administrator access. Please use your admin account.');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-900 px-4 py-12">
      <div className="w-full space-y-6">
        {/* Admin Logo/Header */}
        <div className="text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">FundInsight Pro</h1>
          <p className="mt-2 text-red-100">Administrator Access</p>
        </div>

        {/* Admin Login Card */}
        <Card className="mx-auto w-full max-w-md border-0 bg-white p-8 shadow-2xl">
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3">
              <Shield className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-600">Restricted Access</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Admin Login</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              This area is restricted to authorized administrators. Unauthorized access attempts are logged.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="flex gap-3 rounded-lg border border-red-300 bg-red-50 p-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-sm font-semibold text-[var(--color-text-primary)]">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[var(--color-text-secondary)]" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@fundinsight.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] pl-10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-sm font-semibold text-[var(--color-text-primary)]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-[var(--color-text-secondary)]" />
                <Input
                  id="admin-password"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 bg-red-600 py-5 text-base font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              <LogIn className="h-5 w-5" />
              {loading ? 'Verifying...' : 'Sign In as Admin'}
            </Button>

            {/* Back to User Login */}
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/login')}
              disabled={loading}
              className="w-full"
            >
              Sign in as Regular User
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 space-y-3 border-t border-[var(--color-border-subtle)] pt-6">
            <p className="text-center text-xs font-semibold uppercase text-[var(--color-text-secondary)]">
              Demo Admin Account
            </p>
            <div className="space-y-1 rounded-lg bg-gray-50 p-3 text-xs text-[var(--color-text-secondary)]">
              <p className="font-mono font-semibold">Email:</p>
              <p className="font-mono">admin@fundinsight.com</p>
              <p className="mt-2 font-mono font-semibold">Password:</p>
              <p className="font-mono">admin123</p>
            </div>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} FundInsight Pro. Secure investment platform.</p>
          <p className="mt-1 text-xs text-white/50">
            Unauthorized access attempts are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
}
