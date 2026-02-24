import React, { useState } from 'react';
import { Sparkles, Target, TrendingUp, Shield, Info, ChevronRight, Award } from 'lucide-react';
import { mutualFunds, type UserProfile } from '../data/mockData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function RecommendationEngine() {
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [profile, setProfile] = useState<UserProfile>({
    riskTolerance: 'Moderate',
    investmentGoal: 'Wealth Creation',
    timeHorizon: '5-7 years',
    monthlyInvestment: 10000,
  });

  const getRecommendations = () => {
    let recommended = [...mutualFunds];

    // Filter by risk tolerance
    if (profile.riskTolerance === 'Conservative') {
      recommended = recommended.filter(f => f.riskLevel === 'Low' || f.riskLevel === 'Medium');
    } else if (profile.riskTolerance === 'Moderate') {
      recommended = recommended.filter(f => f.riskLevel !== 'Very High');
    }

    // Filter by time horizon
    if (profile.timeHorizon === '1-3 years') {
      recommended = recommended.filter(f => f.category !== 'Equity' || f.riskLevel === 'Medium');
    }

    // Sort by rating and returns
    recommended.sort((a, b) => {
      const scoreA = a.rating * 10 + a.returns3Y;
      const scoreB = b.rating * 10 + b.returns3Y;
      return scoreB - scoreA;
    });

    return recommended.slice(0, 5);
  };

  const recommendations = step === 'results' ? getRecommendations() : [];

  const getExplanation = (fund: typeof mutualFunds[0]) => {
    const reasons = [];
    
    if (fund.rating >= 4) {
      reasons.push(`High rating (${fund.rating}★) indicates consistent performance`);
    }
    
    if (profile.riskTolerance === 'Conservative' && fund.riskLevel === 'Low') {
      reasons.push('Matches your low-risk preference');
    } else if (profile.riskTolerance === 'Moderate' && (fund.riskLevel === 'Medium' || fund.riskLevel === 'High')) {
      reasons.push('Balanced risk-return profile for moderate investors');
    } else if (profile.riskTolerance === 'Aggressive' && fund.riskLevel === 'Very High') {
      reasons.push('High growth potential aligned with aggressive strategy');
    }
    
    if (fund.returns3Y > 15) {
      reasons.push(`Strong 3-year returns of ${fund.returns3Y}%`);
    }
    
    if (fund.expenseRatio < 1.5) {
      reasons.push(`Low expense ratio (${fund.expenseRatio}%) maximizes returns`);
    }
    
    if (fund.aum > 20000) {
      reasons.push('Large AUM indicates stability and investor confidence');
    }

    return reasons;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
          <Sparkles className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Personalised recommendations</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Fund suggestions based on your risk tolerance, goal, and time horizon—with clear reasoning for each.
        </p>
        <Badge variant="outline" className="mt-3 border-[var(--color-accent)]/50 text-[var(--color-text-secondary)]">
          Explainable • Transparent • You stay in control
        </Badge>
      </div>

      {step === 'input' ? (
          <div className="mx-auto max-w-2xl space-y-6">
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[var(--color-accent)]" />
                <Label className="text-lg font-semibold text-[var(--color-text-primary)]">Risk tolerance</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-[var(--color-text-muted)] dark:text-white/60" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Your comfort level with market volatility and potential losses</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <RadioGroup
                value={profile.riskTolerance}
                onValueChange={(value: any) => setProfile({ ...profile, riskTolerance: value })}
              >
                {(['Conservative', 'Moderate', 'Aggressive'] as const).map((risk) => (
                  <div
                    key={risk}
                    className="flex items-center space-x-2 rounded-lg border border-[var(--color-border-subtle)] p-4 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <RadioGroupItem value={risk} id={risk} />
                    <Label htmlFor={risk} className="flex-1 cursor-pointer">
                      {risk}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-[var(--color-accent)]" />
                <Label className="text-lg font-semibold text-[var(--color-text-primary)]">Investment goal</Label>
              </div>
              <RadioGroup
                value={profile.investmentGoal}
                onValueChange={(value) => setProfile({ ...profile, investmentGoal: value })}
              >
                {['Wealth Creation', 'Regular Income', 'Tax Saving', 'Retirement Planning'].map((goal) => (
                  <div
                    key={goal}
                    className="flex items-center space-x-2 rounded-lg border border-[var(--color-border-subtle)] p-4 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <RadioGroupItem value={goal} id={goal} />
                    <Label htmlFor={goal} className="flex-1 cursor-pointer">
                      {goal}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--color-accent)]" />
                <Label className="text-lg font-semibold text-[var(--color-text-primary)]">Time horizon</Label>
              </div>
              <RadioGroup
                value={profile.timeHorizon}
                onValueChange={(value) => setProfile({ ...profile, timeHorizon: value })}
              >
                {['1-3 years', '3-5 years', '5-7 years', '7+ years'].map((horizon) => (
                  <div
                    key={horizon}
                    className="flex items-center space-x-2 rounded-lg border border-[var(--color-border-subtle)] p-4 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <RadioGroupItem value={horizon} id={horizon} />
                    <Label htmlFor={horizon} className="flex-1 cursor-pointer">
                      {horizon}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <Label className="mb-4 block text-lg font-semibold text-[var(--color-text-primary)]">
                Monthly investment: ₹{profile.monthlyInvestment.toLocaleString()}
              </Label>
              <Slider
                value={[profile.monthlyInvestment]}
                onValueChange={([value]) => setProfile({ ...profile, monthlyInvestment: value })}
                min={1000}
                max={100000}
                step={1000}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-[var(--color-text-muted)] dark:text-white/60">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={() => setStep('results')}
              className="w-full gap-2 bg-[var(--color-accent)] py-6 text-base font-medium text-white hover:opacity-95"
            >
              Get recommendations
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-accent)]/5 p-6 dark:border-white/10 dark:bg-[var(--color-accent)]/10">
              <h3 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">Your profile</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">Risk tolerance</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">{profile.riskTolerance}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">Investment goal</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">{profile.investmentGoal}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">Time horizon</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">{profile.timeHorizon}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">Monthly SIP</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">₹{profile.monthlyInvestment.toLocaleString()}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setStep('input')}
                className="mt-4"
              >
                Modify Profile
              </Button>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Top 5 recommended funds</h3>
              {recommendations.map((fund, index) => {
                const explanations = getExplanation(fund);
                return (
                  <div key={fund.id}>
                    <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge className="bg-[var(--color-accent)]/90 text-white">
                              #{index + 1}
                            </Badge>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < fund.rating ? 'text-[var(--color-warning)]' : 'text-white/20'}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <h4 className="mb-2 text-xl font-semibold text-[var(--color-text-primary)]">{fund.name}</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{fund.category}</Badge>
                            <Badge variant="outline" className={fund.riskLevel === 'Low' ? 'border-[var(--color-success)]' : fund.riskLevel === 'Medium' ? 'border-[var(--color-warning)]' : 'border-[var(--color-danger)]'}>
                              {fund.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[var(--color-success)]">
                            {fund.returns3Y}%
                          </p>
                          <p className="text-sm text-[var(--color-text-muted)] dark:text-white/60">3Y returns</p>
                        </div>
                      </div>

                      {/* AI Explanation */}
                      <div className="space-y-2 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                          <Sparkles className="h-4 w-4" />
                          Why we recommend this fund:
                        </div>
                        <ul className="space-y-1 text-sm text-[var(--color-text-secondary)] dark:text-white/80">
                          {explanations.map((reason, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Award className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[var(--color-border-subtle)] pt-4 text-sm dark:border-white/10 sm:grid-cols-4">
                        <div>
                          <p className="text-[var(--color-text-muted)] dark:text-white/60">NAV</p>
                          <p className="font-semibold text-[var(--color-text-primary)]">₹{fund.nav}</p>
                        </div>
                        <div>
                          <p className="text-[var(--color-text-muted)] dark:text-white/60">AUM</p>
                          <p className="font-semibold text-[var(--color-text-primary)]">₹{fund.aum} Cr</p>
                        </div>
                        <div>
                          <p className="text-[var(--color-text-muted)] dark:text-white/60">Expense ratio</p>
                          <p className="font-semibold text-[var(--color-text-primary)]">{fund.expenseRatio}%</p>
                        </div>
                        <div>
                          <p className="text-[var(--color-text-muted)] dark:text-white/60">Min. investment</p>
                          <p className="font-semibold text-[var(--color-text-primary)]">₹{fund.minInvestment}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            <Card className="border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 p-4 dark:border-[var(--color-warning)]/30">
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-white/80">
                <strong>Disclaimer:</strong> Recommendations are generated from your inputs and historical data. Past performance does not guarantee future results. Consider consulting a financial advisor before investing.
              </p>
            </Card>
          </div>
        )}
    </div>
  );
}
