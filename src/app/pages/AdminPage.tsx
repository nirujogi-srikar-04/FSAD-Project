import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminPanel } from '../components/AdminPanel';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Settings, LogOut, Users, Lock, Shield, AlertTriangle } from 'lucide-react';

export function AdminPage() {
  const { user, logout, userRole } = useApp();
  const navigate = useNavigate();
  const [showSecurityAlert, setShowSecurityAlert] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleGoToSettings = () => {
    navigate('/admin-settings');
  };

  // Only allow Admin role to view this page
  if (userRole !== 'Admin') {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 text-center dark:border-white/10 dark:bg-white/5 max-w-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Access Denied</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            You do not have permission to access the admin dashboard. Only administrators can view this page.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="mt-6 gap-2">
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Admin Header Banner */}
      <div className="border-b border-[var(--color-border-subtle)] bg-gradient-to-r from-red-900 via-red-800 to-red-900">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl text-white">
                🛡️
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Shield className="h-8 w-8" />
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-red-100">
                  Authorized access only • {user?.name} • {new Date().toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleGoToSettings}
                variant="outline"
                size="sm"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Settings className="h-4 w-4" />
                Admin Settings
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          {/* Security Alert */}
          {showSecurityAlert && (
            <div className="mb-6">
              <Alert className="border-red-300/50 bg-red-50">
                <Lock className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-900">
                  <strong>Security Notice:</strong> This is a restricted area. All activities are logged and monitored for security purposes.
                  <button
                    onClick={() => setShowSecurityAlert(false)}
                    className="ml-2 text-xs text-red-700 hover:text-red-900 font-semibold"
                  >
                    Dismiss
                  </button>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Admin Info Card */}
          <div className="mb-8">
            <Card className="border-[var(--color-border-subtle)] bg-gradient-to-r from-red-50 to-red-100/50 p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Administrator Account
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {user?.email}
                  </p>
                </div>
                <Badge className="w-fit bg-red-600/20 text-red-700 border-red-300/50">
                  🔐 Full Access
                </Badge>
              </div>
            </Card>
          </div>

          {/* Admin Panel - Main Content */}
          <AdminPanel />

          {/* Admin Controls Section */}
          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Administration Controls
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* User Management */}
              <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">User Management</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Manage user accounts, roles, and permissions
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => navigate('/admin-users')}
                >
                  Manage Users
                </Button>
              </Card>

              {/* Fund Management */}
              <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">Fund Management</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Add, update, or remove mutual funds
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => navigate('/admin-funds')}
                >
                  Manage Funds
                </Button>
              </Card>

              {/* System Settings */}
              <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">
                  System Settings
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Configure platform settings and policies
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={handleGoToSettings}
                >
                  System Settings
                </Button>
              </Card>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="mt-8 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-4 text-xs text-[var(--color-text-secondary)] dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold">
              ⚠️ Note: All administrative actions are logged and auditable. Improper use of admin privileges may result in account suspension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
