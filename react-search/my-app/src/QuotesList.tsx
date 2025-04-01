type Props = {
  quotes: string[];
};

export function QuotesList({ quotes }: Props) {
  return (
    <div className="quotes-list">
      {quotes.length === 0 ? (
        <div>No quotes match your search.</div>
      ) : (
        quotes.map((quote, index) => <li key={index}>{quote}</li>)
      )}
    </div>
  );
}
