import { useMediaQuery } from '@/hooks/use-media-query';
import InvestmentsDesktop from './InvestmentsDesktop';
import InvestmentsMobile from './InvestmentsMobile';
import { Spotlight } from "@/components/ui/spotlight";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useState, useEffect } from 'react';

interface InvestmentsProps {
  data: any[];
}

const Investments = ({ data }: InvestmentsProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to ensure content is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="h-[100px]" />
          <Card className="h-[100px]" />
          <Card className="h-[100px]" />
          <Card className="h-[100px]" />
        </div>
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 space-y-4">
            <Card className="h-[200px]" />
            <Card className="h-[300px]" />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <Card className="h-[150px]" />
            <Card className="h-[150px]" />
          </div>
        </div>
      </div>
    );
  }

  return isDesktop ? <InvestmentsDesktop data={data} /> : <InvestmentsMobile data={data} />;
};

export default Investments; 