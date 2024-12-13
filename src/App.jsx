import { useState } from 'react';
import Timer from './components/Timer';
import Settings from './components/Settings';
import ModeSwitch from './components/ModeSwitch';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState('Pomodoro');
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleTimeEnd = () => {
    if (mode === 'Pomodoro') {
      setMode('Short Break');
    } else if (mode === 'Short Break') {
      setMode('Long Break');
    } else if (mode === 'Long Break') {
      setMode('Pomodoro');
    }
    setIsTimerRunning(false);
  };

  const handleReset = () => {
    setMode('Pomodoro');
    setPomodoro(25); 
    setShortBreak(5);
    setLongBreak(15);
    setIsTimerRunning(false);
  };

  const handleNext = () => {
    if (mode === 'Pomodoro') {
      setMode('Short Break');
    } else if (mode === 'Short Break') {
      setMode('Long Break');
    } else if (mode === 'Long Break') {
      setMode('Pomodoro');
    }
    setIsTimerRunning(false);
  };

  const canStartTimer = () => {
    return (mode === 'Pomodoro' && pomodoro > 0) ||
           (mode === 'Short Break' && shortBreak > 0) ||
           (mode === 'Long Break' && longBreak > 0);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <ModeSwitch darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          <button 
            onClick={() => setIsSettingsOpen(true)} 
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
          >
            ⚙️
          </button>
        </div>
        {canStartTimer() ? (
          <Timer 
            mode={mode} 
            minutes={mode === 'Pomodoro' ? pomodoro : mode === 'Short Break' ? shortBreak : longBreak} 
            onTimeEnd={handleTimeEnd} 
            onReset={handleReset}  
            onNext={handleNext}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            canStartTimer={canStartTimer()}
          />
        ) : (
          <div className="text-center text-red-500">Please, set valid time for Pomodoro, Short Break, or Long Break.</div>
        )}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <Settings 
                pomodoro={pomodoro} 
                shortBreak={shortBreak} 
                longBreak={longBreak} 
                setPomodoro={setPomodoro} 
                setShortBreak={setShortBreak} 
                setLongBreak={setLongBreak} 
                isTimerRunning={isTimerRunning} 
              />
              <button 
                onClick={() => setIsSettingsOpen(false)} 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
