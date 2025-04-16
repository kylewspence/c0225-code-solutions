// Sample CSV data for investments
const SAMPLE_INVESTMENTS_CSV = `date,value,return
2024-01-01,100000,0
2024-01-15,101200,1.2
2024-02-01,102500,2.5
2024-02-15,103800,3.8
2024-03-01,105000,5.0
2024-03-15,106200,6.2
2024-04-01,107500,7.5`;

// Sample CSV data for spending
const SAMPLE_SPENDING_CSV = `date,category,amount
2024-01-01,Dining,120
2024-01-05,Groceries,85
2024-01-10,Entertainment,45
2024-01-15,Transportation,60
2024-01-20,Utilities,150
2024-01-25,Shopping,200`;

export const initializeSampleData = () => {
  // Check if data already exists
  if (localStorage.getItem('spendingData') && localStorage.getItem('investmentsData')) {
    return;
  }

  // Parse sample CSV data
  const parseCSV = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {} as Record<string, string>);
    });
  };

  // Store the parsed data
  localStorage.setItem('spendingData', JSON.stringify(parseCSV(SAMPLE_SPENDING_CSV)));
  localStorage.setItem('investmentsData', JSON.stringify(parseCSV(SAMPLE_INVESTMENTS_CSV)));
};

export const getInvestmentsData = () => {
  const data = localStorage.getItem('investmentsData');
  if (!data) {
    initializeSampleData();
    return JSON.parse(localStorage.getItem('investmentsData') || '[]');
  }
  return JSON.parse(data);
};

export const getSpendingData = () => {
  const data = localStorage.getItem('spendingData');
  if (!data) {
    initializeSampleData();
    return JSON.parse(localStorage.getItem('spendingData') || '[]');
  }
  return JSON.parse(data);
};

export const updateInvestmentsData = (newData: string) => {
  localStorage.setItem('investments', newData);
};

export const updateSpendingData = (newData: string) => {
  localStorage.setItem('spending', newData);
};

export function exportInvestmentsData(): string {
  const data = getInvestmentsData();
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  data.forEach((row: Record<string, string>) => {
    const values = headers.map(header => row[header]);
    csvRows.push(values.join(','));
  });
  
  return csvRows.join('\n');
}

export function exportSpendingData(): string {
  const data = getSpendingData();
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  
  data.forEach((row: Record<string, string>) => {
    const values = headers.map(header => row[header]);
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