import { useState } from 'react';
import './RotatingBanner.css';
import { Banner } from './Banner';
import { NextButton } from './NextButton';
import { PrevButton } from './PrevButton';
import { Indicators } from './Indicators';

type Props = {
  items: string[];
};

export function RotatingBanner({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="rotating-banner">
      <Banner item={items[currentIndex]} className="banner-text" />
      <div className="controls-container">
        <PrevButton onClick={prev} className="nav-button" />
        <Indicators
          total={items.length}
          currentIndex={currentIndex}
          onSelect={goToIndex}
          className="indicators"
        />
        <NextButton onClick={next} className="nav-button" />
      </div>
    </div>
  );
}
