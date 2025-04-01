// App.tsx
import type { Topic } from './Accordion';
import { useState } from 'react';
import { Accordion } from './Accordion';
import './App.css';

const topics: Topic[] = [
  {
    id: 1,
    title: 'Hypertext Markup Language',
    content:
      'Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser...',
  },
  {
    id: 3,
    title: 'Cascading Style Sheets',
    content:
      'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document...',
  },
  {
    id: 9,
    title: 'JavaScript',
    content:
      'JavaScript is a high-level, interpreted scripting language that conforms to the ECMAScript specification...',
  },
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`app-container ${theme}`}>
      <h1>My Accordion</h1>
      <Accordion topics={topics} />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default App;
