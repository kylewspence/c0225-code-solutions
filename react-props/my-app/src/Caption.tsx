type Cap = {
  text: string;
};

export function Caption({ text }: Cap) {
  return <h3>{text}</h3>;
}
