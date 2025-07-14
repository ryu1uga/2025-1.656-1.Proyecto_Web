import GameFilters from "../../components/user/GameFilters";
import HomeList from "../../components/user/HomeList";
import { useEffect, useState } from "react";
import { API_URL } from "../../main";
import { useSearchParams } from "react-router-dom";
import "./CatalogoPage.css";

const Catalogo = () => {
  const [juegos, setJuegos] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("busqueda")?.toLowerCase() || "";

  useEffect(() => {
    const fetchJuegos = async () => {
      const query = new URLSearchParams();

      if (filtros.priceMin !== undefined) query.append("precioMin", filtros.priceMin);
      if (filtros.priceMax !== undefined) query.append("precioMax", filtros.priceMax);
      if (filtros.ofertas) query.append("ofertas", "true");
      if (filtros.categorias?.length)
        filtros.categorias.forEach(c => query.append("categorias", c));
      if (filtros.plataformas?.length)
        filtros.plataformas.forEach(p => query.append("plataformas", p));
      if (busqueda) query.append("busqueda", busqueda);

      try {
        const res = await fetch(`${API_URL}/games?${query.toString()}`);
        const data = await res.json();
        setJuegos(data.data || []);
      } catch (error) {
        console.error("Error al obtener juegos:", error);
      }
    };

    fetchJuegos();
  }, [filtros, busqueda]);

  return (
    <div className="catalogo-container">
      <div className="filtros">
        <GameFilters onFiltrar={setFiltros} />
      </div>
      <div className="resultados">
        <HomeList juegos={juegos} />
        {juegos.length === 0 && (
          <p className="mt-3 text-center text-muted">
            No se encontraron juegos con los filtros aplicados.
          </p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;

