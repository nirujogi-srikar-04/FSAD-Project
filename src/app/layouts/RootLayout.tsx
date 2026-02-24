import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { useApp } from '../contexts/AppContext';

export function RootLayout() {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="mt-auto border-t border-white/10 bg-[var(--color-primary)] py-8">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} FundInsight Pro. Mutual fund research and comparison platform.
            </p>
            <p className="max-w-md text-xs text-white/50">
              Disclaimer: Past performance does not guarantee future results. Investments are subject to market risk. Please read offer documents and consult a financial advisor before investing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
