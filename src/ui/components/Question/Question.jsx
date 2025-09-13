import './Question.css';

export default function Question({ title }) {
  return (
    <div className='question-block'>
      <h2 className='question-title'>{title}</h2>
    </div>
  );
}
