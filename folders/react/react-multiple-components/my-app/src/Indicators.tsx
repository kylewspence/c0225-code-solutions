type IndicatorsProps = {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  className: string;
};

export function Indicators({
  total,
  currentIndex,
  onSelect,
  className,
}: IndicatorsProps) {
  const buttons = Array.from({ length: total }).map((_, index) => (
    <button
      key={index}
      onClick={() => onSelect(index)}
      className={`indicator-button ${index === currentIndex ? 'active' : ''}`}>
      {index + 1}
    </button>
  ));

  return <div className={className}>{buttons}</div>;
}
