import {
  FaCircle as SolidCircle,
  FaRegCircle as RegularCircle,
} from 'react-icons/fa';

type CarouselDotsProps = {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
};

export function CarouselDots({
  total,
  currentIndex,
  onDotClick,
}: CarouselDotsProps) {
  return (
    <>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} onClick={() => onDotClick(index)}>
          {index === currentIndex ? (
            <SolidCircle className="dot" />
          ) : (
            <RegularCircle className="dot" />
          )}
        </span>
      ))}
    </>
  );
}
