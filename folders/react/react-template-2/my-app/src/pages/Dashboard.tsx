import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Smart Financial Dashboard</h1>

      <Tabs defaultValue="spending" className="w-full">
        <TabsList>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
        </TabsList>

        <TabsContent value="spending">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Monthly Spending Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { month: 'Jan', amount: 1200 },
                    { month: 'Feb', amount: 980 },
                    { month: 'Mar', amount: 1450 },
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
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Portfolio Allocation
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={[
                      { name: 'Tech', value: 400 },
                      { name: 'Healthcare', value: 300 },
                      { name: 'Finance', value: 300 },
                      { name: 'Other', value: 200 },
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
            </CardContent>
          </Card>
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
  );
};

export default Dashboard;
