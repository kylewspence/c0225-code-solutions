import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { getSpendingData } from '@/lib/csv-storage';

interface SpendingData {
  date: string;
  description: string;
  category: string;
  amount: string;
}

interface MonthlyData {
  [key: string]: number;
}

interface CategoryData {
  [key: string]: number;
}

const Spending = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData>({});
  const [categoryData, setCategoryData] = useState<CategoryData>({});
  const [updateKey, setUpdateKey] = useState(0);

  const processData = useCallback((data: SpendingData[]) => {
    console.log('Raw spending data:', data);

    if (!Array.isArray(data) || data.length === 0) {
      console.log('No data to process');
      return;
    }

    // Calculate monthly totals
    const monthly = data.reduce((acc: MonthlyData, item: SpendingData) => {
      try {
        const [month, day, year] = item.date.split('/');
        if (!month || !day || !year) {
          console.log('Invalid date format:', item.date);
          return acc;
        }

        const dateKey = `${year}-${month.padStart(2, '0')}`;
        const amount = Math.abs(parseFloat(item.amount));
        
        if (!isNaN(amount)) {
          acc[dateKey] = (acc[dateKey] || 0) + amount;
        }
      } catch (error) {
        console.error('Error processing monthly data:', error);
      }
      return acc;
    }, {} as MonthlyData);

    console.log('Processed monthly data:', monthly);
    setMonthlyData(monthly);

    // Calculate category totals
    const category = data.reduce((acc: CategoryData, item: SpendingData) => {
      try {
        const amount = Math.abs(parseFloat(item.amount));
        if (!isNaN(amount) && item.category) {
          acc[item.category] = (acc[item.category] || 0) + amount;
        }
      } catch (error) {
        console.error('Error processing category data:', error);
      }
      return acc;
    }, {} as CategoryData);

    console.log('Processed category data:', category);
    setCategoryData(category);
  }, []);

  const loadData = useCallback(() => {
    try {
      const data = getSpendingData();
      console.log('Loading spending data:', data);
      processData(data);
      setUpdateKey(prev => prev + 1);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [processData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleDataUpdate = () => {
      console.log('Data update event received');
      loadData();
    };

    window.addEventListener('storage', handleDataUpdate);
    window.addEventListener('spendingDataUpdated', handleDataUpdate);
    
    return () => {
      window.removeEventListener('storage', handleDataUpdate);
      window.removeEventListener('spendingDataUpdated', handleDataUpdate);
    };
  }, [loadData]);

  const chartData = Object.entries(monthlyData)
    .map(([month, amount]) => ({
      month,
      amount,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Calculate total spending for percentages
  const totalSpending = Object.values(categoryData).reduce((sum, amount) => sum + amount, 0);

  // Prepare category data for bar chart
  const categoryChartData = Object.entries(categoryData)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalSpending) * 100,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10); // Show top 10 categories

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    try {
      const [year, month] = dateStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr;
    }
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (chartData.length === 0 && categoryChartData.length === 0) {
    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>No Spending Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please upload your spending data to see insights.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" key={updateKey}>
      {/* Monthly Overview */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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

      {/* Category Breakdown */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryChartData}
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
                  formatter={(value: number, name: string) => {
                    if (name === 'amount') return formatCurrency(value);
                    return value;
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="amount" 
                  fill="#8884d8" 
                  name="Amount"
                  label={(props) => {
                    const { x, y, width, value } = props;
                    return (
                      <text
                        x={x + width + 5}
                        y={y}
                        dy={4}
                        fontSize={12}
                        textAnchor="start"
                        fill="#666"
                      >
                        {formatPercentage(categoryChartData.find(item => item.amount === value)?.percentage || 0)}
                      </text>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Spending; 