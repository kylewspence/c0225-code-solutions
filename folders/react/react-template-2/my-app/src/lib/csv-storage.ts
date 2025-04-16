// Sample CSV data for investments
const SAMPLE_INVESTMENTS_CSV = `date,value,return
2024-01-01,100000,0
2024-01-15,101200,1.2
2024-02-01,102500,2.5
2024-02-15,103800,3.8
2024-03-01,105000,5.0
2024-03-15,106200,6.2
2024-04-01,107500,7.5`;

export const initializeSampleData = () => {
  // Check if investments data already exists
  if (localStorage.getItem('investmentsData')) {
    return;
  }

  // Store the parsed investments data
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
  if (!data) return [];
  
  try {
    const parsedData = JSON.parse(data);
    console.log('Retrieved data from storage:', parsedData); // Debug log
    
    // Map the Chase CC transaction format to our expected format
    const mappedData = parsedData
      .filter((item: any) => item['Transaction Date'] && item['Amount']) // Ensure required fields exist
      .map((item: any) => {
        // Remove currency symbols and handle negative amounts
        const rawAmount = item['Amount'].replace(/[^0-9.-]/g, '');
        const amount = item['Type'] === 'Return' ? rawAmount : `-${Math.abs(parseFloat(rawAmount))}`;
        
        return {
          date: item['Transaction Date'],
          category: item['Category'] || 'Uncategorized',
          amount: amount
        };
      });
    
    console.log('Mapped spending data:', mappedData); // Debug log
    return mappedData;
  } catch (error) {
    console.error('Error parsing spending data:', error);
    return [];
  }
};

export const updateInvestmentsData = (newData: string) => {
  const parsedData = parseCSV(newData);
  localStorage.setItem('investmentsData', JSON.stringify(parsedData));
};

export const updateSpendingData = (newData: string) => {
  try {
    console.log('Raw CSV data:', newData); // Debug log
    const lines = newData.trim().split('\n');
    console.log('Lines:', lines); // Debug log
    
    // Skip any header rows that don't match our expected format
    let headerIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Transaction Date') && lines[i].includes('Amount')) {
        headerIndex = i;
        break;
      }
    }
    
    const headers = lines[headerIndex].split(',').map(header => header.trim());
    console.log('Headers:', headers); // Debug log

    // Parse the CSV data starting after the headers
    const parsedData = lines.slice(headerIndex + 1)
      .filter(line => line.trim()) // Remove empty lines
      .map(line => {
        // Split by comma but handle potential commas within quotes
        const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
        const row: Record<string, string> = {};
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        return row;
      });

    console.log('Parsed data:', parsedData); // Debug log
    localStorage.setItem('spendingData', JSON.stringify(parsedData));
  } catch (error) {
    console.error('Error parsing spending data:', error);
    throw new Error('Failed to parse spending data');
  }
};

const parseCSV = (csv: string) => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i] || '';
      return obj;
    }, {} as Record<string, string>);
  });
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
  
  const headers = ['date', 'category', 'amount'];
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