import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, AlertTriangle, Clock, Upload, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import { Spotlight } from "@/components/ui/spotlight";
import InvestmentWidgets from './InvestmentWidgets';

interface Asset {
  name: string;
  sector: string;
  shares: string;
  price: string;
  value: string;
}

interface InvestmentData {
  id: string;
  date: string;
  value: string;
  return: string;
  assets: Asset[];
}

interface InvestmentsDesktopProps {
  data: InvestmentData[];
}

const InvestmentsDesktop = ({ data }: InvestmentsDesktopProps) => {
  // Calculate metrics from data with proper error handling
  const latestData = data?.[data.length - 1] || { value: '0', return: '0', assets: [] };
  const firstData = data?.[0] || { value: '0', return: '0', assets: [] };
  
  // Ensure we have valid numbers for calculations
  const latestValue = Number(latestData.value) || 0;
  const firstValue = Number(firstData.value) || 0;
  const latestReturn = Number(latestData.return) || 0;
  
  // Calculate YTD return
  const ytdReturn = ((latestValue - firstValue) / firstValue) * 100;
  
  // Calculate risk level based on return volatility
  const returns = data.map(d => Number(d.return) || 0);
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  
  let riskLevel = 'Low';
  if (stdDev > 15) riskLevel = 'High';
  else if (stdDev > 8) riskLevel = 'Medium';
  
  // Prepare data for charts
  const performanceData = data.map(d => ({
    date: d.date,
    value: Number(d.value) || 0,
    return: Number(d.return) || 0
  }));
  
  const assetData = latestData.assets.map(asset => ({
    name: asset.name,
    value: Number(asset.value) || 0,
    sector: asset.sector
  }));
  
  // Calculate sector distribution
  const sectorData = assetData.reduce((acc: Record<string, number>, asset) => {
    acc[asset.sector] = (acc[asset.sector] || 0) + asset.value;
    return acc;
  }, {});
  
  const pieData = Object.entries(sectorData).map(([name, value]) => ({
    name,
    value
  }));
  
  // Get sector color
  function getSectorColor(sector: string) {
    const colors: Record<string, string> = {
      'Technology': '#0088FE',
      'Healthcare': '#00C49F',
      'Finance': '#FFBB28',
      'Energy': '#FF8042',
      'Consumer': '#8884D8',
      'Industrial': '#82CA9D',
      'Materials': '#FFC658',
      'Utilities': '#8DD1E1',
      'Real Estate': '#A4DE6C',
      'Communication': '#D0ED57',
    };
    return colors[sector] || '#8884D8';
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <h3 className="text-2xl font-bold">${latestValue.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">As of {latestData.date}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">YTD Return</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold">{ytdReturn.toFixed(2)}%</h3>
                  {ytdReturn >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500 ml-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Year to Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <h3 className="text-2xl font-bold">{riskLevel}</h3>
                <p className="text-sm text-muted-foreground">Based on volatility</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <h3 className="text-2xl font-bold">{new Date().toLocaleDateString()}</h3>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          {/* Asset Allocation */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getSectorColor(entry.name)} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <InvestmentWidgets />
          
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Statement
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsDesktop; 