import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GamePage.css";
import type { juego } from "../../../components/user/HomeJuego";
import { API_URL } from "../../../main";

const GamePage = () => {
    
    const navigate = useNavigate()
    const [games, setGames] = useState<juego[]>(() => {
    const juegosGuardadosStr = sessionStorage.getItem("listaJuegos");
        if (juegosGuardadosStr) {
            try {
                return JSON.parse(juegosGuardadosStr);
            } catch {
                return [];
            }
        }
        return [];
    });

    const ObtenerJuegos = async () => {
        try {
            const response = await fetch(`${API_URL}/games`);
            const data = await response.json();

            if (Array.isArray(data.data)) {
                setGames(data.data);
                sessionStorage.setItem('listaJuegos', JSON.stringify(data.data));
            } else {
                console.error("La propiedad 'data' no es un array:", data);
                setGames([]);
            }
        } catch (error) {
            console.error("Error al obtener juegos:", error);
        }
    };

    useEffect(() => {ObtenerJuegos()}, [])

    const handleEdit = (game: juego) => {
        sessionStorage.setItem("selectedGame", JSON.stringify(game));
        navigate(`/admin/game/edit/${ game.id }`);
    };

    const deleteGame = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/games/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error deleting game from backend");
            }

            const actualizados = games.filter(game => game.id !== id);
            setGames(actualizados);
            sessionStorage.setItem("listaJuegos", JSON.stringify(actualizados));
        } catch (error) {
            console.error("Failed to delete game:", error);
        }
    };

    const getAverageRating = (ratings?: { rating: number }[]) => {
        if (!Array.isArray(ratings) || ratings.length === 0) return "No ratings";
        const total = ratings.reduce((sum, r) => sum + r.rating, 0);
        return (total / ratings.length).toFixed(1);
    };

    const getTotalSells = (sells?: { amount: number }[]) => {
        if (!Array.isArray(sells)) return 0;
        return sells.reduce((sum, s) => sum + s.amount, 0);
    };

    return (
        <div className="GamePage-container">
            <div className="GamePage-header">
                <h1 className="GamePage-title">GAMES</h1>
            </div>

            <div className="GamePage-content">
                <div style={{ textAlign: 'center' }}>
                    <Link to="/admin/game/add" className="GamePage-add-button">
                        ADD GAME
                    </Link>
                </div>

                {games.length === 0 ? (
                    <div className="GamePage-no-games">
                        No games added
                    </div>
                ) : (
                    <div>
                        {games.map((game) => (
                            <div className="GamePage-game-card" key={game.id}>
                                <div className="GamePage-game-info">
                                    <div className="GamePage-game-details">
                                        <h5 className="GamePage-game-name">{game.name}</h5>
                                        <p><strong>Company:</strong> {game.company}</p>
                                        <p><strong>Category:</strong> {game.category?.name ?? "Unknown category"}</p>
                                        <p><strong>Price:</strong> ${game.price}</p>
                                        <p><strong>Sells:</strong> {getTotalSells(game.sells)}</p>
                                        <p><strong>Rating:</strong> {getAverageRating(game.ratings)}</p>

                                        {game.description && (
                                            <p className="GamePage-game-description">{game.description}</p>
                                        )}

                                        <div className="GamePage-game-stats">
                                            <span className="GamePage-photo-link">
                                                {game.images?.length ?? 0} photo(s)
                                            </span>
                                            {" | "}
                                            <span className="GamePage-trailer-link">
                                                {game.trailers?.length ?? 0} trailer(s)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="GamePage-actions">
                                        <Link
                                            to={`/admin/game/details/${game.id}`}
                                            className="GamePage-action-button GamePage-details-button"
                                        >
                                            DETAILS
                                        </Link>
                                        <button
                                            className="GamePage-action-button GamePage-edit-button"
                                            onClick={() => handleEdit(game)}
                                        >
                                            EDIT
                                        </button>
                                        <button
                                            className="GamePage-action-button GamePage-delete-button"
                                            onClick={() => deleteGame(game.id)}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamePage;