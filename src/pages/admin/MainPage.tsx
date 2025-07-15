import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem("user");

    const handleLogout = async () => {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");

        if (!userId || !token) {
            sessionStorage.clear();
            return navigate("/login");
        }

        try {
            const response = await fetch("http://localhost:5050/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: Number(userId) }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("token");
            } else {
                console.warn("Server logout failed:", result.data);
            }

        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            sessionStorage.clear();
            navigate("/");
        }
    };

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
                    <li><Link to={"/admin/search"} className="MainPage-Admin-boton">FILTERS</Link></li>
                    <li><Link to={"/"} className="MainPage-Admin-boton MainPage-Admin-logout" onClick={ handleLogout }>LOG OUT</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
