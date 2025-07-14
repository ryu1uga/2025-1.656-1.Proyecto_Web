import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PagoCarrito.css';
import { API_URL } from '../../../main';

const PagoCarrito = () => {
  const navigate = useNavigate();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = Number(sessionStorage.getItem("userId"));

      if (!userId || isNaN(userId)) {
        console.log("Usuario no identificado");
        return;
      }

      const response = await fetch(`${API_URL}/sells/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Compra exitosa:", result);
        setCompraExitosa(true);
        setTimeout(() => {
          navigate('/user/home');
        }, 2500);
      } else {
        console.error("Error del backend:", result.message || result);
        console.log("Ocurrió un error en el servidor. Intenta nuevamente.");
      }
    } catch (err) {
      console.error("Error de red:", err);
      console.log("Error de red. Verifica tu conexión.");
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">PAGO DE ITEMS</h1>

      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label className="form-label">Nombre Completo:</label>
          <input type="text" className="form-input" placeholder="Ingrese su nombre completo" required />
        </div>

        <div className="form-group">
          <label className="form-label">Dirección de correo:</label>
          <input type="email" className="form-input" placeholder="Ingrese su correo" required />
        </div>

        <div className="form-group">
          <label className="form-label">Número de tarjeta:</label>
          <input type="text" className="form-input" placeholder="0000 0000 0000 0000" required />
        </div>

        <div className="divider"></div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">CVC:</label>
            <input type="text" className="form-input" placeholder="123" required />
          </div>
          <div className="form-group">
            <label className="form-label">Fecha de Expiración:</label>
            <input type="text" className="form-input" placeholder="MM/AA" required />
          </div>
        </div>

        <button type="submit" className="btn proceed-btn">
          Proceder
        </button>
      </form>

      {compraExitosa && (
        <div className="popup-success">
          <h3>Compra realizada exitosamente</h3>
          <p>Serás redirigido al inicio...</p>
        </div>
      )}
    </div>
  );
};

export default PagoCarrito;

