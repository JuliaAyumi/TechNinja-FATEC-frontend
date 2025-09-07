import './Button.css';

const Button = ({
  type = 'action',
  option,
  disabled = false,
  buttonType = 'button',
}) => {
  return (
    <button className={`button ${type}`} type={buttonType} disabled={disabled}>
      {option}
    </button>
  );
};

export default Button;
