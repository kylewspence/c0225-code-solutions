import { useState } from 'react';
import MagnifyingGlass from './search-solid.svg';
import './Search.css';

type Props = {
  quotes: string[];
};

export function UserSearch({ quotes }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = quotes.filter((quote) =>
    quote.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-bar">
      <div className="input-with-icon">
        <img src={MagnifyingGlass} alt="Search" className="input-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search quotes..."
        />
      </div>
      <ul>
        {filteredQuotes.map((quote, index) => (
          <li key={index}>{quote}</li>
        ))}
      </ul>
    </div>
  );
}
