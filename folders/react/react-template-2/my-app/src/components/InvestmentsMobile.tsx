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
import { Progress } from '@/components/ui/progress';
import InvestmentWidgets from './InvestmentWidgets';
import { Spotlight } from "@/components/ui/spotlight";

interface InvestmentsMobileProps {
  data: any[];
}

const InvestmentsMobile = ({ data }: InvestmentsMobileProps) => {
  // Calculate latest values from data
  const latestData = data[data.length - 1] || { value: 0, return: 0 };
  
  return (
    <div className="flex flex-col gap-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="group relative overflow-hidden">
          <Spotlight />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <h3 className="text-2xl font-bold">${latestData.value}</h3>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">YTD Return</p>
                <h3 className="text-2xl font-bold">+12.5%</h3>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+2.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <h3 className="text-2xl font-bold">Moderate</h3>
                <div className="flex items-center text-yellow-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>Balanced</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <h3 className="text-2xl font-bold">Today</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <span>12:30 PM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${item.value.toLocaleString()}</p>
                    <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </p>
                  </div>
                </div>
                <Progress 
                  value={(item.value / 100000) * 100} 
                  indicatorColor={item.color}
                  className="h-2"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
              <span className="text-lg font-bold">$100,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Performance</h2>
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
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button className="flex-1" variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload Statement
        </Button>
        <Button className="flex-1" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Widgets */}
      <InvestmentWidgets isMobile={true} />
    </div>
  );
};

export default InvestmentsMobile; 