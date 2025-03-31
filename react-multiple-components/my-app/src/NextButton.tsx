type ButtonProps = {
  onClick: () => void;
  className: string;
};

export function NextButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Next</button>;
}
