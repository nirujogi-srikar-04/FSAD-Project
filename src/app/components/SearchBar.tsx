import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, X } from 'lucide-react';
import { mutualFunds } from '../data/mockData';
import { Badge } from './ui/badge';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredFunds = mutualFunds
    .filter((fund) => {
      const matchesQuery =
        fund.name.toLowerCase().includes(query.toLowerCase()) ||
        fund.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || fund.category === selectedCategory;
      return matchesQuery && matchesCategory && query.length > 0;
    })
    .slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl" ref={inputRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by fund name or category…"
          className="w-full rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-3.5 pl-11 pr-11 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 dark:border-white/20 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50 dark:focus:border-[var(--color-accent)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1.5 text-[var(--color-text-muted)] hover:bg-black/5 hover:text-[var(--color-text-primary)] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {['All', 'Equity', 'Debt', 'Hybrid'].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-border-subtle)]/50 text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isOpen && query && filteredFunds.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[20rem] overflow-auto rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-lg dark:border-white/15 dark:bg-[var(--color-primary)]">
            <p className="border-b border-[var(--color-border-subtle)] px-3 py-2 text-xs text-[var(--color-text-muted)] dark:border-white/10 dark:text-white/50">
              {filteredFunds.length} result{filteredFunds.length !== 1 ? 's' : ''}
            </p>
            <ul className="p-2">
              {filteredFunds.map((fund) => (
                <li key={fund.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery(fund.name);
                      setIsOpen(false);
                    }}
                    className="flex w-full items-start justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-border-subtle)]/50 dark:hover:bg-white/10"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[var(--color-text-primary)] dark:text-white">
                        {fund.name}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="text-xs font-normal">
                          {fund.category}
                        </Badge>
                        <span
                          className={`text-xs ${
                            fund.riskLevel === 'Low'
                              ? 'text-[var(--color-success)]'
                              : fund.riskLevel === 'Medium'
                                ? 'text-[var(--color-warning)]'
                                : 'text-[var(--color-danger)]'
                          }`}
                        >
                          {fund.riskLevel}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-[var(--color-success)]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">{fund.returns3Y}%</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isOpen && query && filteredFunds.length === 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 text-center shadow-lg dark:border-white/15 dark:bg-[var(--color-primary)]">
            <p className="text-[var(--color-text-secondary)] dark:text-white/70">
              No funds found for “{query}”
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)] dark:text-white/50">
              Try a different term or category.
            </p>
          </div>
        )}
    </div>
  );
}
