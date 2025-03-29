type Props = {
  userInput: string;
  onResult: (result: string) => void;
};

export function AIRequester({ userInput, onResult }: Props) {
  async function handleClick() {
    console.log('Clicked! Used Names:', userInput);
    // 1. Construct prompt
    const prompt = `You are a general purpose AI requester accepting ${userInput} as your request.`;

    // 2. Make the fetch call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    // 3. Parse the response
    const data = await response.json();
    const name = data.choices[0].message.content.trim();
    onResult(name);
    console.log('Data:', data);
  }
  return <button onClick={handleClick}>AI Request</button>;
}
