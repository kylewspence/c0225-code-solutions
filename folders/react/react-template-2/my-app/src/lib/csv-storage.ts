import { Transaction } from '@/types/transaction';

export interface Investment {
  type: 'stock' | 'property';
  date: string;
  // Stock specific fields
  symbol?: string;
  shares?: number;
  price?: number;
  currentPrice?: number;
  // Property specific fields
  propertyAddress?: string;
  purchasePrice?: number;
  currentValue?: number;
  mortgage?: number;
  rate?: number;
  monthlyRent?: number;
  expenses?: number;
  // Common fields
  value?: number;
  change?: number;
}

// Sample CSV data for investments
const SAMPLE_INVESTMENTS_CSV = `type,date,symbol,shares,price,currentPrice,propertyAddress,purchasePrice,currentValue,mortgage,rate,monthlyRent,expenses
stock,2024-01-01,AAPL,100,190.50,195.20,,,,,,,,
stock,2024-01-01,MSFT,50,375.80,380.20,,,,,,,,
stock,2024-01-01,GOOGL,30,140.20,142.50,,,,,,,,
stock,2024-01-01,AMZN,40,155.30,158.40,,,,,,,,
stock,2024-01-01,NVDA,25,480.50,490.20,,,,,,,,
property,2024-01-01,,,,,123 Main St,450000,475000,350000,4.25,2800,800
property,2024-01-01,,,,,456 Oak Ave,380000,395000,290000,3.75,2400,650`;

const STORAGE_KEY = 'spendingData';

export const initializeSampleData = () => {
  if (localStorage.getItem('investmentsData')) {
    return;
  }
  const parsedData = parseCSV(SAMPLE_INVESTMENTS_CSV);
  localStorage.setItem('investmentsData', JSON.stringify(parsedData));
};

export const getInvestmentsData = (): Investment[] => {
  const data = localStorage.getItem('investmentsData');
  if (!data) {
    initializeSampleData();
    return JSON.parse(localStorage.getItem('investmentsData') || '[]');
  }

  const parsedData = JSON.parse(data);
  return parsedData.map((item: any): Investment => {
    if (item.type === 'stock') {
      const price = parseFloat(item.price) || 0;
      const shares = parseFloat(item.shares) || 0;
      const currentPrice = parseFloat(item.currentPrice) || price;
      return {
        type: 'stock',
        date: item.date || '',
        symbol: item.symbol || '',
        shares,
        price,
        currentPrice,
        value: shares * currentPrice,
        change: price ? ((currentPrice - price) / price) * 100 : 0
      };
    } else {
      const purchasePrice = parseFloat(item.purchasePrice) || 0;
      const currentValue = parseFloat(item.currentValue) || purchasePrice;
      return {
        type: 'property',
        date: item.date || '',
        propertyAddress: item.propertyAddress || '',
        purchasePrice,
        currentValue,
        mortgage: parseFloat(item.mortgage) || 0,
        rate: parseFloat(item.rate) || 0,
        monthlyRent: parseFloat(item.monthlyRent) || 0,
        expenses: parseFloat(item.expenses) || 0,
        value: currentValue,
        change: purchasePrice ? ((currentValue - purchasePrice) / purchasePrice) * 100 : 0
      };
    }
  });
};

// Generic CSV parser
const parseCSV = (csv: string, headerValidation?: (headers: string[]) => number) => {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];
  
  let headerIndex = 0;
  if (headerValidation) {
    headerIndex = headerValidation(lines);
  }
  
  const headers = lines[headerIndex].split(',').map(header => header.trim());
  return lines.slice(headerIndex + 1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i] || '';
        return obj;
      }, {} as Record<string, string>);
    });
};

// Validate spending data headers
const validateSpendingHeaders = (lines: string[]): number => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Transaction Date') && lines[i].includes('Amount')) {
      return i;
    }
  }
  throw new Error('Invalid spending data format');
};

export const updateSpendingData = (newData: string) => {
  try {
    const parsedData = parseCSV(newData, validateSpendingHeaders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
    window.dispatchEvent(new Event('spendingDataUpdated'));
  } catch (error) {
    console.error('Error parsing spending data:', error);
    throw new Error('Failed to parse spending data');
  }
};

export const updateInvestmentsData = (newData: string) => {
  const parsedData = parseCSV(newData);
  localStorage.setItem('investmentsData', JSON.stringify(parsedData));
  window.dispatchEvent(new Event('investmentsDataUpdated'));
};

// Standardize transaction processing
const processTransaction = (item: Record<string, string>): Transaction => {
  const rawAmount = item['Amount']?.replace(/[^0-9.-]/g, '') || '0';
  let amount = parseFloat(rawAmount);
  
  if (item['Type'] === 'Payment' || item['Type'] === 'Return') {
    amount = -Math.abs(amount);
  } else {
    amount = Math.abs(amount);
  }
  
  return {
    date: item['Transaction Date'] || new Date().toLocaleDateString(),
    description: item['Description'] || item['Post Date'] || 'No Description',
    category: item['Category'] || 'Uncategorized',
    amount,
    type: (item['Type'] as 'Payment' | 'Return' | 'Purchase') || 'Purchase'
  };
};

export const getSpendingData = async () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    const parsedData = JSON.parse(data);
    return parsedData
      .filter((item: Record<string, string>) => item['Transaction Date'] && item['Amount'])
      .map(processTransaction);
  } catch (error) {
    console.error('Error parsing spending data:', error);
    return [];
  }
};

export function exportInvestmentsData(): string {
  const data = getInvestmentsData();
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  data.forEach((row: Investment) => {
    const values = headers.map(header => String(row[header as keyof Investment] || ''));
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

export async function exportSpendingData(): Promise<string> {
  const data = await getSpendingData();
  if (!data || data.length === 0) return '';
  
  const headers = ['date', 'category', 'amount'];
  const csvRows = [headers.join(',')];
  
  data.forEach((transaction: Transaction) => {
    const values = headers.map(header => transaction[header as keyof Transaction]);
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

export function downloadCSV(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export function parseCSVData(newData: string): Transaction[] {
  try {
    const lines = newData.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(header => 
      header.trim().toLowerCase()
    );

    const parsedData = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        const item: Partial<Transaction> = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || '';
          if (header === 'amount') {
            // Remove currency symbols and convert to number
            const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
            item.amount = isNaN(numericValue) ? 0 : numericValue;
          } else if (header === 'type') {
            item.type = (value as 'Payment' | 'Return' | 'Purchase') || 'Purchase';
          } else if (header === 'date' || header === 'description' || header === 'category') {
            item[header] = value;
          }
        });

        // Ensure all required fields are present
        const transaction: Transaction = {
          date: item.date || new Date().toLocaleDateString(),
          description: item.description || 'Unknown',
          category: item.category || 'Uncategorized',
          amount: item.amount || 0,
          type: item.type || 'Purchase'
        };

        // Adjust amount sign based on transaction type
        if (transaction.type === 'Payment' || transaction.type === 'Return') {
          transaction.amount = -Math.abs(transaction.amount);
        } else {
          transaction.amount = Math.abs(transaction.amount);
        }

        return transaction;
      });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
    window.dispatchEvent(new Event('spendingDataUpdated'));
    return parsedData;
  } catch (error) {
    console.error('Error parsing spending data:', error);
    return [];
  }
}