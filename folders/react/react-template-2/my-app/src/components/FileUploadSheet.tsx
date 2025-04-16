import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateInvestmentsData, updateSpendingData } from '@/lib/csv-storage';

const FileUploadSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'investments' | 'spending'>('spending');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a CSV file.',
        variant: 'destructive',
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const text = await selectedFile.text();
      console.log('File content:', text); // Debug log

      if (uploadType === 'investments') {
        updateInvestmentsData(text);
      } else {
        updateSpendingData(text);
      }

      toast({
        title: 'Upload Successful',
        description: `Your ${uploadType} data has been updated.`,
      });

      // Dispatch a custom event to notify components of the update
      const event = new CustomEvent(`${uploadType}DataUpdated`);
      window.dispatchEvent(event);

      // Add a small delay before dispatching a second event
      setTimeout(() => {
        const secondEvent = new CustomEvent(`${uploadType}DataUpdated`);
        window.dispatchEvent(secondEvent);
      }, 100);

      setSelectedFile(null);
      setIsOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'There was an error processing your file.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Upload Data</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Financial Data</SheetTitle>
          <SheetDescription>
            Upload your Chase credit card transactions in CSV format.
            Make sure the CSV file includes the transaction date, category, and amount.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant={uploadType === 'spending' ? 'default' : 'outline'}
                onClick={() => setUploadType('spending')}
                className="flex-1"
              >
                Spending
              </Button>
              <Button
                variant={uploadType === 'investments' ? 'default' : 'outline'}
                onClick={() => setUploadType('investments')}
                className="flex-1"
              >
                Investments
              </Button>
            </div>
          </div>
          <Input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
          <Button onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FileUploadSheet; 