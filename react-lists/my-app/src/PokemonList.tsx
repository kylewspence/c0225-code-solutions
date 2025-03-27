import { Pokemon } from './App';

type PokeProps = {
  pokedex: Pokemon[];
};

export function PokemonList({ pokedex }: PokeProps) {
  return (
    <ul>
      {pokedex.map((pokemon) => (
        <li key={pokemon.number}>{pokemon.name}</li>
      ))}
    </ul>
  );
}
