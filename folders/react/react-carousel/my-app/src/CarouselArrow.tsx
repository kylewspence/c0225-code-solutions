import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

type CarouselArrowProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
};

export function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  return (
    <button className={`arrow ${direction}`} onClick={onClick}>
      {direction === 'prev' ? <SlArrowLeft /> : <SlArrowRight />}
    </button>
  );
}
