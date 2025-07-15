import { useNavigate } from 'react-router-dom';
import './ResenaConfirm.css';

const ResenaConfirm = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="checkmark-circle">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h2 className="confirmation-title">¡Reseña enviada con éxito!</h2>
        <p className="confirmation-message">
          Gracias por compartir tu opinión. Tu reseña ha sido recibida y será publicada después de ser revisada.
        </p>
        <button 
          className="home-button"
          onClick={() => navigate('/user/home')}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ResenaConfirm;