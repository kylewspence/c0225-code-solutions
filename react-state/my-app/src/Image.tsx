import './Image.css';
import { useState } from 'react';

type Props = {
  srcs: string[];
};
export function Image({ srcs }: Props) {
  const [index, setIndex] = useState(0);
  return (
    <div className="d-flex justify-content-center">
      <div className="width-50 ">
        <img
          className="image-fill"
          src={srcs[index]}
          alt="space-image"
          onClick={() => setIndex((index + 1) % srcs.length)}
        />
      </div>
    </div>
  );
}
