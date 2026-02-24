import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Save, Lock, LogOut, Mail, Phone, User, Calendar } from 'lucide-react';

export function UserProfilePage() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(user?.phone || '+91 XXXXX XXXXX');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'logout'>('profile');

  const handleSaveProfile = () => {
    setSuccess('Profile updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleChangePassword = () => {
    if (!password) {
      setError('Please enter a new password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setSuccess('Password changed successfully');
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-[var(--color-text-primary)]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Account Settings</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">Manage your profile and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Alert Messages */}
          {error && (
            <div className="mb-6 rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-4 text-sm text-[var(--color-danger)]">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 rounded-lg border border-green-300/30 bg-green-500/10 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10'
              }`}
            >
              <User className="mr-2 inline h-4 w-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10'
              }`}
            >
              <Lock className="mr-2 inline h-4 w-4" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('logout')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'logout'
                  ? 'bg-red-600 text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-red-100'
              }`}
            >
              <LogOut className="mr-2 inline h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="space-y-6">
                {/* User Avatar & Name */}
                <div className="border-b border-[var(--color-border-subtle)] pb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-accent)]/20 text-4xl">
                      {user?.avatar || '👤'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{user?.name}</h2>
                      <Badge className="mt-2">{user?.role}</Badge>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Member Since */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Calendar className="h-4 w-4" />
                      Member Since
                    </Label>
                    <Input
                      type="text"
                      value={user?.createdAt || new Date().toLocaleDateString()}
                      disabled
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                  <Button
                    onClick={handleSaveProfile}
                    className="gap-2 bg-[var(--color-accent)] text-white hover:opacity-95"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="space-y-6">
                <div className="border-b border-[var(--color-border-subtle)] pb-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
                    <Lock className="h-5 w-5" />
                    Change Password
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="font-semibold text-[var(--color-text-primary)]">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-semibold text-[var(--color-text-primary)]">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="rounded-lg bg-[var(--color-accent)]/10 p-4 text-sm text-[var(--color-text-secondary)]">
                    <p className="font-semibold text-[var(--color-accent)]">Password requirements:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>At least 6 characters long</li>
                      <li>Mix of uppercase and lowercase letters (recommended)</li>
                      <li>Include numbers and special characters (recommended)</li>
                    </ul>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                  <Button
                    onClick={handleChangePassword}
                    className="gap-2 bg-[var(--color-accent)] text-white hover:opacity-95"
                  >
                    <Lock className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Logout Tab */}
          {activeTab === 'logout' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="space-y-6">
                <div className="rounded-lg border border-red-300/30 bg-red-50 p-6">
                  <h3 className="mb-2 text-lg font-bold text-red-900">Logout Session</h3>
                  <p className="text-red-800">
                    You are about to logout from your account. You will be required to enter your credentials again to access your account.
                  </p>
                </div>

                <div className="space-y-4 border-t border-[var(--color-border-subtle)] pt-6">
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Session Information:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-[var(--color-text-secondary)]">
                      <li>
                        <strong>Account:</strong> {user?.email}
                      </li>
                      <li>
                        <strong>Role:</strong> {user?.role}
                      </li>
                      <li>
                        <strong>Status:</strong> <span className="text-green-600">Active</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('profile')}
                    className="text-[var(--color-text-primary)]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="gap-2 bg-red-600 text-white hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout Now
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
