import React, { useState, useMemo } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { mutualFunds, type MutualFund } from '../data/mockData';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

type SortField = keyof MutualFund;
type SortOrder = 'asc' | 'desc';

export function FundComparison() {
  const { selectedFunds, toggleFundSelection, clearSelectedFunds } = useApp();
  const [sortField, setSortField] = useState<SortField>('returns1Y');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  const sortedFunds = useMemo(() => {
    let filtered = [...mutualFunds];
    
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(fund => fund.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [sortField, sortOrder, categoryFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const selectedFundsData = mutualFunds.filter(fund => selectedFunds.includes(fund.id));

  const comparisonData = {
    returns: selectedFundsData.map(fund => ({
      name: fund.name.substring(0, 20),
      '1Y': fund.returns1Y,
      '3Y': fund.returns3Y,
      '5Y': fund.returns5Y,
    })),
    risk: selectedFundsData.map(fund => ({
      name: fund.name.substring(0, 20),
      risk: fund.riskLevel === 'Low' ? 1 : fund.riskLevel === 'Medium' ? 2 : fund.riskLevel === 'High' ? 3 : 4,
      returns: fund.returns3Y,
    })),
    expense: selectedFundsData.map(fund => ({
      name: fund.name.substring(0, 20),
      'Expense Ratio': fund.expenseRatio,
      AUM: fund.aum / 1000,
    }))
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-[var(--color-success)]';
      case 'Medium': return 'bg-[var(--color-warning)]';
      case 'High': return 'bg-orange-500';
      case 'Very High': return 'bg-[var(--color-danger)]';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Fund comparison</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Select funds to compare performance and key metrics.
          </p>
        </div>
        {selectedFunds.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={() => setComparisonModalOpen(true)} className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Compare {selectedFunds.length} fund{selectedFunds.length !== 1 ? 's' : ''}
            </Button>
            <Button variant="outline" onClick={clearSelectedFunds}>
              Clear
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'Equity', 'Debt', 'Hybrid'].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setCategoryFilter(category)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              categoryFilter === category
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/15 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] dark:border-white/10 dark:bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]/30 dark:border-white/10 dark:bg-white/5">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedFunds.length === sortedFunds.length && sortedFunds.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        sortedFunds.forEach(fund => {
                          if (!selectedFunds.includes(fund.id)) {
                            toggleFundSelection(fund.id);
                          }
                        });
                      } else {
                        clearSelectedFunds();
                      }
                    }}
                  />
                </th>
                <SortHeader field="name" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  Fund Name
                </SortHeader>
                <SortHeader field="category" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  Category
                </SortHeader>
                <SortHeader field="returns1Y" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  1Y Returns
                </SortHeader>
                <SortHeader field="returns3Y" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  3Y Returns
                </SortHeader>
                <SortHeader field="returns5Y" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  5Y Returns
                </SortHeader>
                <SortHeader field="riskLevel" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  Risk
                </SortHeader>
                <SortHeader field="rating" currentField={sortField} order={sortOrder} onSort={handleSort}>
                  Rating
                </SortHeader>
              </tr>
            </thead>
            <tbody>
                {sortedFunds.map((fund) => (
                  <tr
                    key={fund.id}
                    className="border-b border-[var(--color-border-subtle)]/50 transition-colors hover:bg-white/[0.04] dark:border-white/5"
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedFunds.includes(fund.id)}
                        onCheckedChange={() => toggleFundSelection(fund.id)}
                      />
                    </td>
                    <td className="p-4 font-medium">{fund.name}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-white/20">
                        {fund.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {fund.returns1Y > 10 ? (
                          <TrendingUp className="h-4 w-4 text-[var(--color-success)]" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-[var(--color-danger)]" />
                        )}
                        <span className={fund.returns1Y > 10 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}>
                          {fund.returns1Y}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[var(--color-success)]">{fund.returns3Y}%</span>
                    </td>
                    <td className="p-4">
                      <span className="text-[var(--color-success)]">{fund.returns5Y}%</span>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getRiskColor(fund.riskLevel)} border-0 text-white`}>
                        {fund.riskLevel}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < fund.rating ? 'text-[var(--color-warning)]' : 'text-white/20'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison Modal */}
      <Dialog open={comparisonModalOpen} onOpenChange={setComparisonModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] border-[var(--color-border-subtle)] dark:bg-[var(--color-primary)] dark:border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Fund comparison</DialogTitle>
            <DialogDescription>
              {selectedFunds.length} fund{selectedFunds.length !== 1 ? 's' : ''} compared across returns, risk, and cost.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            <div>
              <h3 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Returns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData.returns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="1Y" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="3Y" fill="#10B981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="5Y" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Risk vs 3Y returns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={comparisonData.risk}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis yAxisId="left" stroke="#fff" />
                  <YAxis yAxisId="right" orientation="right" stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={2} name="Risk Level" />
                  <Line yAxisId="right" type="monotone" dataKey="returns" stroke="#10B981" strokeWidth={2} name="3Y Returns %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">Expense ratio & AUM</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData.expense}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Expense Ratio" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="AUM" fill="#3B82F6" radius={[8, 8, 0, 0]} name="AUM (₹1000 Cr)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SortHeader({ 
  field, 
  currentField, 
  order, 
  onSort, 
  children 
}: { 
  field: SortField; 
  currentField: SortField; 
  order: SortOrder; 
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}) {
  return (
    <th
      className="cursor-pointer p-4 text-left text-sm font-medium text-[var(--color-text-secondary)] hover:bg-white/5 dark:text-white/70"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown 
          className={`h-4 w-4 transition-opacity ${
            currentField === field ? 'opacity-100' : 'opacity-30'
          }`}
        />
      </div>
    </th>
  );
}
