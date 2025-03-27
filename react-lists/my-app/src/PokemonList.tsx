import { Pokemon } from './App';

type PokeProps = {
  pokedex: Pokemon[];
};

export function PokemonList({ pokedex }: PokeProps) {
  return (
    <ul>
      {pokedex.map((Pokemon) => (
        <li key={Pokemon.number}>{Pokemon.name}</li>
      ))}
    </ul>
  );
}
