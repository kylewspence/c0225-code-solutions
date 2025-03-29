import { useState, useEffect } from 'react';

type Props = {
  name: string;
};

export function PokemonImage({ name }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        const data = await res.json();
        const url = data.sprites.other['official-artwork'].front_default;
        setImageUrl(url);
      } catch (err) {
        console.error('Error fetching Pokémon image:', err);
      }
    }

    fetchImage();
  }, [name]);

  return imageUrl ? (
    <img src={imageUrl} alt={name} style={{ width: '100px' }} />
  ) : (
    <p>Loading image for {name}...</p>
  );
}
