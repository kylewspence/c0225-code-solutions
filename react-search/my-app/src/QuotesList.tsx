type Props = {
  quotes: string[];
};

export function QuotesList({ quotes }: Props) {
  return (
    <ul>
      {quotes.map((index) => (
        <li key={index}></li>
      ))}
    </ul>
  );
}
