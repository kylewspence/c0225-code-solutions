import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface InvestmentWidgetsProps {
  isMobile?: boolean;
}

const InvestmentWidgets = ({ isMobile = false }: InvestmentWidgetsProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-4">Watchlist:</p>
          <div className="max-h-[300px] overflow-y-auto pr-2">
            <div className="space-y-4">
              {[
                { symbol: 'PLTR', change: '+187.5%', data: [
                  { month: 'Jan 2023', amount: 8 },
                  { month: 'Feb 2023', amount: 9 },
                  { month: 'Mar 2023', amount: 9.5 },
                  { month: 'Apr 2023', amount: 10 },
                  { month: 'May 2023', amount: 12 },
                  { month: 'Jun 2023', amount: 10 },
                  { month: 'Jul 2023', amount: 11 },
                  { month: 'Aug 2023', amount: 14 },
                  { month: 'Sep 2023', amount: 13.5 },
                  { month: 'Oct 2023', amount: 15 },
                  { month: 'Nov 2023', amount: 17 },
                  { month: 'Dec 2023', amount: 16 },
                  { month: 'Jan 2024', amount: 18 },
                  { month: 'Feb 2024', amount: 19 },
                  { month: 'Mar 2024', amount: 20 },
                  { month: 'Apr 2024', amount: 21.5 },
                  { month: 'May 2024', amount: 22 },
                  { month: 'Jun 2024', amount: 23 },
                ]},
                { symbol: 'TSLA', change: '+64.86%', data: [
                  { month: 'Jan 2023', amount: 185 },
                  { month: 'Feb 2023', amount: 190 },
                  { month: 'Mar 2023', amount: 200 },
                  { month: 'Apr 2023', amount: 195 },
                  { month: 'May 2023', amount: 210 },
                  { month: 'Jun 2023', amount: 220 },
                  { month: 'Jul 2023', amount: 230 },
                  { month: 'Aug 2023', amount: 225 },
                  { month: 'Sep 2023', amount: 240 },
                  { month: 'Oct 2023', amount: 260 },
                  { month: 'Nov 2023', amount: 250 },
                  { month: 'Dec 2023', amount: 265 },
                  { month: 'Jan 2024', amount: 275 },
                  { month: 'Feb 2024', amount: 290 },
                  { month: 'Mar 2024', amount: 285 },
                  { month: 'Apr 2024', amount: 295 },
                  { month: 'May 2024', amount: 310 },
                  { month: 'Jun 2024', amount: 305 },
                ]},
                { symbol: 'NVDA', change: '+219.3%', data: [
                  { month: 'Jan 2023', amount: 200 },
                  { month: 'Feb 2023', amount: 220 },
                  { month: 'Mar 2023', amount: 240 },
                  { month: 'Apr 2023', amount: 280 },
                  { month: 'May 2023', amount: 320 },
                  { month: 'Jun 2023', amount: 400 },
                  { month: 'Jul 2023', amount: 440 },
                  { month: 'Aug 2023', amount: 480 },
                  { month: 'Sep 2023', amount: 440 },
                  { month: 'Oct 2023', amount: 420 },
                  { month: 'Nov 2023', amount: 480 },
                  { month: 'Dec 2023', amount: 520 },
                  { month: 'Jan 2024', amount: 580 },
                  { month: 'Feb 2024', amount: 620 },
                  { month: 'Mar 2024', amount: 640 },
                  { month: 'Apr 2024', amount: 660 },
                  { month: 'May 2024', amount: 680 },
                  { month: 'Jun 2024', amount: 700 },
                ]},
                { symbol: 'AMD', change: '+128.4%', data: [
                  { month: 'Jan 2023', amount: 60 },
                  { month: 'Feb 2023', amount: 65 },
                  { month: 'Mar 2023', amount: 70 },
                  { month: 'Apr 2023', amount: 85 },
                  { month: 'May 2023', amount: 95 },
                  { month: 'Jun 2023', amount: 110 },
                  { month: 'Jul 2023', amount: 115 },
                  { month: 'Aug 2023', amount: 105 },
                  { month: 'Sep 2023', amount: 100 },
                  { month: 'Oct 2023', amount: 110 },
                  { month: 'Nov 2023', amount: 120 },
                  { month: 'Dec 2023', amount: 130 },
                  { month: 'Jan 2024', amount: 145 },
                  { month: 'Feb 2024', amount: 155 },
                  { month: 'Mar 2024', amount: 165 },
                  { month: 'Apr 2024', amount: 170 },
                  { month: 'May 2024', amount: 175 },
                  { month: 'Jun 2024', amount: 180 },
                ]}
              ].map((stock) => (
                <div key={stock.symbol} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{stock.symbol}</h3>
                      <p className="text-green-600">{stock.change}</p>
                    </div>
                  </div>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stock.data}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">AI Insight</p>
          <p className="text-sm italic mb-4">
            "Your portfolio is kicking ass! Dont change a thing."
          </p>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/ai-insights">Explore AI Insights →</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Returns YTD:</p>
          <h3 className="text-xl font-bold text-green-700">$2,850</h3>
          <p className="text-xs text-muted-foreground">3%</p>
        </CardContent>
      </Card>
    </>
  );
};

export default InvestmentWidgets; 