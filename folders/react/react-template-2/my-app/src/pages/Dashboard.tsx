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

const Dashboard = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="spending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
        </TabsList>

        <div className="relative min-h-[800px]">
          <TabsContent value="spending" className="absolute inset-0">
            <div className="space-y-6">
              <Card className="h-[420px]">
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center">
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
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan 2023', amount: 1200 },
                        { month: 'Feb 2023', amount: 980 },
                        { month: 'Mar 2023', amount: 1450 },
                        { month: 'Apr 2023', amount: 1300 },
                        { month: 'May 2023', amount: 1100 },
                        { month: 'Jun 2023', amount: 950 },
                        { month: 'Jul 2023', amount: 1200 },
                        { month: 'Aug 2023', amount: 1600 },
                        { month: 'Sep 2023', amount: 1700 },
                        { month: 'Oct 2023', amount: 1800 },
                        { month: 'Nov 2023', amount: 1900 },
                        { month: 'Dec 2023', amount: 2100 },
                        { month: 'Jan 2024', amount: 2200 },
                        { month: 'Feb 2024', amount: 2400 },
                        { month: 'Mar 2024', amount: 2300 },
                        { month: 'Apr 2024', amount: 2250 },
                        { month: 'May 2024', amount: 2100 },
                        { month: 'Jun 2024', amount: 2500 },
                      ]}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      Top Category
                    </p>
                    <h3 className="text-xl font-semibold">Dining Out</h3>
                    <p className="text-green-600">-$540 this month</p>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardContent className="p-4 h-full flex flex-col">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        AI Insight
                      </p>
                      <p className="text-sm italic">
                        "You spent 32% more on subscriptions this month than
                        last month."
                      </p>
                    </div>
                    <div className="flex justify-center mt-auto -mb-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href="/ai-insights">Explore AI Insights →</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      Remaining Budget
                    </p>
                    <h3 className="text-xl font-bold text-green-700">$2,850</h3>
                    <p className="text-xs text-muted-foreground">
                      Out of $4,000
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investments" className="absolute inset-0">
            <div className="space-y-6">
              <Investments />
            </div>
          </TabsContent>

          <TabsContent value="taxes" className="absolute inset-0">
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
