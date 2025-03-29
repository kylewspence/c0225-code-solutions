import { useState } from 'react';

type Pokemon = {
  id: number;
  name: string;
};

type Props = {
  pokedex: Pokemon[];
};

async function fetchQuiz(prompt: string): Promise<string> {
  const key1 = 'sk-proj-7vyDO4PFulA9RzJM_KxUIZtVTUOmdlNR7Oy8D';
  const key2 = 'q1a8rQtNWWnRJ3rRtrmGJu808dnJveOjer0dVT3BlbkFJI';
  const key3 = 'uqxWfNJ9rai7axHkcNhLUvJVSW1f-pksYl4jIt8Dvq9eeFM';
  const key4 = 'vzFw4qYu-CcieFlcaznL-43CIA';

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
  console.log(response);
  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export function GenerateQuiz({ pokedex }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quizConfig, setQuizConfig] = useState<any | null>(null);
  const [randomPokemon, setRandomPokemon] = useState('Pikachu');

  async function handleClick() {
    const name =
      pokedex[Math.floor(Math.random() * pokedex.length)]?.name ?? 'Pikachu';
    setRandomPokemon(name);
    const prompt = `
Create a multiple-choice quiz question about the Pokémon ${name}.
Format it as valid JSON:
{
  "title": "Quiz on ${name}",
  "question": "string",
  "choices": ["string", "string", "string", "string"],
  "answer": "string"
}
Respond only with valid JSON.
`;

    try {
      const result = await fetchQuiz(prompt);
      const parsed = JSON.parse(result);
      setQuizConfig(parsed);
    } catch (err) {
      console.error('Failed to fetch or parse result:', err);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Generate Quiz</button>
      {quizConfig && (
        <div>
          <p>
            <strong>Topic:</strong> {randomPokemon}
          </p>
          <h2>{quizConfig.title}</h2>
          <p>{quizConfig.question}</p>
          <ul>
            {quizConfig.choices.map((choice: string) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
          <small>Answer: {quizConfig.answer}</small>
        </div>
      )}
    </div>
  );
}
