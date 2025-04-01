import { useState } from 'react';

type Props = {
  descriptions: string[];
};
export function Description({ descriptions }: Props) {
  const [index, setIndex] = useState(0);

  return <p onClick={() => setIndex(index + 1)}>{descriptions[index]}</p>;
}
