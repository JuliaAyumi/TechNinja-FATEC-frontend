import './Points.css';

const Points = ({ points }) => {
  return (
    <div className='points-container'>
      <span className='points-value'>{points}</span>
      <span className='points-label'>pontos</span>
    </div>
  );
};

export default Points;
