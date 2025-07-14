import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameEditPage.css";
import type { juego } from "../../../../components/user/HomeJuego";

const GameEditPage = () => {
    const navigate = useNavigate();
    const stored = sessionStorage.getItem("selectedGame");
    const parsed: juego | null = stored ? JSON.parse(stored) : null;

    const [name, setName] = useState(parsed?.name || "");
    const [description, setDescription] = useState(parsed?.description || "");
    const [images, setImages] = useState(parsed?.images || []);
    const [trailers, setTrailers] = useState(parsed?.trailers || []);
    const [platforms, setPlatforms] = useState(parsed?.plataformas || "");

    if (!parsed) {
        return <div className="container mt-4">No game selected to edit.</div>;
    }

    const handleSave = async () => {
        const updatedGame: juego = {
            ...parsed,
            name: name.trim(),
            description: description.trim(),
            images,
            trailers
        }

        // Actualiza en sessionStorage local
        const juegosStr = sessionStorage.getItem("listaJuegos")
        const juegos: juego[] = juegosStr ? JSON.parse(juegosStr) : []
        const actualizados = juegos.map((g) => g.id === parsed.id ? updatedGame : g)
        sessionStorage.setItem("listaJuegos", JSON.stringify(actualizados))

        // Actualiza en el backend
        try {
            const response = await fetch(`http://localhost:5050/games/${parsed.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedGame.name,
                    description: updatedGame.description,
                    company: updatedGame.company,
                    state: updatedGame.state,
                    category: updatedGame.category.id, // ID numérico
                    plataformas: platforms,
                    images: updatedGame.images.map(img => img.url),
                    trailers: updatedGame.trailers?.map(tr => tr.url) ?? [],
                    attachment: updatedGame.attachment ? { url: updatedGame.attachment.url } : undefined
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log("Error updating game: " + (errorData?.data?.msg || "Unknown error"))
                return
            }

            navigate("/admin/game")
        } catch (error) {
            console.error("Error updating game:", error)
            console.log("An unexpected error occurred.")
        }
    }

    const handleAddImage = () => {
        const url = prompt("Enter new image URL");
        if (url) {
            const newImage = {
                id: images.length + 1,
                url,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                gameId: parsed!.id,
            };
            setImages([...images, newImage]);
        }
    };

    const handleDeleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddTrailer = () => {
        const newTrailer = {
            id: trailers.length + 1,
            url: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            gameId: parsed!.id,
        };
        setTrailers([...trailers, newTrailer]);
    };

    const handleDeleteTrailer = (index: number) => {
        setTrailers(trailers.filter((_, i) => i !== index));
    };

    const handleTrailerChange = (index: number, value: string) => {
        const updated = [...trailers];
        updated[index].url = value;
        updated[index].updatedAt = new Date().toISOString();
        setTrailers(updated);
    };

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h1 id="title">Edit Game</h1>

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
                <label htmlFor="gamePlatforms" className="form-label">Platforms</label>
                <input
                    id="gamePlatforms"
                    className="form-control mb-4"
                    value={platforms}
                    onChange={(e) => setPlatforms(e.target.value)}
                    placeholder="e.g., PC, PS5, Xbox"
                />

                <h4 className="text-center">Gallery</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {images.map((image, index) => (
                        <div key={index} className="d-flex flex-column align-items-center">
                            <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="photo border p-2 m-2"
                                style={{ width: "200px", objectFit: "cover" }}
                            />
                            <button
                                className="btn btnGamePage btn-outline-danger mt-2"
                                onClick={() => handleDeleteImage(index)}
                            >
                                Delete Photo
                            </button>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btnGamePage btn-outline-primary" onClick={handleAddImage}>
                        Add Photo
                    </button>
                </div>

                <h4 className="text-center">Trailers</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {trailers.map((trailer, index) => (
                        <div key={index} className="text-center m-2">
                            <p>Trailer {index + 1}</p>
                            <textarea
                                className="form-control"
                                value={trailer.url}
                                onChange={(e) => handleTrailerChange(index, e.target.value)}
                            />
                            <div className="mt-2 d-flex flex-wrap justify-content-center gap-2">
                                <button
                                    className="btn btnGamePage btn-outline-danger"
                                    onClick={() => handleDeleteTrailer(index)}
                                >
                                    Delete Trailer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btnGamePage btn-outline-primary" onClick={handleAddTrailer}>
                        Add Trailer
                    </button>
                </div>

                <div className="d-flex justify-content-center mb-2">
                    <button className="btn btnGamePage btn-outline-success" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>

                <div className="d-flex justify-content-center mb-2">
                    <button
                        className="btn btnGamePage btn-outline-secondary"
                        onClick={() => navigate("/admin/game")}
                    >
                        Discard Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameEditPage;