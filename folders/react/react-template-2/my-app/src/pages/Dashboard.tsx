import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import FileUploadSheet from '@/components/FileUploadSheet';
import Spending from '@/components/Spending';
import InvestmentsDesktop from '@/components/InvestmentsDesktop';
import MonthlyTransactions from '@/components/MonthlyTransactions';
import TokenCounter from '@/components/TokenCounter';

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('spending');

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <TokenCounter />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <FileUploadSheet />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="spending" className="space-y-6">
          <Spending />
        </TabsContent>
        <TabsContent value="investments" className="space-y-6">
          <InvestmentsDesktop />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-6">
          <MonthlyTransactions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;