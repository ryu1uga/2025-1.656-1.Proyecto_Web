import { useNavigate } from "react-router-dom";
import "./GameDetailsPage.css";
import type { Game } from "../../../../components/admin/game/GameList";

const GameDetailsPage = () => {
    const navigate = useNavigate();

    const stored = localStorage.getItem("selectedGame");
    const parsed: Game | null = stored ? JSON.parse(stored) : null;

    if (!parsed) {
        return (
            <div className="container mt-4">
                <p>No game selected to view.</p>
                <button className="btn btn-secondary" onClick={() => navigate("/admin/game")}>
                    Back to Game List
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h1 className="text-center">{parsed.name}</h1>

                <div className="mt-3">
                    <p><strong>Description:</strong></p>
                    <p className="border p-3">{parsed.description || "No description provided."}</p>
                </div>

                <h4 className="text-center mt-4">Gallery</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {parsed.photos?.length ? (
                        parsed.photos.map((photo, i) => (
                            <div key={i} className="d-flex flex-column align-items-center">
                                <div className="photo border p-3 m-2">{photo}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No photos available.</p>
                    )}
                </div>

                <h4 className="text-center">Trailers</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {parsed.trailers?.length ? (
                        parsed.trailers.map((trailer, i) => (
                            <div key={i} className="text-center m-2">
                                <p>Trailer {i + 1}</p>
                                <textarea
                                    className="form-control"
                                    readOnly
                                    defaultValue={trailer}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No trailers available.</p>
                    )}
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => navigate("/admin/game")}>
                        Back to Game List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsPage;
