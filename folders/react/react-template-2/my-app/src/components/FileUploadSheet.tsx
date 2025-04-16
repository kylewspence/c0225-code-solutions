import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { updateInvestmentsData, updateSpendingData } from '@/lib/csv-storage';

interface FileUploadSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  type: 'investments' | 'spending';
}

const FileUploadSheet = ({ isOpen, onClose, onSuccess, type }: FileUploadSheetProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a CSV file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      const text = await file.text();
      if (type === 'investments') {
        updateInvestmentsData(text);
      } else {
        updateSpendingData(text);
      }
      onSuccess();
    } catch (error) {
      setError('Error processing file');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload {type === 'investments' ? 'Investments' : 'Spending'} Data</SheetTitle>
          <SheetDescription>
            Upload a CSV file containing your {type} data.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="file">CSV File</Label>
            <Input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FileUploadSheet; 