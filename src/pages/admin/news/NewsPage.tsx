import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../main";
import "./NewsPage.css";

interface News {
    id: number;
    name: string;
    description: string;
    photo: string;
}

const NewPage = () => {
    const [news, setNews] = useState<News[]>(() => {
        const newsGuardadasStr = sessionStorage.getItem("news");
        if (newsGuardadasStr) {
            try {
                return JSON.parse(newsGuardadasStr);
            } catch {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const resp = await fetch(`${API_URL}/news`);
                const data = await resp.json();
                if (data.success) {
                    const formattedNews = data.data.map((item: any) => ({
                        id: item.id,
                        name: item.title,
                        description: item.text,
                        photo: item.attachment?.url || "",
                    }));
                    setNews(formattedNews);
                    sessionStorage.setItem("news", JSON.stringify(formattedNews));
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    const deleteNews = (id: number) => {
        const actualizadas = news.filter(newsItem => newsItem.id !== id);
        setNews(actualizadas);
        sessionStorage.setItem("news", JSON.stringify(actualizadas));
    };

    return (
        <div className="NewPage-container">
            <div className="NewPage-header">
                <h1 className="NewPage-title">NEWS</h1>
            </div>

            <div className="NewPage-content">
                <div style={{ textAlign: 'center' }}>
                    <Link to="/admin/news/add" className="NewPage-add-button">
                        ADD NEWS
                    </Link>
                </div>

                {news.length === 0 ? (
                    <div className="NewPage-no-news">
                        No news added
                    </div>
                ) : (
                    <div>
                        {news.map((newsItem) => (
                            <div className="NewPage-news-card" key={newsItem.id}>
                                <div className="NewPage-news-info">
                                    <div className="NewPage-news-details">
                                        <h5 className="NewPage-news-name">{newsItem.name}</h5>
                                        {newsItem.description && (
                                            <p className="NewPage-news-description">{newsItem.description}</p>
                                        )}
                                        <div className="NewPage-news-stats">
                                            <span className="NewPage-photo-link">
                                                {newsItem.photo ? '1 photo' : '0 photos'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="NewPage-actions">
                                        <Link
                                            to="/admin/news/details"
                                            className="NewPage-action-button NewPage-details-button"
                                            onClick={() => sessionStorage.setItem("selectedNews", JSON.stringify(newsItem))}
                                        >
                                            DETAILS
                                        </Link>
                                        <Link
                                            to={`/admin/news/edit/${newsItem.id}`}
                                            className="NewPage-action-button NewPage-edit-button"
                                        >
                                            EDIT
                                        </Link>
                                        <button
                                            className="NewPage-action-button NewPage-delete-button"
                                            onClick={() => deleteNews(newsItem.id)}
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

export default NewPage;