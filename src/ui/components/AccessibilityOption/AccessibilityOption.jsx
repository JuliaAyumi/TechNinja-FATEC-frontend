import './AccessibilityOption.css';

const AccessibilityOption = ({ option, isEnabled, onToggle }) => {
  return (
    <div className='accessibility-option'>
      <span className='accessibility-option-text'>{option}</span>
      <div className='toggle-switch' onClick={onToggle}>
        <input
          type='checkbox'
          checked={isEnabled}
          onChange={onToggle}
          className='toggle-input'
        />
        <div className='toggle-slider'>
          <div className='toggle-knob'></div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityOption;
