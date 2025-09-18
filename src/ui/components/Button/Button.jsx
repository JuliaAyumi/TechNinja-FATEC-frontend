import './Button.css';

const Button = ({
  type = 'action',
  option,
  disabled = false,
  buttonType = 'button',
  onClick,
  size = 'large',
}) => {
  return (
    <button
      className={`button ${type} ${size === 'small' ? 'small' : ''}`}
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
    >
      {option}
    </button>
  );
};

export default Button;
