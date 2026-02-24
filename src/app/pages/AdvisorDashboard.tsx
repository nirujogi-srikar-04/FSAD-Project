import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, TrendingUp, BarChart3, Settings, LogOut } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router';

export function AdvisorDashboard() {
  const { logout, userRole } = useApp();
  const navigate = useNavigate();
  const clientCount = 24;
  const portfolioValue = 45230000;
  const avgReturn = 12.5;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] dark:border-white/10">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                Advisor Dashboard
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Manage your clients and portfolios
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-[var(--color-accent)]/50 text-[var(--color-accent)]">
                {userRole}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">
                    Active Clients
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">
                    {clientCount}
                  </p>
                </div>
                <div className="rounded-lg bg-[var(--color-accent)]/10 p-3 text-[var(--color-accent)]">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">
                    Total AUM
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">
                    ₹{(portfolioValue / 10000000).toFixed(1)}Cr
                  </p>
                </div>
                <div className="rounded-lg bg-[var(--color-success)]/10 p-3 text-[var(--color-success)]">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">
                    Avg. Client Return
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">
                    {avgReturn}%
                  </p>
                </div>
                <div className="rounded-lg bg-[var(--color-warning)]/10 p-3 text-[var(--color-warning)]">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">
                    Settings
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Manage your profile
                  </p>
                </div>
                <div className="rounded-lg bg-[var(--color-accent)]/10 p-3 text-[var(--color-accent)]">
                  <Settings className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">
              Client Portfolio Summary
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Advisor tools for portfolio management, client analytics, and performance tracking coming soon.
            </p>
            <div className="mt-6 pt-6 border-t border-[var(--color-border-subtle)] dark:border-white/10">
              <h3 className="mb-4 font-semibold text-[var(--color-text-primary)]">
                Feature Requests
              </h3>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Client portfolio dashboard with real-time updates
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Performance analytics and risk assessment
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Recommendation engine for advisory insights
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Client communication and reporting tools
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
