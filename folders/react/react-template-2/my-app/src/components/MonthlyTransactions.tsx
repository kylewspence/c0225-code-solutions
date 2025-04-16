import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getSpendingData } from '@/lib/csv-storage';
import { formatCurrency, useDataLoader } from '@/lib/utils';
import { Transaction } from '@/types/transaction';

export interface GroupedTransactions {
  [key: string]: Transaction[];
}

const MonthlyTransactions = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'ascending' | 'descending' } | null>(null);

  const { data: transactions, loading: isLoading } = useDataLoader(
    getSpendingData,
    [],
    ['storage', 'spendingDataUpdated']
  );

  const total = useMemo(() => 
    transactions?.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0) || 0,
    [transactions]
  );

  const groupedTransactions = useMemo(() => {
    if (!transactions) return {};
    return transactions.reduce((acc: GroupedTransactions, transaction: Transaction) => {
      const [month, day, year] = transaction.date.split('/');
      const dateKey = `${year}-${month.padStart(2, '0')}`;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    }, {});
  }, [transactions]);

  const availableMonths = useMemo(() => {
    return Object.keys(groupedTransactions)
      .sort()
      .reverse()
      .map(month => {
        const [year, monthNum] = month.split('-');
        return {
          value: month,
          label: new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
      });
  }, [groupedTransactions]);

  const filteredTransactions = useMemo(() => {
    let filtered = selectedMonth ? (groupedTransactions[selectedMonth] || []) : [];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t: Transaction) => 
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.amount.toString().includes(query)
      );
    }

    if (sortConfig) {
      filtered.sort((a: Transaction, b: Transaction) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [selectedMonth, groupedTransactions, searchQuery, sortConfig]);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'ascending' ? 'descending' : 'ascending'
        };
      }
      return { key, direction: 'ascending' };
    });
  };

  const formatDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Loading transactions...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('date')} className="cursor-pointer">Date</TableHead>
                  <TableHead onClick={() => handleSort('description')} className="cursor-pointer">Description</TableHead>
                  <TableHead onClick={() => handleSort('category')} className="cursor-pointer">Category</TableHead>
                  <TableHead onClick={() => handleSort('amount')} className="cursor-pointer text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: Transaction, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className={`text-right ${transaction.amount < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Spending</span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </div>
            <div className="text-sm text-gray-500">
              {transactions?.length || 0} transactions
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTransactions; 