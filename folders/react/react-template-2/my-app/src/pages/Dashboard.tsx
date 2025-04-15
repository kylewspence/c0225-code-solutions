import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/animated-tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
  LabelList,
} from 'recharts';
import { Button } from '@/components/ui/button';
import Investments from '@/components/Investments';
import { useEffect, useState } from 'react';
import { initializeSampleData, getSpendingData, getInvestmentsData } from '@/lib/csv-storage';

const Dashboard = () => {
  const [spendingData, setSpendingData] = useState<any[]>([]);
  const [investmentsData, setInvestmentsData] = useState<any[]>([]);

  useEffect(() => {
    // Initialize sample data
    initializeSampleData();
    
    // Load data from localStorage
    const investments = getInvestmentsData();
    const spending = getSpendingData();

    if (investments.length === 0) {
      // If no data, initialize again and reload
      initializeSampleData();
      setInvestmentsData(getInvestmentsData());
    } else {
      setInvestmentsData(investments);
    }

    if (spending.length === 0) {
      setSpendingData(getSpendingData());
    } else {
      setSpendingData(spending);
    }
  }, []);

  // Calculate spending metrics from data
  const totalSpent = spendingData.reduce((sum, item) => sum + Number(item.amount), 0);
  const topCategory = spendingData.reduce((max, item) => 
    Number(item.amount) > Number(max.amount) ? item : max, 
    { category: '', amount: 0 }
  );

  return (
    <div className="p-4 min-h-screen">
      <Tabs defaultValue="spending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
        </TabsList>

        <div className="relative">
          <TabsContent value="spending">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      Monthly Spending Trend
                    </h2>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        1D
                      </Button>
                      <Button variant="outline" size="sm">
                        7D
                      </Button>
                      <Button variant="outline" size="sm">
                        30D
                      </Button>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={spendingData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                      >
                        <XAxis dataKey="date" />
                        <YAxis
                          tickFormatter={(value) => `$${value}`}
                          domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
                        />
                        <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#8884d8"
                          strokeWidth={2}
                          name="Amount"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Grid layout for metrics and additional charts */}
              <div className="grid grid-cols-12 gap-6">
                {/* Main content area */}
                <div className="col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Top Category
                        </p>
                        <h3 className="text-xl font-semibold">{topCategory.category}</h3>
                        <p className="text-green-600">-${topCategory.amount} this month</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Remaining Budget
                        </p>
                        <h3 className="text-xl font-bold text-green-700">${4000 - totalSpent}</h3>
                        <p className="text-xs text-muted-foreground">
                          Out of $4,000
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                          Total Transactions
                        </p>
                        <h3 className="text-xl font-bold">{spendingData.length}</h3>
                        <p className="text-xs text-muted-foreground">
                          This month
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Placeholder for additional charts */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
                      <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                        Category distribution chart coming soon
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar area */}
                <div className="col-span-4 space-y-6">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        AI Insight
                      </p>
                      <p className="text-sm italic mb-4">
                        "You spent ${totalSpent} this month across {spendingData.length} transactions."
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/ai-insights">Explore AI Insights →</a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Placeholder for additional widgets */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Add Transaction
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Set Budget
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investments">
            <div className="space-y-6">
              <Investments data={investmentsData} />
            </div>
          </TabsContent>

          <TabsContent value="taxes">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Year-over-Year Tax Summary
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { year: '2021', taxPaid: 12000 },
                        { year: '2022', taxPaid: 13500 },
                        { year: '2023', taxPaid: 12800 },
                      ]}>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="taxPaid"
                        stroke="#82ca9d"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
