import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSpendingData } from '@/lib/csv-storage';
import { useEffect, useState, useMemo } from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, AlertTriangleIcon, TrendingDownIcon, BarChart3Icon, LineChartIcon } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface SpendingData {
  date: string;
  category: string;
  amount: string;
}

interface CategoryInsight {
  category: string;
  totalSpent: number;
  monthlyAverage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  percentageOfTotal: number;
  monthOverMonthChange?: number;
  forecastNextMonth?: number;
}

interface MonthlySpending {
  [key: string]: number;
}

interface MonthlyTrend {
  month: string;
  amount: number;
  change: number;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<{
    topCategories: CategoryInsight[];
    monthlyTrend: MonthlySpending;
    unusualSpending: CategoryInsight[];
    recommendations: string[];
    monthlyTotal: number;
    monthlyAverage: number;
    monthOverMonthChange: number;
    forecastNextMonth: number;
    spendingTrends: MonthlyTrend[];
    categoryTrends: { category: string; data: { month: string; amount: number }[] }[];
  } | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const analyzeSpendingData = (data: SpendingData[]) => {
    // Group by category and month
    const categoryTotals: { [key: string]: number[] } = {};
    const monthlyTotals: { [key: string]: number } = {};
    const categoryMonthlyTotals: { [key: string]: { [key: string]: number } } = {};
    let totalSpending = 0;

    // Process data by month and category
    data.forEach(item => {
      const amount = Math.abs(parseFloat(item.amount));
      if (isNaN(amount)) return;

      // Process monthly totals
      const [month, , year] = item.date.split('/');
      const monthKey = `${year}-${month.padStart(2, '0')}`;
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + amount;
      totalSpending += amount;

      // Process category totals
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = [];
        categoryMonthlyTotals[item.category] = {};
      }
      categoryTotals[item.category].push(amount);
      categoryMonthlyTotals[item.category][monthKey] = 
        (categoryMonthlyTotals[item.category][monthKey] || 0) + amount;
    });

    // Sort months chronologically
    const sortedMonths = Object.keys(monthlyTotals).sort();
    const monthlyAverage = totalSpending / sortedMonths.length;

    // Calculate month-over-month changes
    const monthlyTrends: MonthlyTrend[] = sortedMonths.map((month, index) => {
      const previousMonth = index > 0 ? monthlyTotals[sortedMonths[index - 1]] : monthlyTotals[month];
      const change = ((monthlyTotals[month] - previousMonth) / previousMonth) * 100;
      return {
        month,
        amount: monthlyTotals[month],
        change: isNaN(change) ? 0 : change,
      };
    });

    // Calculate category trends over time
    const categoryTrends = Object.entries(categoryMonthlyTotals).map(([category, monthlyData]) => ({
      category,
      data: sortedMonths.map(month => ({
        month,
        amount: monthlyData[month] || 0,
      })),
    }));

    // Forecast next month's spending using simple moving average
    const lastThreeMonths = sortedMonths.slice(-3);
    const forecastNextMonth = lastThreeMonths.reduce((sum, month) => 
      sum + monthlyTotals[month], 0) / lastThreeMonths.length;

    // Calculate month-over-month change
    const lastMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];
    const monthOverMonthChange = previousMonth
      ? ((monthlyTotals[lastMonth] - monthlyTotals[previousMonth]) / monthlyTotals[previousMonth]) * 100
      : 0;

    // Analyze categories with enhanced insights
    const categoryInsights: CategoryInsight[] = Object.entries(categoryTotals).map(([category, amounts]) => {
      const totalSpent = amounts.reduce((sum, amount) => sum + amount, 0);
      const monthlyAvg = totalSpent / sortedMonths.length;
      const trend = determineTrend(amounts);

      // Calculate category-specific month-over-month change
      const categoryLastMonth = categoryMonthlyTotals[category][lastMonth] || 0;
      const categoryPreviousMonth = previousMonth ? (categoryMonthlyTotals[category][previousMonth] || 0) : categoryLastMonth;
      const categoryMonthOverMonthChange = ((categoryLastMonth - categoryPreviousMonth) / (categoryPreviousMonth || 1)) * 100;

      // Forecast next month's spending for this category
      const categoryLastThreeMonths = lastThreeMonths.map(month => categoryMonthlyTotals[category][month] || 0);
      const categoryForecast = categoryLastThreeMonths.reduce((sum, amount) => sum + amount, 0) / lastThreeMonths.length;

      return {
        category,
        totalSpent,
        monthlyAverage: monthlyAvg,
        trend,
        percentageOfTotal: (totalSpent / totalSpending) * 100,
        monthOverMonthChange: categoryMonthOverMonthChange,
        forecastNextMonth: categoryForecast,
      };
    });

    // Sort categories by total spent
    const topCategories = categoryInsights
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    // Find unusual spending (categories with high variance or significant changes)
    const unusualSpending = categoryInsights
      .filter(cat => 
        cat.monthlyAverage > monthlyAverage * 0.2 || // High average spending
        Math.abs(cat.monthOverMonthChange || 0) > 50 || // Significant month-over-month change
        cat.trend === 'increasing' // Increasing trend
      )
      .sort((a, b) => Math.abs(b.monthOverMonthChange || 0) - Math.abs(a.monthOverMonthChange || 0))
      .slice(0, 3);

    // Generate enhanced recommendations
    const recommendations = generateRecommendations(
      categoryInsights,
      monthlyAverage,
      unusualSpending,
      monthOverMonthChange,
      forecastNextMonth
    );

    return {
      topCategories,
      monthlyTrend: monthlyTotals,
      unusualSpending,
      recommendations,
      monthlyTotal: totalSpending,
      monthlyAverage,
      monthOverMonthChange,
      forecastNextMonth,
      spendingTrends: monthlyTrends,
      categoryTrends,
    };
  };

  const determineTrend = (amounts: number[]): 'increasing' | 'decreasing' | 'stable' => {
    if (amounts.length < 2) return 'stable';
    const firstHalf = amounts.slice(0, Math.floor(amounts.length / 2));
    const secondHalf = amounts.slice(Math.floor(amounts.length / 2));
    const firstHalfAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    if (secondHalfAvg > firstHalfAvg * 1.1) return 'increasing';
    if (secondHalfAvg < firstHalfAvg * 0.9) return 'decreasing';
    return 'stable';
  };

  const generateRecommendations = (
    categories: CategoryInsight[],
    monthlyAverage: number,
    unusualSpending: CategoryInsight[],
    monthOverMonthChange: number,
    forecastNextMonth: number,
  ): string[] => {
    const recommendations: string[] = [];

    // Overall spending trend recommendations
    if (monthOverMonthChange > 20) {
      recommendations.push(
        `Your overall spending increased by ${formatPercentage(monthOverMonthChange)} compared to last month. Consider reviewing your recent purchases and identifying areas to cut back.`
      );
    } else if (monthOverMonthChange < -20) {
      recommendations.push(
        `Great job! Your overall spending decreased by ${formatPercentage(Math.abs(monthOverMonthChange))} compared to last month. Keep up the good work!`
      );
    }

    // Forecast-based recommendations
    if (forecastNextMonth > monthlyAverage * 1.1) {
      recommendations.push(
        `Based on your recent spending patterns, next month's expenses are projected to be ${formatCurrency(forecastNextMonth)}, which is higher than your monthly average. Consider planning ahead to reduce expenses.`
      );
    }

    // Check for high-spending categories
    unusualSpending.forEach(category => {
      if (category.percentageOfTotal > 30) {
        recommendations.push(
          `Your spending on ${category.category} is ${formatPercentage(category.percentageOfTotal)} of your total expenses. Consider setting a budget for this category.`
        );
      }
      
      if (category.monthOverMonthChange && category.monthOverMonthChange > 50) {
        recommendations.push(
          `${category.category} spending increased by ${formatPercentage(category.monthOverMonthChange)} compared to last month. Review if this increase was necessary or if it can be reduced.`
        );
      }
    });

    // Look for increasing trends
    categories
      .filter(cat => cat.trend === 'increasing' && cat.monthlyAverage > monthlyAverage * 0.1)
      .forEach(category => {
        recommendations.push(
          `Spending in ${category.category} shows an increasing trend. Review if this aligns with your financial goals.`
        );
      });

    // Add general recommendations based on the analysis
    if (recommendations.length === 0) {
      recommendations.push("Your spending patterns appear to be consistent across categories.");
    }

    // Budget recommendation
    const suggestedBudget = monthlyAverage * 0.9;
    recommendations.push(
      `Based on your spending patterns, consider setting a monthly budget of ${formatCurrency(suggestedBudget)} (10% less than your current average of ${formatCurrency(monthlyAverage)}).`
    );

    return recommendations;
  };

  useEffect(() => {
    const data = getSpendingData();
    if (data.length > 0) {
      const analysisResults = analyzeSpendingData(data);
      setInsights(analysisResults);
    }
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const [year, month] = dateStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      return dateStr;
    }
  };

  if (!insights) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-muted-foreground">Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">AI Spending Insights</h1>
      
      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Average</p>
              <p className="text-2xl font-bold">{formatCurrency(insights.monthlyAverage)}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Last Month vs Previous</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{formatPercentage(insights.monthOverMonthChange)}</p>
                {insights.monthOverMonthChange > 0 ? (
                  <ArrowUpIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowDownIcon className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Forecast Next Month</p>
              <p className="text-2xl font-bold">{formatCurrency(insights.forecastNextMonth)}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Categories</p>
              <p className="text-2xl font-bold">{insights.topCategories.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="w-5 h-5" />
            Monthly Spending Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={insights.spendingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={formatDate}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  domain={[0, 'auto']}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={formatDate}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Monthly Spending"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3Icon className="w-5 h-5" />
            Category Spending Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={insights.topCategories}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={formatCurrency} />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  width={90}
                />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => {
                    if (name === 'amount') return formatCurrency(value);
                    if (name === 'monthlyAverage') return formatCurrency(value);
                    if (name === 'forecastNextMonth') return formatCurrency(value);
                    return value;
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="totalSpent" 
                  fill="#8884d8" 
                  name="Total Spent"
                />
                <Bar 
                  dataKey="monthlyAverage" 
                  fill="#82ca9d" 
                  name="Monthly Average"
                />
                <Bar 
                  dataKey="forecastNextMonth" 
                  fill="#ffc658" 
                  name="Next Month Forecast"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Unusual Spending Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />
            Unusual Spending Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.unusualSpending.map((category) => (
              <div key={category.category} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{category.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPercentage(category.percentageOfTotal)} of total spending
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(category.totalSpent)}</p>
                    {category.monthOverMonthChange && (
                      <div className="flex items-center justify-end gap-1">
                        {category.monthOverMonthChange > 0 ? (
                          <ArrowUpIcon className="w-4 h-4 text-red-500" />
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 text-green-500" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {formatPercentage(Math.abs(category.monthOverMonthChange))} vs last month
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Monthly Average: {formatCurrency(category.monthlyAverage)}</p>
                  <p>Forecast Next Month: {formatCurrency(category.forecastNextMonth || 0)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insights.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2 p-2">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <p>{recommendation}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
