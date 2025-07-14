import { useNavigate, useParams } from "react-router-dom";
import "./GameDetailsPage.css";
import type { juego } from "../../../../components/user/HomeJuego";

const GameDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // <- Obtener ID desde URL
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
            <div className="container mt-4">
                <p>Game not found.</p>
                <button className="btn btnGamePage btn-secondary" onClick={() => navigate("/admin/game")}>
                    Back to Game List
                </button>
            </div>
        );
    }

    const averageRating = parsed.ratings.length
        ? (parsed.ratings.reduce((sum, r) => sum + r.rating, 0) / parsed.ratings.length).toFixed(1)
        : "No ratings";

    const totalSells = parsed.sells.reduce((sum, s) => sum + s.amount, 0);

    return (
        <div className="container mt-4">
            <div className="card p-4">
                <h1 id="title">{parsed.name}</h1>
                <p><strong>Company:</strong> {parsed.company}</p>
                <p><strong>Category:</strong> {parsed.category.name}</p>
                <p><strong>Platforms:</strong> {parsed.plataformas}</p>
                <p><strong>Price:</strong> ${parsed.price}</p>
                <p><strong>Total Sells:</strong> {totalSells}</p>
                <p><strong>Average Rating:</strong> {averageRating}</p>

                <div className="mt-3">
                    <p><strong>Description:</strong></p>
                    <p className="border p-3">{parsed.description || "No description provided."}</p>
                </div>

                {parsed.attachment?.url && (
                    <div className="mt-3">
                        <p><strong>Attachment:</strong></p>
                        <a href={parsed.attachment.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                            View / Download Attachment
                        </a>
                    </div>
                )}

                <h4 className="text-center mt-4">Gallery</h4>
                <div className="d-flex justify-content-around flex-wrap mb-3">
                    {parsed.images?.length ? (
                        parsed.images.map((img, i) => (
                            <div key={i} className="d-flex flex-column align-items-center">
                                <img
                                    src={img.url}
                                    alt={`Game Image ${i + 1}`}
                                    className="photo border m-2"
                                    style={{ width: "200px", height: "auto", objectFit: "cover" }}
                                />
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
                                <iframe
                                    src={trailer.url}
                                    width="300"
                                    height="180"
                                    frameBorder="0"
                                    allowFullScreen
                                    title={`Trailer ${i + 1}`}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No trailers available.</p>
                    )}
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btnGamePage btn-secondary" onClick={() => navigate("/admin/game")}>
                        Back to Game List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameDetailsPage;