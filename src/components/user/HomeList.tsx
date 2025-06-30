import { Navigate, useNavigate } from "react-router-dom";
import type { juego } from "./HomeJuego";

interface Propsjuegos {
  juegos: juego[];
};

const HomeList=({ juegos }: Propsjuegos)=> {
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
                    src="..."
                    />
                    <div className="card-body">
                    <h6 className="card-title fw-bold">{juego.name}</h6>
                    </div>
                </div>
                ))}
            </div>
            </div>
        );
};
                

export default HomeList