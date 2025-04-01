import './App.css';
import RockerSwitch from './RockerSwitch';
import './RockerSwitch.css';
import ToggleSwitch from './ToggleSwitch';
import './ToggleSwitch.css';
import { useState } from 'react';

function App() {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <ToggleSwitch isOn={isOn} toggle={() => setIsOn((prev) => !prev)} />
      <RockerSwitch isOn={isOn} toggle={() => setIsOn((prev) => !prev)} />
    </>
  );
}

export default App;
