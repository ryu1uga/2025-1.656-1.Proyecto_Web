import { useNavigate } from "react-router-dom";

interface SeccionNavbarProps {
  OrdenarVentas?: () => void; // Hacer opcional con ?
  OrdenarValoracion?: () => void; // Hacer opcional con ?
  Restablecer?: () => void; // Hacer opcional con ?
}

export const SeccionNavbar = (props: SeccionNavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/user/home">LP Store</a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link btn btn-primary" onClick={() => navigate("/user/home")}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-primary">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-primary">Configuración</a>
            </li>
          </ul>
          <div id="searchbar" className="form-inline d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar juego..."
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => navigate("/user/carrito")}
          >
            <i className="fas fa-shopping-cart"></i> Carrito
          </button>
        </div>
      </div>
    </nav>
  );
};