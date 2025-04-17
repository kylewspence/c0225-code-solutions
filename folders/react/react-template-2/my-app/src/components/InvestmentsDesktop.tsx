import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AlertCircle, Home, TrendingUp, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Investment, StockInvestment, PropertyInvestment, investmentService } from '@/lib/investment-service';

const STOCK_SECTORS: Record<string, string> = {
  AAPL: 'Technology',
  MSFT: 'Technology',
  GOOGL: 'Technology',
  AMZN: 'Consumer Cyclical',
  NVDA: 'Technology'
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const InvestmentsDesktop = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const data = await investmentService.getInvestments();
      setInvestments(data);
    } catch (error) {
      console.error('Error loading investment data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const calculateTotalValue = () => {
    return investments.reduce((total, investment) => total + investment.value, 0);
  };

  const calculateNetRealEstateValue = () => {
    return investments
      .filter((inv): inv is PropertyInvestment => inv.type === 'property')
      .reduce((total, property) => {
        const equity = property.currentValue - property.mortgage;
        return total + equity;
      }, 0);
  };

  const calculateMonthlyRealEstateIncome = () => {
    return investments
      .filter((inv): inv is PropertyInvestment => inv.type === 'property')
      .reduce((total, property) => {
        const monthlyIncome = property.monthlyRent - property.expenses;
        const monthlyMortgage = property.mortgage * (property.rate / 1200); // Convert annual rate to monthly
        return total + monthlyIncome - monthlyMortgage;
      }, 0);
  };

  const calculateAssetAllocation = () => {
    const stockValue = investments
      .filter(inv => inv.type === 'stock')
      .reduce((total, stock) => total + stock.value, 0);
    
    const realEstateValue = investments
      .filter(inv => inv.type === 'property')
      .reduce((total, property) => total + property.value, 0);

    return [
      { name: 'Stocks', value: stockValue },
      { name: 'Real Estate', value: realEstateValue }
    ];
  };

  if (loading) {
    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Loading investments...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const totalValue = calculateTotalValue();
  const netRealEstateValue = calculateNetRealEstateValue();
  const monthlyRealEstateIncome = calculateMonthlyRealEstateIncome();
  const assetAllocation = calculateAssetAllocation();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={loadData}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Values
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Real Estate Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(netRealEstateValue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Real Estate Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(monthlyRealEstateIncome)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stocks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stocks">
            <TrendingUp className="h-4 w-4 mr-2" />
            Stocks
          </TabsTrigger>
          <TabsTrigger value="properties">
            <Home className="h-4 w-4 mr-2" />
            Properties
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stocks">
          <Card>
            <CardHeader>
              <CardTitle>Stock Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments
                      .filter((inv): inv is StockInvestment => inv.type === 'stock')
                      .map((stock) => (
                        <TableRow key={stock.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{stock.symbol}</TableCell>
                          <TableCell>{STOCK_SECTORS[stock.symbol] || 'Other'}</TableCell>
                          <TableCell>{stock.shares}</TableCell>
                          <TableCell>{formatCurrency(stock.currentPrice)}</TableCell>
                          <TableCell>{formatCurrency(stock.value)}</TableCell>
                          <TableCell className={stock.change > 0 ? 'text-green-500' : 'text-red-500'}>
                            {stock.change.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Address</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Mortgage</TableHead>
                      <TableHead>Equity</TableHead>
                      <TableHead>Monthly Income</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments
                      .filter((inv): inv is PropertyInvestment => inv.type === 'property')
                      .map((property) => {
                        const equity = property.currentValue - property.mortgage;
                        const monthlyIncome = property.monthlyRent - property.expenses;
                        const monthlyMortgage = property.mortgage * (property.rate / 1200);
                        const netMonthlyIncome = monthlyIncome - monthlyMortgage;
                        const annualROI = (netMonthlyIncome * 12) / equity * 100;

                        return (
                          <TableRow key={property.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{property.propertyAddress}</TableCell>
                            <TableCell>{formatCurrency(property.currentValue)}</TableCell>
                            <TableCell>{formatCurrency(property.mortgage)}</TableCell>
                            <TableCell>{formatCurrency(equity)}</TableCell>
                            <TableCell>{formatCurrency(netMonthlyIncome)}</TableCell>
                            <TableCell className={annualROI > 0 ? 'text-green-500' : 'text-red-500'}>
                              {annualROI.toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentsDesktop; 