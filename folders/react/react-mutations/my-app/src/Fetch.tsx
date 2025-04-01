import { AIRequester } from './AIRequester';

type Props = {
  usedNames: string[];
  onAdd: (name: string) => void;
};

export function FetchPokemon({ usedNames, onAdd }: Props) {
  const prompt = `Give me one random Pokémon from Generation 1 whose name is not in this list: ${usedNames.join(
    ', '
  )}. Respond with only the name.`;

  return (
    <AIRequester
      userInput={prompt}
      onResult={onAdd}
      buttonText="Generate Pokemon"
    />
  );
}
