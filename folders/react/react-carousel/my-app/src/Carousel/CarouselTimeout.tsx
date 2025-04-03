// import { useCallback, useEffect, useState } from 'react';
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaCircle,
//   FaRegCircle,
// } from 'react-icons/fa';
// import './Carousel.css';

// export type Image = {
//   src: string;
//   alt: string;
// };

// type Props = {
//   images: Image[];
// };
// export function Carousel({ images }: Props) {
//   const [imageIndex, setImageIndex] = useState(0);

//   const nextImage = useCallback(() => {
//     const nextIndex = (imageIndex + 1) % images.length;
//     setImageIndex(nextIndex);
//   }, [images, imageIndex]);

//   const previousImage = useCallback(() => {
//     const previousIndex = (imageIndex - 1 + images.length) % images.length;
//     setImageIndex(previousIndex);
//   }, [images, imageIndex]);

//   useEffect(() => {
//     const timeoutHandle = setTimeout(nextImage, 3000);
//     return () => clearTimeout(timeoutHandle);
//   }, [nextImage]);

//   return (
//     <div className="carousel">
//       <PrevButton onClick={previousImage} />
//       <NextButton onClick={nextImage} />
//       <ImageCard image={images[imageIndex]} />
//       <Dots
//         numDots={images.length}
//         activeIndex={imageIndex}
//         onClick={(i) => setImageIndex(i)}
//       />
//     </div>
//   );
// }

// type NextProps = {
//   onClick: () => void;
// };
// function NextButton({ onClick }: NextProps) {
//   return (
//     <FaChevronRight onClick={onClick} className="next-image" size="2rem" />
//   );
// }

// type PrevProps = {
//   onClick: () => void;
// };
// function PrevButton({ onClick }: PrevProps) {
//   return (
//     <FaChevronLeft onClick={onClick} className="previous-image" size="2rem" />
//   );
// }

// type CardProps = {
//   image: Image;
// };
// function ImageCard({ image }: CardProps) {
//   const { src, alt } = image;
//   return (
//     <div className="image-wrapper">
//       <img className="current-image" src={src} alt={alt} />
//       <h2 className="image-caption">{alt}</h2>
//     </div>
//   );
// }

// type DotsProps = {
//   numDots: number;
//   activeIndex: number;
//   onClick: (index: number) => void;
// };
// /**
//  * An array of dots with the active dot solid and others hollow.
//  */
// function Dots({ numDots, activeIndex, onClick }: DotsProps) {
//   const images = [];
//   for (let i = 0; i < numDots; i++) {
//     const Icon = i === activeIndex ? FaCircle : FaRegCircle;
//     images.push(
//       <Icon key={i} onClick={() => onClick(i)} className="progress-dot" />
//     );
//   }
//   return <div className="progress-dots">{images}</div>;
// }
