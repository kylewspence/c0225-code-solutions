type ButtonProps = {
  onClick: () => void;
  className: string;
};

export function PrevButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Prev</button>;
}
