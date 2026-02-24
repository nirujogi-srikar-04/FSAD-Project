import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';
import { platformStats } from '../data/mockData';
import { Link } from 'react-router';
import { Button } from './ui/button';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toFixed(decimals)}</span>;
}

function StatCard({ icon, label, value, suffix = '', prefix = '', decimals = 0 }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
        {icon}
      </div>
      <p className="text-2xl font-semibold tracking-tight text-white">
        {prefix}
        <AnimatedCounter value={value} decimals={decimals} />
        {suffix}
      </p>
      <p className="mt-1 text-sm text-white/60">{label}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative bg-[var(--color-primary)] py-16 md:py-20">
      <div className="container mx-auto max-w-[var(--container-max)] px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[2.75rem]">
            Mutual fund research and comparison, simplified
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/75 md:text-xl">
            Compare funds, understand risk and returns, and get tailored suggestions—backed by clear data and transparent methodology.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<DollarSign className="h-5 w-5" />}
            label="Total AUM (₹ Cr)"
            value={platformStats.totalAUM}
            prefix="₹"
            suffix=" Cr"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Active users"
            value={platformStats.activeUsers}
            suffix="+"
          />
          <StatCard
            icon={<Award className="h-5 w-5" />}
            label="Funds listed"
            value={platformStats.fundsListed}
            suffix="+"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Avg. 3Y return"
            value={platformStats.avgReturn}
            suffix="%"
            decimals={1}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/recommendations">
            <Button size="lg" className="bg-[var(--color-accent)] font-medium text-white hover:opacity-95">
              Get recommendations
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10">
              Compare funds
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
