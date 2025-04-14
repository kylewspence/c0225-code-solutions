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
      <h1 className="text-3xl font-bold text-gray-800">AI Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-blue-100">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-gray-500">Spending Flag</p>
            <p className="text-base italic text-gray-700">
              "You've exceeded your average entertainment budget by 35% this
              month."
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-gray-500">
              Tax Optimization Tip
            </p>
            <p className="text-base italic text-gray-700">
              "Consider contributing to your HSA before the end of the fiscal
              year to reduce taxable income."
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-blue-100">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Ask the AI</h2>

          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about your finances..."
              className="bg-blue-50 border-blue-200 text-gray-800 placeholder:text-gray-500 focus:border-blue-300"
            />
            <AIRequester
              userInput={question}
              onResult={(res) => setResponse(res)}
              buttonText={
                <Button
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-6 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
                  Ask
                </Button>
              }
            />
          </div>

          {response && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
              <strong className="block mb-1 text-gray-800">AI Response:</strong>
              <p>{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AiInsights;
