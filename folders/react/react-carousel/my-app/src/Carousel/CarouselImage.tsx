import { PokemonImage } from '../PokemonImage';

type CarouselImageProps = {
  alt: string; // Pokémon name
  isActive: boolean;
};

export function CarouselImage({ alt, isActive }: CarouselImageProps) {
  return (
    <div className={`image-wrapper ${isActive ? '' : 'hidden'}`}>
      <PokemonImage name={alt} />
      <h2>{alt}</h2>
    </div>
  );
}
