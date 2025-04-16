import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getSpendingData } from '@/lib/csv-storage';
import { useEffect, useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface SpendingData {
  date: string;
  amount: string;
  category: string;
  description: string;
}

interface MonthlyData {
  [key: string]: number;
}

interface CategoryData {
  [key: string]: number;
}

interface SpendingProps {
  onExport: () => void;
}

const Spending = ({ onExport }: SpendingProps) => {
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData>({});
  const [categoryData, setCategoryData] = useState<CategoryData>({});

  useEffect(() => {
    const data = getSpendingData() as SpendingData[];
    setSpendingData(data);

    // Calculate monthly totals
    const monthly = data.reduce((acc: MonthlyData, item: SpendingData) => {
      const month = item.date.substring(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += parseFloat(item.amount);
      return acc;
    }, {} as MonthlyData);
    setMonthlyData(monthly);

    // Calculate category totals
    const category = data.reduce((acc: CategoryData, item: SpendingData) => {
      if (!acc[item.category]) {
        acc[item.category] = 0;
      }
      acc[item.category] += parseFloat(item.amount);
      return acc;
    }, {} as CategoryData);
    setCategoryData(category);
  }, []); // Empty dependency array means this runs once on mount

  // Listen for storage events to update when data changes
  useEffect(() => {
    const handleStorageChange = () => {
      const data = getSpendingData() as SpendingData[];
      setSpendingData(data);

      // Recalculate monthly totals
      const monthly = data.reduce((acc: MonthlyData, item: SpendingData) => {
        const month = item.date.substring(0, 7);
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += parseFloat(item.amount);
        return acc;
      }, {} as MonthlyData);
      setMonthlyData(monthly);

      // Recalculate category totals
      const category = data.reduce((acc: CategoryData, item: SpendingData) => {
        if (!acc[item.category]) {
          acc[item.category] = 0;
        }
        acc[item.category] += parseFloat(item.amount);
        return acc;
      }, {} as CategoryData);
      setCategoryData(category);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* Monthly Spending Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Statement
              </Button>
              <Button className="w-full" variant="outline" onClick={onExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spending; 