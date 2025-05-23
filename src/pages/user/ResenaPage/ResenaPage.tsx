import { useNavigate } from 'react-router-dom';
import './ResenaPage.css';

const ResenaPage = () => {
    const navigate = useNavigate()
    return (
        <div className="rp-container">
            <h1 className="rp-title">Nombre del Juego</h1>
            
            <h3 className="rp-section-title">Trailer</h3>
            <div className="rp-video-container">
                <span>Video</span>
            </div>
            
            <h3 className="rp-section-title">Imagenes del Gameplay</h3>
            <div className="rp-scroll">
                <div className="rp-image">Imagen 1</div>
                <div className="rp-image">Imagen 2</div>
                <div className="rp-image">Imagen 3</div>
                <div className="rp-image">Imagen 4</div>
            </div>
            
            <div className="rp-review-section">
                <h3 className="rp-section-title">Deja tu reseña</h3>
                <textarea className="rp-textarea" placeholder="Escribe tu comentario aquí"></textarea>
                
                <div className="rp-buttons">
                    <button className="rp-button rp-button-back">Volver</button>
                    <button className="rp-button rp-button-send" onClick={() => navigate("/user/resenaconfirm")}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default ResenaPage;