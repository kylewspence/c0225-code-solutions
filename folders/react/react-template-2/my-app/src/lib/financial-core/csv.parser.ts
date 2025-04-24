// Move these functions from csv-storage.ts:
export function parseCSVData(data: string): Transaction[] {...}
export function normalizeAmount(value: any): number {...}
export function findMatchingKey(obj: Record<string, any>, patterns: string[]): string {...}
export function validateCSV(text: string): boolean {...}