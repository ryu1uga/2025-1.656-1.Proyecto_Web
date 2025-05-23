import { Link } from "react-router-dom"
import "./MainPage.css"

const MainPage = () => {

    return <div className="container">
        <h1 id="h1">Admin Page</h1>
        <div className="d-grid gap-2">
            <Link to={ "" } className="btn botonAdminHome">User</Link>
            <Link to={ "" } className="btn botonAdminHome">News</Link>
            <Link to={ "" } className="btn botonAdminHome">Sales data</Link>
            <Link to={ "/admin/game" } className="btn botonAdminHome">Game</Link>
            <Link to={ "" } className="btn botonAdminHome">Category</Link>
        </div>
    </div>
}

export default MainPage