import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Investments from '@/components/Investments';
import Spending from '../components/Spending';
import FileUploadSheet from '@/components/FileUploadSheet';
import { exportInvestmentsData, exportSpendingData, downloadCSV, getInvestmentsData } from '@/lib/csv-storage';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';

const Dashboard = () => {
  const { toast } = useToast();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'investments' | 'spending'>('investments');
  const investmentsData = getInvestmentsData();

  const handleExport = (type: 'investments' | 'spending') => {
    const data = type === 'investments' ? exportInvestmentsData() : exportSpendingData();
    downloadCSV(data, `${type}-data.csv`);
    toast({
      title: 'Export Successful',
      description: `Your ${type} data has been exported.`,
    });
  };

  const handleUploadSuccess = () => {
    toast({
      title: `${uploadType === 'investments' ? 'Investments' : 'Spending'} Data Updated`,
      description: `Your ${uploadType} data has been successfully updated.`,
    });
    setIsUploadOpen(false);
  };

  const handleCancel = () => {
    setIsUploadOpen(false);
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="investments" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
          </TabsList>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setUploadType('investments');
                setIsUploadOpen(true);
              }}
            >
              Upload Investments
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setUploadType('spending');
                setIsUploadOpen(true);
              }}
            >
              Upload Spending
            </Button>
          </div>
        </div>
        <TabsContent value="investments">
          <Investments data={investmentsData} />
        </TabsContent>
        <TabsContent value="spending">
          <Spending onExport={() => handleExport('spending')} />
        </TabsContent>
      </Tabs>
      <FileUploadSheet
        isOpen={isUploadOpen}
        onClose={handleCancel}
        onSuccess={handleUploadSuccess}
        type={uploadType}
      />
      <Toaster />
    </div>
  );
};

export default Dashboard;