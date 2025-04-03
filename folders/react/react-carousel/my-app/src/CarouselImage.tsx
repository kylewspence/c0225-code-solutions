type CarouselImageProps = {
  src: string;
  alt: string;
  isActive: boolean;
};

export function CarouselImage({ src, alt, isActive }: CarouselImageProps) {
  return (
    <div className={`image-wrapper ${isActive ? '' : 'hidden'}`}>
      <img src={src} alt={alt} className={`carousel-image`} />
      <h2>{alt}</h2>
    </div>
  );
}
