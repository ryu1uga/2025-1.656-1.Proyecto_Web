import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameAddPage.css";
import type { Game } from "../../../../components/admin/game/GameList";

const GameAddPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);
    const [trailers, setTrailers] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleAddPhoto = () => {
        setPhotos([...photos, "New Photo"]);
    };

    const handleDeletePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleAddTrailer = () => {
        setTrailers([...trailers, ""]);
    };

    const handleDeleteTrailer = (index: number) => {
        setTrailers(trailers.filter((_, i) => i !== index));
    };

    const handleTrailerChange = (index: number, value: string) => {
        const updated = [...trailers];
        updated[index] = value;
        setTrailers(updated);
    };

    const handleAddGame = () => {
        if (!name.trim()) return;

        const juegosAnterioresStr = localStorage.getItem("games");
        const juegos: Game[] = juegosAnterioresStr ? JSON.parse(juegosAnterioresStr) : [];

        // Obtener máximo id actual o 0 si no hay ninguno
        const maxId = juegos.reduce((max, juego) => (juego.id > max ? juego.id : max), 0);

        const nuevoJuego: Game = {
            id: maxId + 1,
            name: name.trim(),
            description,
            photos,
            trailers
        };

        juegos.push(nuevoJuego);
        localStorage.setItem("games", JSON.stringify(juegos));

        navigate("/admin/game");
    };

    const handleDiscard = () => {
        navigate("/admin/game");
    };

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h1 className="text-center">Add a New Game</h1>

                <input
                    className="form-control mb-3"
                    placeholder="Game Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    className="form-control mb-4"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <h4 className="text-center">Gallery</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {photos.map((photo, index) => (
                        <div key={index} className="d-flex flex-column align-items-center">
                            <div className="photo border p-3 m-2">{photo}</div>
                            <button className="btn btn-secondary mt-2" onClick={() => handleDeletePhoto(index)}>
                                Delete Photo
                            </button>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-primary" onClick={handleAddPhoto}>Add Photo</button>
                </div>

                <h4 className="text-center">Trailers</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {trailers.map((trailer, index) => (
                        <div key={index} className="text-center m-2">
                            <p>TRAILER {index + 1}</p>
                            <textarea
                                className="form-control"
                                value={trailer}
                                onChange={(e) => handleTrailerChange(index, e.target.value)}
                            />
                            <div className="mt-2">
                                <button className="btn btn-secondary me-2">Edit Trailer</button>
                                <button className="btn btn-secondary" onClick={() => handleDeleteTrailer(index)}>
                                    Delete Trailer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-primary" onClick={handleAddTrailer}>Add Trailer</button>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btn-success" onClick={handleAddGame}>Add</button>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btn-secondary me-2" onClick={handleDiscard}>Discard</button>
                </div>
            </div>
        </div>
    );
};

export default GameAddPage;