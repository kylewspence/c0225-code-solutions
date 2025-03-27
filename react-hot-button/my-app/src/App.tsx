import { useState } from 'react';
import './App.css';
import { Button } from './Button';

export function App() {
  const [count, setCount] = useState(0);
  const colors = ['purple', 'light-purple', 'red', 'orange', 'yellow', 'white'];
  const colorIndex = Math.min(Math.floor(count / 3), colors.length - 1);
  const currentColor = colors[colorIndex];

  return (
    <>
      <Button
        text="Hot Button"
        className={currentColor}
        onClick={() => {
          console.log('Clicked');
          setCount(count + 1);
        }}
      />
    </>
  );
}

export default App;
