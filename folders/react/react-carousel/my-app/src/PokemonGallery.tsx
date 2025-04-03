import { Carousel } from './Carousel/Carousel';

type Pokemon = {
  id: number;
  name: string;
};

type Props = {
  pokedex: Pokemon[];
};

export function PokemonGallery({ pokedex }: Props) {
  const images = pokedex.map((pokemon) => ({
    src: `/images/${pokemon.name.toLowerCase()}.webp`,
    alt: pokemon.name,
  }));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Pokémon Gallery</h3>
      <Carousel images={images} />
    </div>
  );
}
