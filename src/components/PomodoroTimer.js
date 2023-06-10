import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './PomodoroTimer.css'; // Import custom CSS file for styling

import { TaskContext } from './TaskContext'; // Import the TaskContext

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500); // 1500 seconds = 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(1500); // Reset time to 25 minutes
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        {!isRunning && (
          <Button variant="success" onClick={handleStart}>
            Start
          </Button>
        )}
        {isRunning && (
          <>
            <Button variant="danger" onClick={handleStop}>
              Stop
            </Button>
            <Button variant="primary" onClick={handlePause}>
              Pause
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
