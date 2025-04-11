import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
} from 'recharts';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="relative min-h-screen">
      <div className="p-14">
        <Tabs defaultValue="spending">
          <TabsList>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
          </TabsList>

          <TabsContent value="spending">
            <Card>
              <CardContent className="p-4 space-y-4">
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
                <ResponsiveContainer width="100%" height={300}>
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
                  <p className="text-sm text-muted-foreground">Top Category</p>
                  <h3 className="text-xl font-semibold">Dining Out</h3>
                  <p className="text-green-600">-$540 this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-1">
                  <p className="text-sm text-muted-foreground">AI Insight</p>
                  <p className="text-sm italic">
                    “You spent 32% more on subscriptions this month than last
                    month.”
                  </p>
                  <div className="flex justify-center items-end h-full mt-4">
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
                  <p className="text-xs text-muted-foreground">Out of $4,000</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="investments">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Portfolio Allocation
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
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={[
                        { name: 'Tech', value: 40000 },
                        { name: 'Healthcare', value: 30000 },
                        { name: 'Finance', value: 20000 },
                        { name: 'Other', value: 10000 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label>
                      {['#8884d8', '#82ca9d', '#ffc658', '#d0ed57'].map(
                        (color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex justify-content:space-around">
                  <div>
                    <p className="text-sm text-muted-foreground">Tech</p>
                    <p className="font-medium">$40,000</p>
                    <p className="text-green-600 text-sm">+12.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Healthcare</p>
                    <p className="font-medium">$30,000</p>
                    <p className="text-green-600 text-sm">+8.3%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Finance</p>
                    <p className="font-medium">$20,000</p>
                    <p className="text-red-600 text-sm">-4.2%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Other</p>
                    <p className="font-medium">$10,000</p>
                    <p className="text-green-600 text-sm">+1.0%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <Card className="max-h-[300px] overflow-y-auto">
                <CardContent className="p-4 space-y-4">
                  <p className="text-sm text-muted-foreground">Watchlist:</p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-40">
                      <h3 className="text-xl font-semibold">PLTR</h3>
                      <p className="text-green-600">+187.5%</p>
                    </div>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                          data={[
                            { month: 'Jan 2023', amount: 8 },
                            { month: 'Feb 2023', amount: 9 },
                            { month: 'Mar 2023', amount: 9.5 },
                            { month: 'Apr 2023', amount: 10 },
                            { month: 'May 2023', amount: 12 },
                            { month: 'Jun 2023', amount: 10 },
                            { month: 'Jul 2023', amount: 11 },
                            { month: 'Aug 2023', amount: 14 },
                            { month: 'Sep 2023', amount: 13.5 },
                            { month: 'Oct 2023', amount: 15 },
                            { month: 'Nov 2023', amount: 17 },
                            { month: 'Dec 2023', amount: 16 },
                            { month: 'Jan 2024', amount: 18 },
                            { month: 'Feb 2024', amount: 19 },
                            { month: 'Mar 2024', amount: 20 },
                            { month: 'Apr 2024', amount: 21.5 },
                            { month: 'May 2024', amount: 22 },
                            { month: 'Jun 2024', amount: 23 },
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
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-40">
                      <h3 className="text-xl font-semibold">TSLA</h3>
                      <p className="text-green-600">+64.86%</p>
                    </div>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                          data={[
                            { month: 'Jan 2023', amount: 185 },
                            { month: 'Feb 2023', amount: 190 },
                            { month: 'Mar 2023', amount: 200 },
                            { month: 'Apr 2023', amount: 195 },
                            { month: 'May 2023', amount: 210 },
                            { month: 'Jun 2023', amount: 220 },
                            { month: 'Jul 2023', amount: 230 },
                            { month: 'Aug 2023', amount: 225 },
                            { month: 'Sep 2023', amount: 240 },
                            { month: 'Oct 2023', amount: 260 },
                            { month: 'Nov 2023', amount: 250 },
                            { month: 'Dec 2023', amount: 265 },
                            { month: 'Jan 2024', amount: 275 },
                            { month: 'Feb 2024', amount: 290 },
                            { month: 'Mar 2024', amount: 285 },
                            { month: 'Apr 2024', amount: 295 },
                            { month: 'May 2024', amount: 310 },
                            { month: 'Jun 2024', amount: 305 },
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-1">
                  <p className="text-sm text-muted-foreground">AI Insight</p>
                  <p className="text-sm italic">
                    "Your portfolio is well-balanced and trending in the right
                    direction according to your goals."{' '}
                  </p>
                  <div className="flex justify-center items-end h-full mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/ai-insights">Explore AI Insights →</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Returns YTD:</p>
                  <h3 className="text-xl font-bold text-green-700">$2,850</h3>
                  <p className="text-xs text-muted-foreground">3%</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="taxes">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
