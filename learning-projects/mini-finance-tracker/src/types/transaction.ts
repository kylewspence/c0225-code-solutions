export type Transaction = {
    id: string;
    amount: number;
    date: string;
    description: string;
    category: string;
    type: TransactionType;
};

export type TransactionType = 'income' | 'expense';