import React from 'react';
import { Users, TrendingUp, DollarSign, Activity, Download, FileText } from 'lucide-react';
import { userAnalytics, categoryPerformance, platformStats } from '../data/mockData';
import { useApp } from '../contexts/AppContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

export function AdminPanel() {
  const { userRole } = useApp();

  const generateReport = (format: 'PDF' | 'CSV') => {
    // Mock report generation
    const data = userAnalytics;
    const csv = [
      ['Month', 'Users', 'Investments (Cr)', 'Returns (%)'],
      ...data.map(d => [d.month, d.users, d.investments, d.returns])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fund-analytics-report.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="mt-2 text-muted-foreground">
            Platform analytics and user insights for {userRole}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => generateReport('CSV')} className="gap-2">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
          <Button onClick={() => generateReport('PDF')} variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>

      <div>
        <Badge className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-white">
          Current Role: {userRole}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Users,
            label: 'Active Users',
            value: platformStats.activeUsers.toLocaleString(),
            change: '+12.5%',
            positive: true,
          },
          {
            icon: DollarSign,
            label: 'Total AUM',
            value: `₹${platformStats.totalAUM}Cr`,
            change: '+8.3%',
            positive: true,
          },
          {
            icon: TrendingUp,
            label: 'Avg Returns',
            value: `${platformStats.avgReturn}%`,
            change: '+2.1%',
            positive: true,
          },
          {
            icon: Activity,
            label: 'Funds Listed',
            value: platformStats.fundsListed.toLocaleString(),
            change: '+45',
            positive: true,
          },
        ].map((stat) => (
          <div key={stat.label}>
            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-[var(--color-accent)]" />
                <Badge
                  variant="outline"
                  className={stat.positive ? 'border-[var(--color-success)] text-[var(--color-success)]' : 'border-[var(--color-danger)] text-[var(--color-danger)]'}
                >
                  {stat.change}
                </Badge>
              </div>
              <h3 className="mt-4 text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-white/60">{stat.label}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold">User Growth & Investments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#fff" />
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
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  name="Active Users"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="investments"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 4 }}
                  name="Investments (Cr)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Returns Chart */}
        <div>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold">Average Monthly Returns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="returns"
                  fill="#10B981"
                  radius={[8, 8, 0, 0]}
                  name="Returns (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Category Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <div>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold">Fund Distribution by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, count }) => `${category}: ${count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Performance Comparison */}
        <div>
          <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold">Category Performance Score</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#fff" />
                <YAxis dataKey="category" type="category" stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="performance"
                  fill="#F59E0B"
                  radius={[0, 8, 8, 0]}
                  name="Performance Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Role-Specific Insights */}
      <div>
        <Card className="border-white/10 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-secondary)]/10 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-xl font-semibold">Role-Specific Insights</h3>
          <div className="space-y-3">
            {userRole === 'Admin' && (
              <>
                <InsightItem
                  icon={Users}
                  text="24% increase in user registrations this month"
                  positive
                />
                <InsightItem
                  icon={Activity}
                  text="System uptime: 99.8% - All services operational"
                  positive
                />
                <InsightItem
                  icon={TrendingUp}
                  text="Top performing category: Equity (68% avg performance)"
                  positive
                />
              </>
            )}
            {userRole === 'Financial Advisor' && (
              <>
                <InsightItem
                  icon={Users}
                  text="42 clients require portfolio rebalancing this week"
                  neutral
                />
                <InsightItem
                  icon={TrendingUp}
                  text="High-risk equity funds showing strong momentum"
                  positive
                />
                <InsightItem
                  icon={DollarSign}
                  text="₹12.5Cr in client investments this quarter"
                  positive
                />
              </>
            )}
            {userRole === 'Data Analyst' && (
              <>
                <InsightItem
                  icon={Activity}
                  text="New trend detected: Growing interest in ESG funds"
                  neutral
                />
                <InsightItem
                  icon={TrendingUp}
                  text="Debt fund returns stabilizing after recent volatility"
                  positive
                />
                <InsightItem
                  icon={Users}
                  text="User behavior analysis: 65% prefer SIP over lump sum"
                  neutral
                />
              </>
            )}
            {userRole === 'User' && (
              <>
                <InsightItem
                  icon={TrendingUp}
                  text="Market outlook: Equity funds showing bullish trend"
                  positive
                />
                <InsightItem
                  icon={Activity}
                  text="5 new high-rated funds added this week"
                  neutral
                />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function InsightItem({
  icon: Icon,
  text,
  positive,
  neutral,
}: {
  icon: any;
  text: string;
  positive?: boolean;
  neutral?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      <div
        className={`rounded-lg p-2 ${
          positive
            ? 'bg-[var(--color-success)]/20'
            : neutral
            ? 'bg-[var(--color-accent)]/20'
            : 'bg-[var(--color-warning)]/20'
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            positive
              ? 'text-[var(--color-success)]'
              : neutral
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-warning)]'
          }`}
        />
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
}
