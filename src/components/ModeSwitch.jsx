import PropTypes from 'prop-types';

const ModeSwitch = ({ darkMode, toggleDarkMode }) => {
  return (
    <button 
      onClick={toggleDarkMode} 
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

// Add PropTypes validation
ModeSwitch.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default ModeSwitch;
