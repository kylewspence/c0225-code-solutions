import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

export function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  function handleToggle() {
    if (!isPlaying) {
      const id = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
      setIsPlaying(true);
    } else {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
        setIntervalId(undefined);
      }
      setIsPlaying(false);
    }
  }
  return (
    <div className="stopwatch">
      <div
        className="watch-face"
        onClick={() => {
          if (!isPlaying) {
            setElapsedTime(0);
          }
        }}>
        {elapsedTime}s
      </div>
      <button onClick={handleToggle}>
        {isPlaying ? (
          <FaPause size="2rem" className="start-stop" />
        ) : (
          <FaPlay size="2rem" className="start-stop" />
        )}
      </button>
    </div>
  );
}
