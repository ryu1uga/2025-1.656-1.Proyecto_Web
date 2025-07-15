
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HomeNavbarProps {
  OrdenarVentas: () => void
  OrdenarValoracion: () => void
  Restablecer: () => void
  toggleCarrito: () => void // NUEVA PROP
};


const HomeNavbar = (props: HomeNavbarProps) => {
    const navigate = useNavigate ();
    const [busqueda, setBusqueda] = useState("");

    const handleBuscar = () => {
    if (busqueda.trim()) {
        navigate(`/user/catalogo?busqueda=${encodeURIComponent(busqueda)}`);
        }
    };
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">LP Store</a>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link btn btn-primary">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/catalogo" className="nav-link btn btn-primary">Catálogo</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-primary" onClick={() => navigate("/user/edit")}>Configuración</button>
                            </li>
                            <li className="nav-item">
                                <a id="BotVentas" className="nav-link btn btn-primary" onClick={props.OrdenarVentas} type="button" >Más Vendidos</a>
                            </li>
                            <li className="nav-item">
                                <a id="BotVal" className="nav-link btn btn-primary" onClick={props.OrdenarValoracion} type="button">Mejor Valorados</a>
                            </li>
                            <li className="nav-item">
                                <a id="BotFeature" className="nav-link btn btn-primary" onClick={props.Restablecer} type="button">Mas Populares</a>
                            </li>
                        </ul>

                        <div id="searchbar" className="form-inline d-flex me-3" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar juego..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                aria-label="Buscar"
                            />
                            <button className="btn btn-outline-light" type="button" onClick={handleBuscar}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <button 
                        className="btn btn-outline-light" 
                        type="button" 
                        onClick={props.toggleCarrito}
                        >
                        <i className="fas fa-shopping-cart me-1"></i> Carrito
                        </button>
                    </div>
                </div>
            </nav>
    );
}
export default HomeNavbar