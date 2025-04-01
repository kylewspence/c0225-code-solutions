import { useState } from 'react';

type Props = {
  captions: string[];
};

export function Caption({ captions }: Props) {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex((index + 1) % captions.length);
  }

  return <h3 onClick={handleClick}>{captions[index]}</h3>;
}
