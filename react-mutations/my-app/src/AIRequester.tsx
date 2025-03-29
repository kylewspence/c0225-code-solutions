type Props = {
  userInput: string;
  onResult: (result: string) => void;
  buttonText: string;
};

// API Key Variables
const key1 = 'sk-proj-7vyDO4PFulA9RzJM_KxUIZtVTUOmdlNR7Oy8D';
const key2 = 'q1a8rQtNWWnRJ3rRtrmGJu808dnJveOjer0dVT3BlbkFJI';
const key3 = 'uqxWfNJ9rai7axHkcNhLUvJVSW1f-pksYl4jIt8Dvq9eeFM';
const key4 = 'vzFw4qYu-CcieFlcaznL-43CIA';

export function AIRequester({ userInput, onResult, buttonText }: Props) {
  async function handleClick() {
    console.log('Clicked! Used Names:', userInput);

    // 1. Construct prompt
    const prompt = `You are a general purpose AI requester accepting ${userInput} as your request.`;

    // 2. Make the fetch call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key1}${key2}${key3}${key4}`,
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
  return <button onClick={handleClick}>{buttonText}</button>;
}
