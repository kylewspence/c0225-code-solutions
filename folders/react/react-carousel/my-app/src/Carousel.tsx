import { useState, useEffect } from 'react';
import { Image } from './App';
import { CarouselArrow } from './CarouselArrow';
import { CarouselDots } from './CarouselDots';
import { CarouselImage } from './CarouselImage';
import './Carousel.css';

type CarouselProps = {
  images: Image[];
};

export function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, resetKey]);

  function handlePrevClick() {
    setResetKey((prev) => prev + 1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setResetKey((prev) => prev + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  return (
    <div className="carousel">
      <div className="carousel-images">
        {images.map((image, index) => (
          <CarouselImage
            key={index}
            src={image.src}
            alt={image.alt}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      <CarouselArrow direction="prev" onClick={handlePrevClick} />

      <CarouselArrow direction="next" onClick={handleNextClick} />

      <div className="dots-container">
        <CarouselDots
          total={images.length}
          currentIndex={currentIndex}
          onDotClick={(index) => {
            setResetKey((prev) => prev + 1);
            setCurrentIndex(index);
          }}
        />
      </div>
    </div>
  );
}
