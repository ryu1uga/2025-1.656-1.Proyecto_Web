import { useState } from "react";
import type { Game } from "./GameList";
import GameList from "./GameList";

interface GameAddProps {
    agregar: (juego: Game) => void;
}

const GameForm = ({ agregar }: GameAddProps) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    return (
        <div className="mt-3">
            <input
                className="form-control mb-2"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <textarea
                className="form-control mb-2"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <button
                className="btn btn-primary"
                onClick={() => {
                    if (nombre.trim() !== "") {
                        agregar({
                            id: GameList.length,
                            name: nombre.trim(),
                            description: descripcion.trim(),
                            photos: [],
                            trailers: [],
                        });
                        setNombre("");
                        setDescripcion("");
                    }
                }}
            >
                Agregar
            </button>
        </div>
    );
};

export default GameForm;