import { useNavigate, useParams } from "react-router-dom";
import "./GameDetailsPage.css";
import type { juego } from "../../../../components/user/HomeJuego";

const GameDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const listaStr = sessionStorage.getItem("listaJuegos");
    let parsed: juego | undefined;

    if (listaStr && id) {
        try {
            const lista: juego[] = JSON.parse(listaStr);
            parsed = lista.find(j => j.id === Number(id));
        } catch {
            parsed = undefined;
        }
    }

    if (!parsed) {
        return (
            <div className="GameDetails-container mt-4">
                <p>Game not found.</p>
                <div className="GameDetails-actions">
                    <button className="GameDetails-back-btn" onClick={() => navigate("/admin/game")}>
                        Back to Game List
                    </button>
                </div>
            </div>
        );
    }

    const averageRating = parsed.ratings.length
        ? (parsed.ratings.reduce((sum, r) => sum + r.rating, 0) / parsed.ratings.length).toFixed(1)
        : "No ratings";

    const totalSells = parsed.sells.reduce((sum, s) => sum + s.amount, 0);

    return (
        <div className="GameDetails-container">
            <div className="GameDetails-header">
                <div className="GameDetails-header-content">
                    <h1 className="GameDetails-title">{parsed.name}</h1>
                </div>
            </div>
            <div className="GameDetails-content">
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Company:</label>
                    <div className="GameDetails-value">{parsed.company}</div>
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Category:</label>
                    <div className="GameDetails-value">{parsed.category.name}</div>
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Platforms:</label>
                    <div className="GameDetails-value">{parsed.plataformas}</div>
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Price:</label>
                    <div className="GameDetails-value">${parsed.price}</div>
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Total Sells:</label>
                    <div className="GameDetails-value">{totalSells}</div>
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Average Rating:</label>
                    <div className="GameDetails-value">{averageRating}</div>
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Description:</label>
                    <div className="GameDetails-description">
                        {parsed.description || "No description provided."}
                    </div>
                </div>
                {parsed.attachment?.url && (
                    <div className="GameDetails-field">
                        <label className="GameDetails-label">Attachment:</label>
                        <a
                            href={parsed.attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="GameDetails-value"
                            style={{ display: "inline-block", color: "#2563eb", textDecoration: "underline" }}
                        >
                            View / Download Attachment
                        </a>
                    </div>
                )}
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Gallery:</label>
                    {parsed.images?.length ? (
                        <div className="GameDetails-gallery">
                            {parsed.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    alt={`Game Image ${i + 1}`}
                                    className="GameDetails-photo"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="GameDetails-no-content">No photos available.</div>
                    )}
                </div>
                <div className="GameDetails-field">
                    <label className="GameDetails-label">Trailers:</label>
                    {parsed.trailers?.length ? (
                        <div className="GameDetails-trailers">
                            {parsed.trailers.map((t, i) => (
                                <div key={i} className="GameDetails-trailer">
                                    <p>Trailer {i + 1}</p>
                                    <iframe
                                        src={t.url}
                                        width="300"
                                        height="180"
                                        frameBorder="0"
                                        allowFullScreen
                                        title={`Trailer ${i + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="GameDetails-no-content">No trailers available.</div>
                    )}
                </div>
                <div className="GameDetails-actions">
                    <button className="GameDetails-back-btn" onClick={() => navigate("/admin/game")}>
                        Back to Game List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsPage;