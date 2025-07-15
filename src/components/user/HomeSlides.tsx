import type { news } from "./HomeNews";
import "./HomeSlides.css";

interface HomeSlidesProps {
  news: news[];
};

const HomeSlides = ({ news }: HomeSlidesProps) => {
    return (
        <div id="Carouseljuegos" className="carousel slide position-relative bg-transparent text-white text-center p-2 rounded" data-bs-ride="carousel">
            <div className="carousel-inner">

                {news.slice(0,5).map((news, index) => (
                    <div key={index} className={`carousel-item ${index == 0 ? "active" : ""}`}>
                        <img
                            src={news.attachment?.url || "/default.jpg"}
                            className="d-block w-100"
                            alt={news.title}
                            />

                        <div className="carousel-caption d-none d-md-block">
                            <div className="carousel-text-bg p-3 rounded">
                                <h5>{news.title}</h5>
                                <p>{news.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
                    {news.length == 0 && (
                    <div className="carousel-item active">
                        <div className="d-block w-100 bg-dark text-white p-5 rounded">
                            <h5>No hay noticias disponibles</h5>
                            <p>Vuelve mas tarde</p>
                        </div>
                    </div>
                )}
            </div>

            <a className="carousel-control-prev" href="#Carouseljuegos" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#Carouseljuegos" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
        </div>
    );
};
export default HomeSlides
