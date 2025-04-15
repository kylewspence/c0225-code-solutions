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

  // Sample spending data
  const spendingData = [
    // January 2024
    { id: '1', date: '2024-01-01', category: 'Groceries', amount: '1205.50' },
    { id: '2', date: '2024-01-02', category: 'Transportation', amount: '450.00' },
    { id: '3', date: '2024-01-03', category: 'Entertainment', amount: '752.50' },
    { id: '4', date: '2024-01-04', category: 'Utilities', amount: '1500.00' },
    { id: '5', date: '2024-01-05', category: 'Dining', amount: '657.50' },
    { id: '6', date: '2024-01-06', category: 'Shopping', amount: '2000.00' },
    { id: '7', date: '2024-01-07', category: 'Healthcare', amount: '855.00' },
    { id: '8', date: '2024-01-08', category: 'Education', amount: '3000.00' },
    { id: '9', date: '2024-01-09', category: 'Travel', amount: '5000.00' },
    { id: '10', date: '2024-01-10', category: 'Groceries', amount: '952.50' },
    // December 2023
    { id: '11', date: '2023-12-01', category: 'Groceries', amount: '1350.75' },
    { id: '12', date: '2023-12-05', category: 'Shopping', amount: '2500.00' }, // Holiday shopping
    { id: '13', date: '2023-12-10', category: 'Entertainment', amount: '850.00' },
    { id: '14', date: '2023-12-15', category: 'Travel', amount: '3500.00' }, // Holiday travel
    { id: '15', date: '2023-12-20', category: 'Dining', amount: '1200.00' },
    { id: '16', date: '2023-12-25', category: 'Gifts', amount: '2000.00' },
    // November 2023
    { id: '17', date: '2023-11-01', category: 'Utilities', amount: '1450.00' },
    { id: '18', date: '2023-11-10', category: 'Healthcare', amount: '950.00' },
    { id: '19', date: '2023-11-15', category: 'Education', amount: '2800.00' },
    { id: '20', date: '2023-11-20', category: 'Transportation', amount: '550.00' },
    { id: '21', date: '2023-11-25', category: 'Shopping', amount: '1800.00' }, // Black Friday
    // October 2023
    { id: '22', date: '2023-10-01', category: 'Rent', amount: '2500.00' },
    { id: '23', date: '2023-10-05', category: 'Groceries', amount: '1150.25' },
    { id: '24', date: '2023-10-10', category: 'Entertainment', amount: '650.00' },
    { id: '25', date: '2023-10-15', category: 'Healthcare', amount: '750.00' },
    { id: '26', date: '2023-10-31', category: 'Entertainment', amount: '450.00' }, // Halloween
    // September 2023
    { id: '27', date: '2023-09-01', category: 'Education', amount: '3200.00' }, // Back to school
    { id: '28', date: '2023-09-05', category: 'Shopping', amount: '1500.00' },
    { id: '29', date: '2023-09-10', category: 'Travel', amount: '2800.00' },
    { id: '30', date: '2023-09-15', category: 'Dining', amount: '750.00' },
    // August 2023
    { id: '31', date: '2023-08-01', category: 'Utilities', amount: '1650.00' }, // Summer AC
    { id: '32', date: '2023-08-10', category: 'Entertainment', amount: '950.00' },
    { id: '33', date: '2023-08-15', category: 'Travel', amount: '4500.00' }, // Summer vacation
    { id: '34', date: '2023-08-20', category: 'Shopping', amount: '1200.00' },
    // July 2023
    { id: '35', date: '2023-07-01', category: 'Rent', amount: '2500.00' },
    { id: '36', date: '2023-07-04', category: 'Entertainment', amount: '850.00' }, // July 4th
    { id: '37', date: '2023-07-10', category: 'Groceries', amount: '1250.75' },
    { id: '38', date: '2023-07-15', category: 'Healthcare', amount: '650.00' },
    // June 2023
    { id: '39', date: '2023-06-01', category: 'Utilities', amount: '1400.00' },
    { id: '40', date: '2023-06-10', category: 'Entertainment', amount: '750.00' },
    { id: '41', date: '2023-06-15', category: 'Travel', amount: '3200.00' },
    { id: '42', date: '2023-06-20', category: 'Shopping', amount: '1100.00' },
    // May 2023
    { id: '43', date: '2023-05-01', category: 'Rent', amount: '2500.00' },
    { id: '44', date: '2023-05-05', category: 'Groceries', amount: '1150.25' },
    { id: '45', date: '2023-05-10', category: 'Healthcare', amount: '800.00' },
    { id: '46', date: '2023-05-15', category: 'Entertainment', amount: '550.00' },
    // April 2023
    { id: '47', date: '2023-04-01', category: 'Utilities', amount: '1300.00' },
    { id: '48', date: '2023-04-10', category: 'Education', amount: '2900.00' },
    { id: '49', date: '2023-04-15', category: 'Shopping', amount: '950.00' },
    { id: '50', date: '2023-04-20', category: 'Travel', amount: '2800.00' },
    // March 2023
    { id: '51', date: '2023-03-01', category: 'Rent', amount: '2500.00' },
    { id: '52', date: '2023-03-05', category: 'Groceries', amount: '1100.50' },
    { id: '53', date: '2023-03-15', category: 'Entertainment', amount: '600.00' },
    { id: '54', date: '2023-03-17', category: 'Dining', amount: '850.00' }, // St. Patrick's
    // February 2023
    { id: '55', date: '2023-02-01', category: 'Utilities', amount: '1450.00' },
    { id: '56', date: '2023-02-10', category: 'Healthcare', amount: '700.00' },
    { id: '57', date: '2023-02-14', category: 'Dining', amount: '950.00' }, // Valentine's
    { id: '58', date: '2023-02-20', category: 'Shopping', amount: '1300.00' },
    // January 2023
    { id: '59', date: '2023-01-01', category: 'Rent', amount: '2500.00' },
    { id: '60', date: '2023-01-05', category: 'Groceries', amount: '1050.25' },
    { id: '61', date: '2023-01-10', category: 'Entertainment', amount: '500.00' },
    { id: '62', date: '2023-01-15', category: 'Healthcare', amount: '600.00' }
  ];

  // Enhanced sample investments data with multiple assets and sectors
  const investmentsData = [
    {
      id: '1',
      date: '2024-01-01',
      value: '100000',
      return: '0',
      assets: [
        { name: 'AAPL', sector: 'Technology', shares: '50', price: '150.00', value: '7500' },
        { name: 'MSFT', sector: 'Technology', shares: '30', price: '250.00', value: '7500' },
        { name: 'JNJ', sector: 'Healthcare', shares: '40', price: '150.00', value: '6000' },
        { name: 'JPM', sector: 'Finance', shares: '25', price: '120.00', value: '3000' },
        { name: 'VTI', sector: 'ETF', shares: '100', price: '200.00', value: '20000' },
        { name: 'BND', sector: 'Bonds', shares: '200', price: '75.00', value: '15000' },
        { name: 'GLD', sector: 'Commodities', shares: '50', price: '180.00', value: '9000' },
        { name: 'REIT', sector: 'Real Estate', shares: '100', price: '25.00', value: '2500' },
      ]
    },
    {
      id: '2',
      date: '2024-01-02',
      value: '101500',
      return: '1.5',
      assets: [
        { name: 'AAPL', sector: 'Technology', shares: '50', price: '152.00', value: '7600' },
        { name: 'MSFT', sector: 'Technology', shares: '30', price: '252.00', value: '7560' },
        { name: 'JNJ', sector: 'Healthcare', shares: '40', price: '151.00', value: '6040' },
        { name: 'JPM', sector: 'Finance', shares: '25', price: '121.00', value: '3025' },
        { name: 'VTI', sector: 'ETF', shares: '100', price: '202.00', value: '20200' },
        { name: 'BND', sector: 'Bonds', shares: '200', price: '75.50', value: '15100' },
        { name: 'GLD', sector: 'Commodities', shares: '50', price: '181.00', value: '9050' },
        { name: 'REIT', sector: 'Real Estate', shares: '100', price: '25.50', value: '2550' },
      ]
    },
    {
      id: '3',
      date: '2024-01-03',
      value: '102000',
      return: '2.0',
      assets: [
        { name: 'AAPL', sector: 'Technology', shares: '50', price: '153.00', value: '7650' },
        { name: 'MSFT', sector: 'Technology', shares: '30', price: '253.00', value: '7590' },
        { name: 'JNJ', sector: 'Healthcare', shares: '40', price: '152.00', value: '6080' },
        { name: 'JPM', sector: 'Finance', shares: '25', price: '122.00', value: '3050' },
        { name: 'VTI', sector: 'ETF', shares: '100', price: '203.00', value: '20300' },
        { name: 'BND', sector: 'Bonds', shares: '200', price: '76.00', value: '15200' },
        { name: 'GLD', sector: 'Commodities', shares: '50', price: '182.00', value: '9100' },
        { name: 'REIT', sector: 'Real Estate', shares: '100', price: '26.00', value: '2600' },
      ]
    },
    {
      id: '4',
      date: '2024-01-04',
      value: '101000',
      return: '1.0',
      assets: [
        { name: 'AAPL', sector: 'Technology', shares: '50', price: '151.00', value: '7550' },
        { name: 'MSFT', sector: 'Technology', shares: '30', price: '251.00', value: '7530' },
        { name: 'JNJ', sector: 'Healthcare', shares: '40', price: '150.50', value: '6020' },
        { name: 'JPM', sector: 'Finance', shares: '25', price: '120.50', value: '3012.5' },
        { name: 'VTI', sector: 'ETF', shares: '100', price: '201.00', value: '20100' },
        { name: 'BND', sector: 'Bonds', shares: '200', price: '75.25', value: '15050' },
        { name: 'GLD', sector: 'Commodities', shares: '50', price: '180.50', value: '9025' },
        { name: 'REIT', sector: 'Real Estate', shares: '100', price: '25.25', value: '2525' },
      ]
    },
    {
      id: '5',
      date: '2024-01-05',
      value: '102500',
      return: '2.5',
      assets: [
        { name: 'AAPL', sector: 'Technology', shares: '50', price: '154.00', value: '7700' },
        { name: 'MSFT', sector: 'Technology', shares: '30', price: '254.00', value: '7620' },
        { name: 'JNJ', sector: 'Healthcare', shares: '40', price: '153.00', value: '6120' },
        { name: 'JPM', sector: 'Finance', shares: '25', price: '123.00', value: '3075' },
        { name: 'VTI', sector: 'ETF', shares: '100', price: '204.00', value: '20400' },
        { name: 'BND', sector: 'Bonds', shares: '200', price: '76.50', value: '15300' },
        { name: 'GLD', sector: 'Commodities', shares: '50', price: '183.00', value: '9150' },
        { name: 'REIT', sector: 'Real Estate', shares: '100', price: '26.50', value: '2650' },
      ]
    }
  ];

  // Store the data
  localStorage.setItem('spendingData', JSON.stringify(spendingData));
  localStorage.setItem('investmentsData', JSON.stringify(investmentsData));
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