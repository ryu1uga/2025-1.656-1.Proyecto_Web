import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmoEmail.css';

const ConfirmadoEmail: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="logo">📷</div> 
      <h1>¡Verificación exitosa!</h1>
      <p className="message">
        Tu identidad ha sido confirmada con éxito. Ahora puedes proceder a iniciar sesión.
      </p>
      <button className="btn-primary" onClick={handleLoginRedirect}>
        Iniciar sesión
      </button>
      <div className="link-container">
        <a href="#" className="link" onClick={() => navigate(-1)}>
          ¿Problemas para iniciar sesión? Volver
        </a>
      </div>
    </div>
  );
};

export default ConfirmadoEmail;