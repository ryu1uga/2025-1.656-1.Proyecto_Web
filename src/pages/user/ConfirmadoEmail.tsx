import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmadoEmail.css';

const ConfirmadoEmail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="ConfrmtdEmail-container">
      <div className="ConfrmtdEmail-card">
        <h1 className="ConfrmtdEmail-title">¡Verificación Exitosa!</h1>
        <p className="ConfrmtdEmail-message">
          Tu identidad ha sido confirmada con éxito. Ahora puedes iniciar sesión.
        </p>
        <button className="ConfrmtdEmail-button" onClick={() => navigate('/')}>
          Iniciar sesión
        </button>
        <div className="ConfrmtdEmail-link-container">
          <a className="ConfrmtdEmail-link" onClick={() => navigate('/register')}>
            ¿Problemas para iniciar sesión? Volver
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmadoEmail;
