type Props = {
  text: string;
  onClick: () => void;
  className: string;
};

export function Button({ text, onClick, className }: Props) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
