import { useNavigate, useParams } from "react-router-dom";
import "./NewsDetailsPage.css";

interface News {
  id: number;
  title: string;
  text: string;
  attachment?: {
    url: string;
  };
}

const NewsDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const stored = sessionStorage.getItem("newslist");
    let parsed: News | undefined;

    if (stored && id) {
        try {
            const lista: News[] = JSON.parse(stored);
            parsed = lista.find(n => n.id === Number(id));
        } catch {
            parsed = undefined;
        }
    }

    if (!parsed) {
        return (
            <div className="NewsDetails-container mt-4">
                No news selected to view.
            </div>
        );
    }

    return (
        <div className="NewsDetails-container">
            <div className="NewsDetails-header">
                <div className="NewsDetails-header-content">
                    <h1 className="NewsDetails-title">News Details</h1>
                </div>
            </div>
            <div className="NewsDetails-content">
                <div className="NewsDetails-field">
                    <label className="NewsDetails-label">Name:</label>
                    <div className="NewsDetails-value">{parsed.title}</div>
                </div>
                <div className="NewsDetails-field">
                    <label className="NewsDetails-label">Description:</label>
                    <div className="NewsDetails-value">{parsed.text}</div>
                </div>
                <div className="NewsDetails-field">
                    <label className="NewsDetails-label">Photo:</label>
                    {parsed.attachment?.url ? (
                        <ul className="NewsDetails-photo-list">
                            <li className="NewsDetails-photo-item">
                                <img src={parsed.attachment.url} alt="News attachment" />
                            </li>
                        </ul>
                        ) : (
                        <div className="NewsDetails-no-photos">No images available</div>
                    )}
                </div>
                <div className="NewsDetails-actions">
                    <button
                        type="button"
                        className="NewsDetails-cancel-btn"
                        onClick={() => navigate("/admin/news")}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailsPage;