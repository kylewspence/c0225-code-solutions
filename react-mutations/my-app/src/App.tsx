/* eslint-disable @typescript-eslint/no-unused-vars -- Remove me */
import { useState } from 'react';
import { Pokemon, PokemonList } from './PokemonList';
import { FetchPokemon } from './Fetch';
import { GenerateQuiz } from './GenerateQuiz';

const initialPokedex: Pokemon[] = [
  { id: 1, name: 'Bulbasaur' },
  { id: 4, name: 'Charmander' },
  { id: 7, name: 'Squirtle' },
  { id: 25, name: 'Pikachu' },
  { id: 39, name: 'Jigglypuff' },
];

const addPokemon = { id: 40, name: 'Fakemon' };
const updatePokemon = { id: 25, name: 'Peek-a-boo' };
const removePokemon = { id: 4, name: 'Charmander' };

export function App() {
  const [pokedex, setPokedex] = useState(initialPokedex);

  function handleAdd(toAdd: Pokemon): void {
    setPokedex([...pokedex, toAdd]);
  }

  function handleUpdate(toUpdate: Pokemon): void {
    setPokedex(
      pokedex.map((pokemon) =>
        pokemon.id === toUpdate.id ? toUpdate : pokemon
      )
    );
  }

  function handleRemove(toRemove: number): void {
    setPokedex(pokedex.filter((pokemon) => pokemon.id !== toRemove));
  }

  return (
    <div>
      <PokemonList pokedex={pokedex} />
      <button onClick={() => handleAdd(addPokemon)}>Add</button>
      <button onClick={() => handleUpdate(updatePokemon)}>Update</button>
      <button onClick={() => handleRemove(removePokemon.id)}>Remove</button>
      <FetchPokemon
        usedNames={pokedex.map((p) => p.name)}
        onAdd={(name) => handleAdd({ id: Date.now(), name })}
      />
      {/* Other components for Pokémon features */}
      <GenerateQuiz pokedex={pokedex} />
    </div>
  );
}
