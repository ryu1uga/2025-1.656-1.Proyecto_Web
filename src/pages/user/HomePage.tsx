import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useState } from "react";
import type { juego } from "../../components/user/HomeJuego";
import HomeNavbar from "../../components/user/HomeNavbar";
import Barra from "./Filtro_Precio_etc/BarraFiltros";
import HomeSlides from "../../components/user/HomeSlides";
import HomeList from "../../components/user/HomeList";
import BarraFiltros from "./Filtro_Precio_etc/BarraFiltros";

const HomePage = () => {
  const ListaJ = localStorage.getItem("listaPrueba");

  let prueba: juego[];
  if (ListaJ == null) {
    prueba = [];
  } else {
    prueba = JSON.parse(ListaJ);
  }

  const [juegos, setjuegos] = useState<juego[]>(prueba);

  const ordenarPorVentas = () => {
    const ordenado = [...juegos].sort((a, b) => parseFloat(b.ventas) - parseFloat(a.ventas));
    setjuegos(ordenado);
  };

  const ordenarPorValoracion = () => {
    const ordenado = [...juegos].sort((a, b) => parseFloat(b.valoracion) - parseFloat(a.valoracion));
    setjuegos(ordenado);
  };

  const Restablecer = () => {
    setjuegos(prueba);
  };

  return (
    <div className="background-container">
      <HomeNavbar 
        OrdenarVentas={ordenarPorVentas}
        OrdenarValoracion={ordenarPorValoracion}
        Restablecer={Restablecer}
      />
      <div className="container my-5">
        <div className="main-layout">
          <div className="filter-column">
            <BarraFiltros />
          </div>
          <div className="content-column">
            <HomeSlides />
            <HomeList juegos={juegos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;