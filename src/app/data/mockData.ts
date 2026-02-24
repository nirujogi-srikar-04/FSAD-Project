export interface MutualFund {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid';
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  aum: number; // in crores
  expenseRatio: number;
  minInvestment: number;
  rating: number;
  nav: number;
  exitLoad: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  aiInsight: string;
  confidenceScore: number;
  readTime: string;
  imageUrl: string;
}

export interface UserProfile {
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  investmentGoal: string;
  timeHorizon: string;
  monthlyInvestment: number;
}

export const mutualFunds: MutualFund[] = [
  {
    id: 'MF001',
    name: 'HDFC Top 100 Fund',
    category: 'Equity',
    returns1Y: 18.5,
    returns3Y: 22.3,
    returns5Y: 19.8,
    riskLevel: 'High',
    aum: 25000,
    expenseRatio: 1.8,
    minInvestment: 5000,
    rating: 5,
    nav: 789.45,
    exitLoad: '1% if redeemed within 1 year'
  },
  {
    id: 'MF002',
    name: 'SBI Bluechip Fund',
    category: 'Equity',
    returns1Y: 16.2,
    returns3Y: 20.1,
    returns5Y: 18.5,
    riskLevel: 'High',
    aum: 32000,
    expenseRatio: 1.6,
    minInvestment: 5000,
    rating: 4,
    nav: 654.32,
    exitLoad: '1% if redeemed within 1 year'
  },
  {
    id: 'MF003',
    name: 'ICICI Prudential Balanced Advantage',
    category: 'Hybrid',
    returns1Y: 14.8,
    returns3Y: 16.5,
    returns5Y: 15.2,
    riskLevel: 'Medium',
    aum: 28000,
    expenseRatio: 1.9,
    minInvestment: 5000,
    rating: 5,
    nav: 456.78,
    exitLoad: 'Nil'
  },
  {
    id: 'MF004',
    name: 'Axis Midcap Fund',
    category: 'Equity',
    returns1Y: 25.4,
    returns3Y: 28.7,
    returns5Y: 24.3,
    riskLevel: 'Very High',
    aum: 18000,
    expenseRatio: 2.0,
    minInvestment: 5000,
    rating: 5,
    nav: 892.15,
    exitLoad: '1% if redeemed within 1 year'
  },
  {
    id: 'MF005',
    name: 'Kotak Corporate Bond Fund',
    category: 'Debt',
    returns1Y: 7.2,
    returns3Y: 7.8,
    returns5Y: 7.5,
    riskLevel: 'Low',
    aum: 15000,
    expenseRatio: 0.9,
    minInvestment: 5000,
    rating: 4,
    nav: 234.56,
    exitLoad: 'Nil'
  },
  {
    id: 'MF006',
    name: 'Mirae Asset Emerging Bluechip',
    category: 'Equity',
    returns1Y: 19.8,
    returns3Y: 24.5,
    returns5Y: 21.2,
    riskLevel: 'High',
    aum: 22000,
    expenseRatio: 1.7,
    minInvestment: 5000,
    rating: 5,
    nav: 1023.45,
    exitLoad: '1% if redeemed within 1 year'
  },
  {
    id: 'MF007',
    name: 'Franklin India Debt Hybrid',
    category: 'Hybrid',
    returns1Y: 11.5,
    returns3Y: 12.3,
    returns5Y: 11.8,
    riskLevel: 'Medium',
    aum: 12000,
    expenseRatio: 1.5,
    minInvestment: 5000,
    rating: 4,
    nav: 345.67,
    exitLoad: 'Nil'
  },
  {
    id: 'MF008',
    name: 'DSP Small Cap Fund',
    category: 'Equity',
    returns1Y: 28.9,
    returns3Y: 32.4,
    returns5Y: 27.6,
    riskLevel: 'Very High',
    aum: 9000,
    expenseRatio: 2.1,
    minInvestment: 5000,
    rating: 5,
    nav: 567.89,
    exitLoad: '1% if redeemed within 1 year'
  },
  {
    id: 'MF009',
    name: 'UTI Liquid Fund',
    category: 'Debt',
    returns1Y: 5.8,
    returns3Y: 6.1,
    returns5Y: 6.0,
    riskLevel: 'Low',
    aum: 45000,
    expenseRatio: 0.5,
    minInvestment: 1000,
    rating: 4,
    nav: 3456.78,
    exitLoad: 'Nil'
  },
  {
    id: 'MF010',
    name: 'Parag Parikh Flexi Cap',
    category: 'Equity',
    returns1Y: 21.3,
    returns3Y: 25.8,
    returns5Y: 22.9,
    riskLevel: 'High',
    aum: 35000,
    expenseRatio: 1.9,
    minInvestment: 5000,
    rating: 5,
    nav: 678.90,
    exitLoad: '2% if redeemed within 1 year'
  },
  {
    id: 'MF011',
    name: 'HDFC Corporate Bond Fund',
    category: 'Debt',
    returns1Y: 7.5,
    returns3Y: 8.0,
    returns5Y: 7.8,
    riskLevel: 'Low',
    aum: 18000,
    expenseRatio: 0.8,
    minInvestment: 5000,
    rating: 5,
    nav: 289.45,
    exitLoad: 'Nil'
  },
  {
    id: 'MF012',
    name: 'SBI Equity Hybrid Fund',
    category: 'Hybrid',
    returns1Y: 13.2,
    returns3Y: 15.6,
    returns5Y: 14.3,
    riskLevel: 'Medium',
    aum: 21000,
    expenseRatio: 1.7,
    minInvestment: 5000,
    rating: 4,
    nav: 412.34,
    exitLoad: 'Nil'
  }
];

export const educationalArticles: EducationalArticle[] = [
  {
    id: 'ART001',
    title: 'Understanding Risk in Mutual Fund Investments',
    category: 'Risk Management',
    content: 'Risk assessment is crucial for mutual fund selection. Different categories carry varying levels of volatility and potential returns.',
    aiInsight: 'Based on historical data analysis, diversifying across risk levels reduces portfolio volatility by approximately 35-40%. AI models suggest balancing high-risk equity funds with stable debt instruments.',
    confidenceScore: 0.92,
    readTime: '5 min',
    imageUrl: 'finance risk analysis'
  },
  {
    id: 'ART002',
    title: 'Equity vs Debt vs Hybrid: Choosing Your Path',
    category: 'Fund Categories',
    content: 'Understanding the fundamental differences between fund categories helps align investments with financial goals and risk appetite.',
    aiInsight: 'Machine learning analysis of 10,000+ investor profiles shows that hybrid funds are optimal for moderate risk tolerance with 3-5 year horizons. Equity funds outperform in 7+ year timeframes.',
    confidenceScore: 0.88,
    readTime: '7 min',
    imageUrl: 'investment portfolio balance'
  },
  {
    id: 'ART003',
    title: 'The Impact of Expense Ratios on Long-term Returns',
    category: 'Cost Analysis',
    content: 'Even small differences in expense ratios compound significantly over time, affecting your overall investment returns.',
    aiInsight: 'AI-powered simulations indicate that a 0.5% difference in expense ratio can reduce returns by 8-12% over a 20-year investment period. Prioritize funds with ratios below 1.5%.',
    confidenceScore: 0.95,
    readTime: '4 min',
    imageUrl: 'financial cost graph'
  },
  {
    id: 'ART004',
    title: 'AUM Size: Does Bigger Mean Better?',
    category: 'Fund Selection',
    content: 'Assets Under Management (AUM) indicates fund popularity and stability, but optimal size varies by fund category.',
    aiInsight: 'Data analysis reveals that mid-cap and small-cap funds with AUM between ₹5,000-15,000 crores often deliver better returns than larger funds, while large-cap funds benefit from higher AUM stability.',
    confidenceScore: 0.85,
    readTime: '6 min',
    imageUrl: 'business growth chart'
  },
  {
    id: 'ART005',
    title: 'SIP vs Lump Sum: Which Strategy Wins?',
    category: 'Investment Strategy',
    content: 'Systematic Investment Plans (SIP) and lump sum investments each have distinct advantages depending on market conditions and investor psychology.',
    aiInsight: 'Predictive models show SIPs reduce timing risk and average out market volatility, resulting in 15-20% better risk-adjusted returns for retail investors compared to lump sum in volatile markets.',
    confidenceScore: 0.90,
    readTime: '8 min',
    imageUrl: 'investment strategy planning'
  },
  {
    id: 'ART006',
    title: 'Tax Implications of Mutual Fund Investments',
    category: 'Tax Planning',
    content: 'Understanding tax treatment of different fund categories and holding periods is essential for maximizing post-tax returns.',
    aiInsight: 'AI tax optimization algorithms suggest that ELSS funds combined with debt funds can reduce effective tax burden by 25-30% for investors in the 30% tax bracket.',
    confidenceScore: 0.87,
    readTime: '6 min',
    imageUrl: 'tax calculation document'
  }
];

export const platformStats = {
  totalAUM: 285000, // in crores
  activeUsers: 124580,
  fundsListed: 1247,
  avgReturn: 15.8
};

export const userAnalytics = [
  { month: 'Jan', users: 98420, investments: 12500, returns: 14.2 },
  { month: 'Feb', users: 102340, investments: 13200, returns: 14.8 },
  { month: 'Mar', users: 108590, investments: 14100, returns: 15.2 },
  { month: 'Apr', users: 112780, investments: 15300, returns: 15.7 },
  { month: 'May', users: 118250, investments: 16800, returns: 16.1 },
  { month: 'Jun', users: 124580, investments: 18200, returns: 15.8 }
];

export const categoryPerformance = [
  { category: 'Equity', performance: 68, count: 456 },
  { category: 'Debt', performance: 45, count: 523 },
  { category: 'Hybrid', performance: 52, count: 268 }
];
