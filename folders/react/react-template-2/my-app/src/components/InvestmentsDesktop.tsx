import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getInvestmentsData } from '@/lib/csv-storage';

interface Investment {
  date: string;
  symbol: string;
  shares: number;
  price: number;
  currentPrice?: number;
  value?: number;
  change?: number;
}

const sampleData: Investment[] = [
  { date: '2024-03-01', symbol: 'AAPL', shares: 10, price: 170.73 },
  { date: '2024-03-01', symbol: 'MSFT', shares: 5, price: 415.32 },
  { date: '2024-03-01', symbol: 'GOOGL', shares: 3, price: 142.56 },
  { date: '2024-03-01', symbol: 'AMZN', shares: 2, price: 178.75 },
  { date: '2024-03-01', symbol: 'META', shares: 4, price: 485.96 },
];

const InvestmentsDesktop = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = getInvestmentsData();
        if (data && data.length > 0) {
          // Convert string values to numbers and ensure proper formatting
          const formattedData = data.map((item: Investment) => ({
            ...item,
            shares: parseFloat(item.shares.toString()) || 0,
            price: parseFloat(item.price.toString()) || 0,
          }));
          setInvestments(formattedData);
        } else {
          setInvestments(sampleData);
        }
      } catch (error) {
        console.error('Error loading investment data:', error);
        setInvestments(sampleData);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const handleDataUpdate = () => {
      loadData();
    };

    window.addEventListener('storage', handleDataUpdate);
    window.addEventListener('investmentsDataUpdated', handleDataUpdate);
    
    return () => {
      window.removeEventListener('storage', handleDataUpdate);
      window.removeEventListener('investmentsDataUpdated', handleDataUpdate);
    };
  }, []);

  const calculateTotalValue = (investments: Investment[]) => {
    return investments.reduce((total, investment) => {
      const value = investment.shares * investment.price;
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const handleSymbolClick = async (symbol: string) => {
    // TODO: Implement API call to get detailed stock information
    console.log('Fetching details for:', symbol);
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

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(calculateTotalValue(investments))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Investment Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment, index) => {
                  const value = investment.shares * investment.price;
                  return (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSymbolClick(investment.symbol)}
                    >
                      <TableCell className="font-medium">{investment.symbol}</TableCell>
                      <TableCell>{investment.shares}</TableCell>
                      <TableCell>{formatCurrency(investment.price)}</TableCell>
                      <TableCell>{formatCurrency(value)}</TableCell>
                      <TableCell className={investment.change && investment.change > 0 ? 'text-green-500' : 'text-red-500'}>
                        {investment.change ? formatPercentage(investment.change) : 'N/A'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentsDesktop; 