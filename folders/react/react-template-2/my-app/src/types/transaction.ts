export interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'Payment' | 'Return' | 'Purchase';
} 