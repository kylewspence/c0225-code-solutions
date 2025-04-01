/* eslint-disable @typescript-eslint/no-unused-vars -- Remove me */

import { useState, useRef } from 'react';
import { Pokemon, PokemonList } from './PokemonList';
import { FetchPokemon } from './Fetch';
import { GenerateQuiz, GenerateQuizHandle } from './GenerateQuiz';
import './App.css';
import { FaTrash } from 'react-icons/fa';
import { TrashCan } from './Trashcan';


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

  // Create a ref for GenerateQuiz so we can call its generateQuiz method.
  const quizRef = useRef<GenerateQuizHandle>(null);


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


  // This button in the navbar calls the generateQuiz method in GenerateQuiz.
  function handleGenerateQuiz() {
    if (quizRef.current) {
      quizRef.current.generateQuiz();
    }
  }

  return (
    <div id="root">
      <nav className="navbar">
        <button onClick={() => handleAdd(addPokemon)}>Add</button>
        <button onClick={() => handleUpdate(updatePokemon)}>Update</button>
        <button onClick={() => handleRemove(removePokemon.id)}>
          <FaTrash />
        </button>
        <TrashCan onDropPokemon={(id) => handleRemove(id)} />
        <FetchPokemon
          usedNames={pokedex.map((p) => p.name)}
          onAdd={(name) => handleAdd({ id: Date.now(), name })}
        />
        {/* Generate Quiz button in the navbar */}
        <button onClick={handleGenerateQuiz}>Generate Quiz</button>
      </nav>
      <div className="content">
        <div className="pokedex-container">
          <PokemonList pokedex={pokedex} />
        </div>
        {/* Quiz content appears in its own container */}
        <div className="quiz-container">
          <GenerateQuiz ref={quizRef} pokedex={pokedex} />
        </div>
      </div>
    </div>
  );
}

export default App;

  return (
    <div>
      <PokemonList pokedex={pokedex} />
      <button onClick={() => handleAdd(addPokemon)}>Add</button>
      <button onClick={() => handleUpdate(updatePokemon)}>Update</button>
      <button onClick={() => handleRemove(removePokemon.id)}>Remove</button>
    </div>
  );
}

