import { Link } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
    const username = sessionStorage.getItem("user");

    return (
        <div className="MainPage-Admin-container">
            <div className="MainPage-Admin-sidebar">
                <div className="MainPage-Admin-profile">
                    <img src="../../../profile.png" className="MainPage-Admin-photo" />
                    <div className="MainPage-Admin-username">{username}</div>
                </div>
                <ul className="MainPage-Admin-menu">
                    <li><Link to={""} className="MainPage-Admin-boton">USERS</Link></li>
                    <li><Link to={"/admin/game"} className="MainPage-Admin-boton">GAMES</Link></li>
                    <li><Link to={"/admin/news"} className="MainPage-Admin-boton">NEWS</Link></li>
                    <li><Link to={""} className="MainPage-Admin-boton">STATISTICS</Link></li>
                    <li><Link to={""} className="MainPage-Admin-boton MainPage-Admin-logout">LOG OUT</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default MainPage;