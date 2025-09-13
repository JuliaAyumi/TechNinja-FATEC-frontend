import './Button.css';

const Button = ({
  type = 'action',
  option,
  disabled = false,
  buttonType = 'button',
  onClick,
}) => {
  return (
    <button
      className={`button ${type}`}
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
    >
      {option}
    </button>
  );
};

export default Button;
