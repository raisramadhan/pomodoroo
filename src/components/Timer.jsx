import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Timer = ({ mode, minutes, onTimeEnd, onReset, onNext, isTimerRunning, setIsTimerRunning, canStartTimer }) => {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [mode, minutes]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            playNotificationSound();  
            onTimeEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, onTimeEnd]);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3'); 
    audio.play();
  };

  const minutesLeft = Math.floor(secondsLeft / 60);
  const secondsLeftFormatted = secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60;

  const handleStartPause = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setSecondsLeft(minutes * 60);
    onReset();
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl mb-4">{mode}</h1>
      <div className="text-6xl font-mono">
        {minutesLeft}:{secondsLeftFormatted}
      </div>
      <div className="mt-4">
        <button 
          onClick={handleStartPause}
          className={`px-4 py-2 bg-blue-500 text-white rounded mr-2 ${!canStartTimer ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!canStartTimer}
        >
          {isTimerRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded mr-2"
        >
          Reset
        </button>
        <button 
          onClick={onNext}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

Timer.propTypes = {
  mode: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  onTimeEnd: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
  setIsTimerRunning: PropTypes.func.isRequired,
  canStartTimer: PropTypes.bool.isRequired,
};

export default Timer;
