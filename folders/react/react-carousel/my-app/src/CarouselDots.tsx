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
        <i
          key={index}
          className={`dot ${
            index === currentIndex ? 'fa-solid' : 'fa-regular'
          } fa-circle`}
          onClick={() => onDotClick(index)}
        />
      ))}
    </>
  );
}
