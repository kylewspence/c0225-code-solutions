// Move these functions from your components:
export function calculateMonthlyTotals(transactions: Transaction[]): Record<string, number> {...}
export function categoryBreakdown(transactions: Transaction[]): CategoryData[] {...}
export function filterTransactionsByDate(transactions: Transaction[], range: DateRange): Transaction[] {...}