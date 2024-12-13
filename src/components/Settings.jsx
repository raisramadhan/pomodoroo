import PropTypes from 'prop-types';

const Settings = ({ pomodoro, shortBreak, longBreak, setPomodoro, setShortBreak, setLongBreak, isTimerRunning }) => {
  return (
    <div className="text-center mt-8">
      <h2 className="text-3xl mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label>Pomodoro: </label>
          <input 
            type="number" 
            value={pomodoro} 
            onChange={(e) => !isTimerRunning && setPomodoro(Number(e.target.value))} 
            className={`border p-2 rounded text-black ${isTimerRunning ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            disabled={isTimerRunning}
          /> min
        </div>
        <div>
          <label>Short Break: </label>
          <input 
            type="number" 
            value={shortBreak} 
            onChange={(e) => !isTimerRunning && setShortBreak(Number(e.target.value))} 
            className={`border p-2 rounded text-black ${isTimerRunning ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            disabled={isTimerRunning}
          /> min
        </div>
        <div>
          <label>Long Break: </label>
          <input 
            type="number" 
            value={longBreak} 
            onChange={(e) => !isTimerRunning && setLongBreak(Number(e.target.value))} 
            className={`border p-2 rounded text-black ${isTimerRunning ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            disabled={isTimerRunning}
          /> min
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  pomodoro: PropTypes.number.isRequired,
  shortBreak: PropTypes.number.isRequired,
  longBreak: PropTypes.number.isRequired,
  setPomodoro: PropTypes.func.isRequired,
  setShortBreak: PropTypes.func.isRequired,
  setLongBreak: PropTypes.func.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
};

export default Settings;
