import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          let { hours, minutes, seconds, milliseconds } = prevTime;

          milliseconds += 10;
          if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds += 1;
          }
          if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
          }
          if (minutes >= 60) {
            minutes = 0;
            hours += 1;
          }

          return { hours, minutes, seconds, milliseconds };
        });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startStop = () => {
    setRunning(!running);
  };

  const reset = () => {
    setRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    return `${String(time.hours).padStart(2, '0')}:
            ${String(time.minutes).padStart(2, '0')}:
            ${String(time.seconds).padStart(2, '0')}:
            ${String(Math.floor(time.milliseconds / 10)).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="time-display">
        {formatTime(time)}
      </div>
      <div className="controls">
        <button onClick={startStop}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={recordLap} disabled={!running}>Lap</button>
      </div>
      <div className="laps">
        {laps.length > 0 && <h2>Laps</h2>}
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
