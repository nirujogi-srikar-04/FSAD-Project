import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ArrowLeft, Save, Lock, AlertTriangle, Shield, Users, Clock, Database } from 'lucide-react';

export function AdminSettingsPage() {
  const { user, logout, userRole } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'system' | 'security' | 'users' | 'notifications'>('system');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // System Settings State
  const [platformName, setPlatformName] = useState('FundInsight Pro');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');

  // Security Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState('90');
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [auditLogging, setAuditLogging] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleSaveSettings = () => {
    setSuccess('Settings saved successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Only allow Admin role
  if (userRole !== 'Admin') {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 text-center dark:border-white/10 dark:bg-white/5 max-w-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Access Denied</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Only administrators can access this section.
          </p>
          <Button onClick={() => navigate('/')} className="mt-6">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-subtle)] bg-gradient-to-r from-red-900 via-red-800 to-red-900">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin-dashboard')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-white">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Admin Settings
              </h1>
              <p className="mt-1 text-red-100">Configure platform settings and security policies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Alerts */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-300/30 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 rounded-lg border border-green-300/30 bg-green-50 p-4 text-sm text-green-800">
              {success}
            </div>
          )}

          {/* Admin Info */}
          <Card className="mb-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">Logged in as</p>
                <p className="font-semibold text-[var(--color-text-primary)]">{user?.email}</p>
              </div>
              <Badge className="bg-green-500/20 text-green-700">Administrator</Badge>
            </div>
          </Card>

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-2 overflow-x-auto rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-0 dark:border-white/10 dark:bg-white/5">
            {[
              { id: 'system', label: 'System', icon: '⚙️' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'users', label: 'Users', icon: '👥' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* System Settings */}
          {activeTab === 'system' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">System Settings</h2>

              <div className="space-y-6">
                {/* Platform Name */}
                <div className="space-y-2">
                  <Label htmlFor="platform-name" className="font-semibold text-[var(--color-text-primary)]">
                    Platform Name
                  </Label>
                  <Input
                    id="platform-name"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                  />
                </div>

                {/* Maintenance Mode */}
                <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4 dark:border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">Maintenance Mode</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        When enabled, only admins can access the platform
                      </p>
                    </div>
                    <Checkbox
                      checked={maintenanceMode}
                      onCheckedChange={(checked) => setMaintenanceMode(checked as boolean)}
                    />
                  </div>
                </div>

                {/* Session Timeout */}
                <div className="space-y-2">
                  <Label htmlFor="session-timeout" className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                    <Clock className="h-4 w-4" />
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                  />
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Users will be automatically logged out after this period of inactivity
                  </p>
                </div>

                {/* Max Login Attempts */}
                <div className="space-y-2">
                  <Label htmlFor="max-login" className="font-semibold text-[var(--color-text-primary)]">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="max-login"
                    type="number"
                    value={maxLoginAttempts}
                    onChange={(e) => setMaxLoginAttempts(e.target.value)}
                    className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                  />
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Account will be locked after reaching this number of failed attempts
                  </p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveSettings} className="gap-2 bg-[var(--color-accent)] text-white">
                    <Save className="h-4 w-4" />
                    Save System Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">Security Settings</h2>

              <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4 dark:border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">
                        Two-Factor Authentication (2FA)
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Checkbox
                      checked={twoFactorEnabled}
                      onCheckedChange={(checked) => setTwoFactorEnabled(checked as boolean)}
                    />
                  </div>
                </div>

                {/* Password Expiry */}
                <div className="space-y-2">
                  <Label htmlFor="password-expiry" className="font-semibold text-[var(--color-text-primary)]">
                    Password Expiration (days)
                  </Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={passwordExpiry}
                    onChange={(e) => setPasswordExpiry(e.target.value)}
                    className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                  />
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Users must change their password after this period
                  </p>
                </div>

                {/* IP Whitelist */}
                <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4 dark:border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">IP Whitelist</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Restrict admin access to specific IP addresses
                      </p>
                    </div>
                    <Checkbox
                      checked={ipWhitelist}
                      onCheckedChange={(checked) => setIpWhitelist(checked as boolean)}
                    />
                  </div>
                </div>

                {/* Audit Logging */}
                <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4 dark:border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">Audit Logging</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Log all admin actions for security and compliance
                      </p>
                    </div>
                    <Checkbox checked={auditLogging} disabled />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveSettings} className="gap-2 bg-[var(--color-accent)] text-white">
                    <Lock className="h-4 w-4" />
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">User Management</h2>

              <Alert className="mb-6 border-blue-300/50 bg-blue-50">
                <Users className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Use this section to manage user accounts, roles, and permissions across the platform.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Button className="h-12 gap-2">
                    <Users className="h-4 w-4" />
                    View All Users
                  </Button>
                  <Button variant="outline" className="h-12 gap-2">
                    <Users className="h-4 w-4" />
                    Create New User
                  </Button>
                  <Button variant="outline" className="h-12 gap-2">
                    Reset User Password
                  </Button>
                  <Button variant="outline" className="h-12 gap-2">
                    Manage Roles
                  </Button>
                </div>
              </div>

              {/* User Statistics */}
              <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
                <h3 className="mb-4 font-semibold text-[var(--color-text-primary)]">User Statistics</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-[var(--color-bg)] p-4">
                    <p className="text-sm text-[var(--color-text-secondary)]">Total Users</p>
                    <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">2,547</p>
                  </div>
                  <div className="rounded-lg bg-[var(--color-bg)] p-4">
                    <p className="text-sm text-[var(--color-text-secondary)]">Active This Month</p>
                    <p className="mt-2 text-2xl font-bold text-green-600">1,823</p>
                  </div>
                  <div className="rounded-lg bg-[var(--color-bg)] p-4">
                    <p className="text-sm text-[var(--color-text-secondary)]">Admins</p>
                    <p className="mt-2 text-2xl font-bold text-[var(--color-accent)]">5</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">Notification Settings</h2>

              <div className="space-y-4">
                {[
                  {
                    label: 'System Alerts',
                    description: 'Receive alerts for system errors and issues',
                  },
                  {
                    label: 'Failed Login Attempts',
                    description: 'Notify on suspicious login attempts',
                  },
                  {
                    label: 'User Registration',
                    description: 'Get notified when new users register',
                  },
                  {
                    label: 'Admin Actions',
                    description: 'Log and notify all administrative actions',
                  },
                ].map((notif) => (
                  <div key={notif.label} className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4 dark:border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[var(--color-text-primary)]">{notif.label}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">{notif.description}</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveSettings} className="gap-2 bg-[var(--color-accent)] text-white">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
