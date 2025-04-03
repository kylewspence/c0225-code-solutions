// import { useEffect, useState } from 'react';
// import './Carousel.css';
// import { CarouselImage } from './CarouselImage';
// import { Dots } from './Dots';
// // import { NextButton } from './NextButton';
// // import { PrevButton } from './PrevButton';

// export type Image = {
//   src: string;
//   alt: string;
// };

// type Props = {
//   images: Image[];
// };

// export function Carousel({ images }: Props) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Reset interval every time currentIndex changes
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [currentIndex, images]);

//   function handleNext() {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   }

//   function handlePrevious() {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   }

//   return (
//     <div className="carousel">
//       <PrevButton onCustomClick={handlePrevious} />
//       <CarouselImage currentImage={images[currentIndex]} />
//       <NextButton onCustomClick={handleNext} />
//       <Dots currentIndex={currentIndex} numDots={images.length} />
//     </div>
//   );
// }
