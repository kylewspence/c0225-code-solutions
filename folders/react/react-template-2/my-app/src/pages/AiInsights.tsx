import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const AiInsights = () => {
  const [question, setQuestion] = useState('');

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">AI Insights</h1>

      {/* AI Insights Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Spending Insight</p>
            <p className="text-base italic mt-2">
              “You’ve spent 40% more on food delivery this month compared to
              last.”
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Investment Insight</p>
            <p className="text-base italic mt-2">
              “Your tech investments are outperforming others by 12%.”
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ask the AI */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Ask the AI</h2>
          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about your finances..."
            />
            <Button disabled={!question}>Ask</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiInsights;
