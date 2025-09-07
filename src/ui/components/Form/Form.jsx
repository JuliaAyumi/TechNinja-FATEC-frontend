import './Form.css';

const Form = ({ type, placeholder, value, onChange, required = false, id }) => {
  return (
    <input
      className='form-input'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      id={id}
    />
  );
};

export default Form;
