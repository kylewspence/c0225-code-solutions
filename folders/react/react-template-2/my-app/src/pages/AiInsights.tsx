import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AIRequester } from '../components/AIRequester';

const AiInsights = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  return (
    <div className="pt-24 px-8 space-y-8">
      <h1 className="text-3xl font-bold">AI Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Spending Flag</p>
            <p className="text-base italic">
              “You’ve exceeded your average entertainment budget by 35% this
              month.”
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Tax Optimization Tip
            </p>
            <p className="text-base italic">
              “Consider contributing to your HSA before the end of the fiscal
              year to reduce taxable income.”
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Ask the AI</h2>

          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about your finances..."
            />
            <AIRequester
              userInput={question}
              onResult={(res) => setResponse(res)}
              buttonText={
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md">
                  Ask
                </Button>
              }
            />
          </div>

          {response && (
            <div className="mt-4 p-4 bg-gray-50 border rounded text-sm">
              <strong className="block mb-1">AI Response:</strong>
              <p>{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AiInsights;
