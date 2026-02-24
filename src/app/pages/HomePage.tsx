import React from 'react';
import { Link } from 'react-router';
import { HeroSection } from '../components/HeroSection';
import { SearchBar } from '../components/SearchBar';
import { ArrowRight, BarChart3, BookOpen, Sparkles, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function HomePage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Compare funds',
      description: 'Sort and filter by returns, risk, and category. Select funds to view side-by-side charts and metrics.',
      link: '/dashboard',
    },
    {
      icon: Sparkles,
      title: 'Personalised suggestions',
      description: 'Recommendations based on your risk tolerance, goal, and horizon—with clear reasoning for each suggestion.',
      link: '/recommendations',
    },
    {
      icon: BookOpen,
      title: 'Education & insights',
      description: 'Articles and AI-generated insights to help you understand strategies and make informed decisions.',
      link: '/education',
    },
    {
      icon: Shield,
      title: 'Admin & analytics',
      description: 'Platform analytics and role-based access for advisors and administrators.',
      link: '/admin',
    },
  ];

  const principles = [
    {
      title: 'Transparent AI',
      description: 'Insights are labelled with confidence and explained in plain language.',
      icon: '🔍',
    },
    {
      title: 'You stay in control',
      description: 'Override suggestions, customise views, and manage your data.',
      icon: '🎛️',
    },
    {
      title: 'Clear expectations',
      description: 'Tours and tooltips explain what each feature does before you use it.',
      icon: '💡',
    },
    {
      title: 'Easy to correct',
      description: 'Undo and step back when needed; complexity is revealed gradually.',
      icon: '↩️',
    },
    {
      title: 'Accessible',
      description: 'Keyboard navigation, ARIA labels, and contrast options for everyone.',
      icon: '♿',
    },
    {
      title: 'Feedback improves results',
      description: 'Your ratings help refine future recommendations.',
      icon: '🔄',
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="bg-[var(--color-bg)] py-[var(--space-section)]">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
              Find a fund
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Search by name or category across 1,000+ mutual funds.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-[var(--space-section)] dark:border-white/10 dark:bg-white/[0.02]">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
              What you can do
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Tools designed for clarity and control.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title}>
                <Link to={feature.link} className="block h-full">
                  <Card className="h-full border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/30 dark:border-white/10 dark:bg-white/5 dark:hover:border-[var(--color-accent)]/40">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] dark:bg-white/10">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {feature.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] py-[var(--space-section)] dark:border-white/10">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">
              How we design for trust
            </h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Principles that guide our product and AI use.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <Card key={p.title} className="h-full border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5 dark:border-white/10 dark:bg-white/5">
                <span className="text-2xl" aria-hidden>{p.icon}</span>
                <h3 className="mt-3 font-semibold text-[var(--color-text-primary)]">{p.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">{p.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-subtle)] bg-[var(--color-primary)] py-[var(--space-section)] dark:border-white/10">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 text-center">
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Start with a plan that fits you
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Get fund suggestions based on your risk tolerance and goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/recommendations">
                <Button size="lg" className="bg-[var(--color-accent)] text-white hover:opacity-95">
                  Get personalised recommendations
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10">
                  Explore dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
