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

interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: string;
}

interface GroupedTransactions {
  [key: string]: Transaction[];
}

const MonthlyTransactions = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'ascending' | 'descending' } | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const transactions = useMemo(() => {
    const data = getSpendingData();
    return data.map((t: Transaction) => ({
      ...t,
      amount: Math.abs(parseFloat(t.amount)).toFixed(2)
    }));
  }, []);

  const groupedTransactions = useMemo(() => {
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
        t.amount.includes(query)
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

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(value));
  };

  const formatDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString();
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setEditingTransaction(null);
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Monthly Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a month" />
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
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Date {sortConfig?.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('description')}
                  >
                    Description {sortConfig?.key === 'description' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('category')}
                  >
                    Category {sortConfig?.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {sortConfig?.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: Transaction, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTransactions; 