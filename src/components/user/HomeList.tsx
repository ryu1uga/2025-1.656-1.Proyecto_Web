import { Navigate, useNavigate } from "react-router-dom";
import type { juego } from "./HomeJuego";
import "./HomeList.css";

interface Propsjuegos {
  juegos: juego[];
  promedio: (ratings: { rating: number }[]) => number;
};

const HomeList=({ juegos,promedio }: Propsjuegos)=> {
    const navigate = useNavigate();

         return (
            <div className="mt-5">
            <div id="tipodetop"></div>
            <div id="TablaJuegos" className="d-flex flex-wrap gap-3 justify-content-center mt-3">
                {juegos.map((juego, index) => (
                <div
                    className="card mt-2"
                    style={{ width: "11rem", height: "15rem", cursor: "pointer" }}
                    key={index}
                    onClick={() => navigate("/user/juego", { state: { juego } })} // Enviar juego como estado
                >
                    <img
                    className="card-img-top bg-secondary"
                    alt="Placeholder"
                    style={{ height: "140px" }}
                    src={juego.attachment?.url || "https://via.placeholder.com/140x140?text=Sin+imagen"}    
                    />
                    <div className="card-body text-secondary d-flex flex-column justify-content-between">
                        <h6 className="card-title fw-bold text-center">{juego.name}</h6>
                         <div className="d-flex justify-content-between px-1 mt-auto">
                            <p className="card-text mb-1" style={{ fontSize: "0.8rem" }}>
                                <strong>Ventas:</strong> {juego.sells.length}
                            </p>
                            <p className="card-text mb-1" style={{ fontSize: "0.8rem" }}>
                                <strong>Rating:</strong> {promedio(juego.ratings).toFixed(1)}
                            </p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        );
};
                

export default HomeList