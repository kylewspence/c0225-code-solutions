type CarouselImageProps = {
  src: string;
  alt: string;
  isActive: boolean;
};

export function CarouselImage({ src, alt, isActive }: CarouselImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`carousel-image ${isActive ? '' : 'hidden'}`}
    />
  );
}
