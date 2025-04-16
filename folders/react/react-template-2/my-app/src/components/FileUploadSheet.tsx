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
import { useToast } from '@/components/ui/use-toast';
import { parseCSVData } from '@/lib/csv-storage';

const FileUploadSheet = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      parseCSVData(text);
      
      toast({
        title: 'Success',
        description: 'File uploaded and processed successfully.',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'Failed to process the file. Please check the format and try again.',
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
          <SheetTitle>Upload Data</SheetTitle>
          <SheetDescription>
            Upload your financial data in CSV format.
            <br />
            The file should include columns for date, description, category, and amount.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FileUploadSheet; 