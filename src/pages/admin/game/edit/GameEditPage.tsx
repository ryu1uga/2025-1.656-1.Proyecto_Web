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
        return <div className="GameEdit-container">No game selected to edit.</div>;
    }

    const handleSave = async () => {
        const updatedGame: juego = {
            ...parsed,
            name: name.trim(),
            description: description.trim(),
            images,
            trailers
        };

        const juegosStr = sessionStorage.getItem("listaJuegos")
        const juegos: juego[] = juegosStr ? JSON.parse(juegosStr) : []
        const actualizados = juegos.map((g) => g.id === parsed.id ? updatedGame : g)
        sessionStorage.setItem("listaJuegos", JSON.stringify(actualizados))

        try {
            const response = await fetch(`http://localhost:5050/games/${parsed.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedGame.name,
                    description: updatedGame.description,
                    company: updatedGame.company,
                    state: updatedGame.state,
                    category: updatedGame.category.id,
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
        <div className="GameEdit-container">
            <div className="GameEdit-header">
                <div className="GameEdit-header-content">
                    <h1 className="GameEdit-title">Edit Game</h1>
                </div>
            </div>
            <div className="GameEdit-content">
                <div className="GameEdit-field">
                    <label className="GameEdit-label">Game Name</label>
                    <input
                        className="GameEdit-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="GameEdit-field">
                    <label className="GameEdit-label">Description</label>
                    <textarea
                        className="GameEdit-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="GameEdit-field">
                    <label className="GameEdit-label">Platforms</label>
                    <input
                        className="GameEdit-input"
                        value={platforms}
                        onChange={(e) => setPlatforms(e.target.value)}
                        placeholder="e.g., PC, PS5, Xbox"
                    />
                </div>

                <h2 className="GameEdit-photos-title">Gallery</h2>
                <div className="GameEdit-photos-grid">
                    {images.map((image, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="photo border p-2 m-2"
                                style={{ width: "200px", objectFit: "cover" }}
                            />
                            <button
                                className="GameEdit-photo-btn"
                                onClick={() => handleDeleteImage(index)}
                            >
                                <div className="GameEdit-photo-btn-content">
                                    <div className="GameEdit-photo-icon">❌</div>
                                    <div className="GameEdit-photo-text">Delete Photo</div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="GameEdit-photos-grid">
                    <button className="GameEdit-photo-btn" onClick={handleAddImage}>
                        <div className="GameEdit-photo-btn-content">
                            <div className="GameEdit-photo-icon">📷</div>
                            <div className="GameEdit-photo-text">Add Photo</div>
                        </div>
                    </button>
                </div>

                <h2 className="GameEdit-photos-title">Trailers</h2>
                <div className="GameEdit-photos-grid">
                    {trailers.map((trailer, index) => (
                        <div key={index} className="text-center">
                            <p>Trailer {index + 1}</p>
                            <textarea
                                className="GameEdit-textarea"
                                value={trailer.url}
                                onChange={(e) => handleTrailerChange(index, e.target.value)}
                            />
                            <button
                                className="GameEdit-photo-btn"
                                onClick={() => handleDeleteTrailer(index)}
                            >
                                <div className="GameEdit-photo-btn-content">
                                    <div className="GameEdit-photo-icon">❌</div>
                                    <div className="GameEdit-photo-text">Delete Trailer</div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="GameEdit-photos-grid">
                    <button className="GameEdit-photo-btn" onClick={handleAddTrailer}>
                        <div className="GameEdit-photo-btn-content">
                            <div className="GameEdit-photo-icon">🎬</div>
                            <div className="GameEdit-photo-text">Add Trailer</div>
                        </div>
                    </button>
                </div>

                <div className="GameEdit-actions">
                    <button
                        className="GameEdit-cancel-btn"
                        onClick={() => navigate("/admin/game")}
                    >
                        Discard Changes
                    </button>
                    <button
                        className="GameEdit-submit-btn"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameEditPage;