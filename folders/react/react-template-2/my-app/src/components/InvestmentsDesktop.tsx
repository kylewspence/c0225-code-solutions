import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PieChart,
  Pie,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Upload, Download, Settings, DollarSign, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import InvestmentWidgets from './InvestmentWidgets';
import { Spotlight } from "@/components/ui/spotlight";

const InvestmentsDesktop = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="group relative overflow-hidden">
          <Spotlight />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <h3 className="text-2xl font-bold">$125,430.00</h3>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">YTD Return</p>
                <h3 className="text-xl font-bold">+12.5%</h3>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+2.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <h3 className="text-xl font-bold">Moderate</h3>
                <div className="flex items-center text-yellow-600 text-sm">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>Balanced</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <h3 className="text-xl font-bold">Today</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <span>12:30 PM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-2">
        {/* Left Column */}
        <div className="col-span-8 space-y-2">
          {/* Asset Allocation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Asset Allocation</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Tech', value: 40000, change: '+12.5%', color: '#8884d8' },
                  { name: 'Healthcare', value: 30000, change: '+8.3%', color: '#82ca9d' },
                  { name: 'Finance', value: 20000, change: '-4.2%', color: '#ffc658' },
                  { name: 'Other', value: 10000, change: '+1.0%', color: '#d0ed57' },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">${(item.value / 1000).toFixed(0)}k</span>
                        <span className={`ml-2 text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-in-out"
                        style={{ 
                          width: `${(item.value / 100000) * 100}%`,
                          backgroundColor: item.color 
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
                  <span className="text-lg font-semibold">$100,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Performance</h3>
                <div className="space-x-1">
                  <Button variant="outline" size="sm">1D</Button>
                  <Button variant="outline" size="sm">7D</Button>
                  <Button variant="outline" size="sm">30D</Button>
                  <Button variant="outline" size="sm">1Y</Button>
                </div>
              </div>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', value: 85000 },
                      { month: 'Feb', value: 88000 },
                      { month: 'Mar', value: 92000 },
                      { month: 'Apr', value: 95000 },
                      { month: 'May', value: 98000 },
                      { month: 'Jun', value: 100000 },
                    ]}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#666' }}
                      axisLine={{ stroke: '#ddd' }}
                    />
                    <YAxis 
                      tick={{ fill: '#666' }}
                      axisLine={{ stroke: '#ddd' }}
                      tickFormatter={(value) => `$${(value / 1000)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ fill: '#8884d8', r: 4 }}
                      activeDot={{ fill: '#8884d8', r: 6, stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" variant="outline" size="sm">
              <Upload className="h-3 w-3 mr-1" />
              Upload Statement
            </Button>
            <Button className="flex-1" variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-2">
          <InvestmentWidgets isMobile={false} />
        </div>
      </div>
    </div>
  );
};

export default InvestmentsDesktop; 