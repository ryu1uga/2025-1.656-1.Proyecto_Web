import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameEditPage.css";
import type { Game } from "../../../../components/admin/game/GameList";

const GameEditPage = () => {
    const navigate = useNavigate();

    const stored = localStorage.getItem("selectedGame");
    const parsed: Game | null = stored ? JSON.parse(stored) : null;

    const [name, setName] = useState(parsed?.name || "");
    const [description, setDescription] = useState(parsed?.description || "");
    const [photos, setPhotos] = useState<string[]>(parsed?.photos || []);
    const [trailers, setTrailers] = useState<string[]>(parsed?.trailers || []);

    if (!parsed) {
        return <div className="container mt-4">No game selected to edit.</div>;
    }

    const handleSave = () => {
        const updatedGame: Game = {
            ...parsed,
            name: name.trim(),
            description: description.trim(),
            photos,
            trailers
        };

        const juegosStr = localStorage.getItem("games");
        const juegos: Game[] = juegosStr ? JSON.parse(juegosStr) : [];
        const actualizados = juegos.map(g => g.id === updatedGame.id ? updatedGame : g);

        localStorage.setItem("games", JSON.stringify(actualizados));
        localStorage.setItem("selectedGame", JSON.stringify(updatedGame));
        navigate("/admin/game");
    };

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

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h1 className="text-center">Edit Game</h1>

                <label htmlFor="gameName" className="form-label">Game Name</label>
                <input
                    id="gameName"
                    className="form-control mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="gameDescription" className="form-label">Description</label>
                <textarea
                    id="gameDescription"
                    className="form-control mb-4"
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
                                <button className="btn btn-secondary me-2" disabled>
                                    Edit Trailer
                                </button>
                                <button className="btn btn-secondary" onClick={() => handleDeleteTrailer(index)}>
                                    Delete Trailer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btn-primary" onClick={handleAddTrailer}>Add Trailer</button>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btn-success" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btn-secondary me-2" onClick={() => navigate("/admin/game")}>
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameEditPage;