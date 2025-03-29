import { PokemonImage } from './PokemonImage';

export type Pokemon = {
  id: number;
  name: string;
};

export type Props = {
  pokedex: Pokemon[];
};

export function PokemonList({ pokedex }: Props) {
  console.log('pokedex', pokedex);
  return (
    <ul>
      {pokedex.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonImage name={pokemon.name} />
          <p>{pokemon.name}</p>
        </li>
      ))}
    </ul>
  );
}
