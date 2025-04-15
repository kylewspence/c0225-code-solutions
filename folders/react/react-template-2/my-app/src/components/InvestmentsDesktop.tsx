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
  BarChart,
  Bar,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Upload, Download, Settings, DollarSign, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import InvestmentWidgets from './InvestmentWidgets';
import { Spotlight } from "@/components/ui/spotlight";

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
  const ytdReturn = firstValue === 0 ? 0 : ((latestValue - firstValue) / firstValue) * 100;
  
  const recentReturn = data?.length > 1 
    ? ((latestValue - (Number(data[data.length - 2].value) || 0)) / (Number(data[data.length - 2].value) || 1)) * 100
    : 0;

  // Calculate sector allocation with proper error handling
  const sectorAllocation = (latestData.assets || []).reduce((acc: Record<string, number>, asset: Asset) => {
    if (!acc[asset.sector]) {
      acc[asset.sector] = 0;
    }
    acc[asset.sector] += Number(asset.value) || 0;
    return acc;
  }, {});

  const totalValue = Object.values(sectorAllocation).reduce((sum, value) => sum + value, 0);

  const sectorData = Object.entries(sectorAllocation).map(([sector, value]) => ({
    name: sector,
    value: value,
    percentage: totalValue === 0 ? '0%' : ((value / totalValue) * 100).toFixed(1) + '%'
  }));

  // Calculate individual asset performance with proper error handling
  const assetPerformance = (latestData.assets || []).map((asset: Asset) => {
    const firstDayAsset = firstData.assets?.find((a: Asset) => a.name === asset.name);
    const initialValue = firstDayAsset ? Number(firstDayAsset.value) || 0 : Number(asset.value) || 0;
    const currentValue = Number(asset.value) || 0;
    const returnValue = initialValue === 0 ? 0 : ((currentValue - initialValue) / initialValue) * 100;
    
    return {
      name: asset.name,
      sector: asset.sector,
      shares: asset.shares,
      price: asset.price,
      value: currentValue,
      returnPercent: returnValue,  // Store as number without % symbol
      color: getSectorColor(asset.sector)
    };
  });

  // Sort assets by value with proper number handling
  assetPerformance.sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0));

  // Get color based on sector
  function getSectorColor(sector: string) {
    const colors: Record<string, string> = {
      'Technology': '#8884d8',
      'Healthcare': '#82ca9d',
      'Finance': '#ffc658',
      'ETF': '#d0ed57',
      'Bonds': '#a4de6c',
      'Commodities': '#8dd1e1',
      'Real Estate': '#ff8042'
    };
    return colors[sector] || '#8884d8';
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="group relative overflow-hidden">
          <Spotlight />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <h3 className="text-2xl font-bold">${Number(latestData.value).toLocaleString()}</h3>
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
                <h3 className="text-xl font-bold">{ytdReturn.toFixed(1)}%</h3>
                <div className={`flex items-center ${recentReturn >= 0 ? 'text-green-600' : 'text-red-600'} text-sm`}>
                  {recentReturn >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  <span>{Math.abs(recentReturn).toFixed(1)}%</span>
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
          <CardContent className="p-4">
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
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-8 space-y-6">
          {/* Sector Allocation */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Sector Allocation</h3>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name} ${percentage}`}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getSectorColor(entry.name)} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {sectorData.map((sector) => (
                    <div key={sector.name} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getSectorColor(sector.name) }} />
                          <span className="text-sm font-medium">{sector.name}</span>
                        </div>
                        <span className="text-sm font-medium">${sector.value.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500 ease-in-out"
                          style={{ 
                            width: sector.percentage,
                            backgroundColor: getSectorColor(sector.name)
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Performance */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Asset Performance</h3>
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
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={assetPerformance} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke="#8884d8"
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="#82ca9d"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === "Value") return ["$" + Number(value).toLocaleString(), name];
                        return [value.toFixed(1) + "%", name];
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="value" name="Value" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="returnPercent" name="Return %" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Performance */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Portfolio Performance</h3>
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
                      name="Portfolio Value"
                    />
                    <Line
                      type="monotone"
                      dataKey="return"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Return %"
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
        <div className="col-span-4 space-y-6">
          <InvestmentWidgets isMobile={false} />
          
          {/* Top Performers */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
              <div className="space-y-4">
                {assetPerformance.slice(0, 3).map((asset: any) => (
                  <div key={asset.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }} />
                      <div>
                        <p className="text-sm font-medium">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.sector}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${Number(asset.value).toLocaleString()}</p>
                      <p className={`text-xs ${asset.returnPercent < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {asset.returnPercent.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsDesktop; 