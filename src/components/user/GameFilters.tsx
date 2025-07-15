import { useState } from "react";

interface Props {
  onFiltrar: (filtros: any) => void;
}

const GameFilters = ({ onFiltrar }: Props) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [ofertas, setOfertas] = useState(false);

  const [categorias, setCategorias] = useState({
    Action_Adventure: false,
    RPG: false,
    Platformer: false,
    Sandbox: false,
    Action_RPG: false,
    Sports: false
  });

  const [plataformas, setPlataformas] = useState({
    PS4: false,
    PS5: false,
    Switch: false,
    PC: false,
    Xbox: false
  });

  const handleCheckboxChange = (stateSetter: any, key: string) => {
    stateSetter((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const aplicarFiltros = () => {
    onFiltrar({
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      ofertas,
      categorias: Object.entries(categorias).filter(([_, val]) => val).map(([cat]) => cat),
      plataformas: Object.entries(plataformas).filter(([_, val]) => val).map(([plat]) => plat)
    });
  };

  const resetFiltros = () => {
    setPriceRange({ min: 0, max: 100 });
    setOfertas(false);
    setCategorias({ Action_Adventure: false, RPG: false, Platformer: false, Sandbox: false, Action_RPG: false, Sports: false });
    setPlataformas({ PS4: false, PS5: false, Switch: false, PC: false, Xbox: false });
    onFiltrar({});
  };

  return (
    <div>
      <h5>Filtrar por Precio</h5>
      <div className="mb-2">
        <label>Min: </label>
        <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })} className="form-control" />
        <label>Max: </label>
        <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} className="form-control" />
      </div>

      <h5>Categorías</h5>
      {Object.keys(categorias).map((cat) => (
        <div className="form-check" key={cat}>
          <input className="form-check-input" type="checkbox" checked={categorias[cat as keyof typeof categorias]} onChange={() => handleCheckboxChange(setCategorias, cat)} id={`cat-${cat}`} />
          <label className="form-check-label" htmlFor={`cat-${cat}`}>{cat.toUpperCase()}</label>
        </div>
      ))}

      <h5 className="mt-3">Plataformas</h5>
      {Object.keys(plataformas).map((plat) => (
        <div className="form-check" key={plat}>
          <input className="form-check-input" type="checkbox" checked={plataformas[plat as keyof typeof plataformas]} onChange={() => handleCheckboxChange(setPlataformas, plat)} id={`plat-${plat}`} />
          <label className="form-check-label" htmlFor={`plat-${plat}`}>{plat.toUpperCase()}</label>
        </div>
      ))}

      <div className="form-check mt-3">
        <input className="form-check-input" type="checkbox" checked={ofertas} onChange={() => setOfertas(!ofertas)} id="ofertas" />
        <label className="form-check-label" htmlFor="ofertas">Solo ofertas</label>
      </div>

      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-primary" onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button className="btn btn-secondary" onClick={resetFiltros}>Restablecer</button>
      </div>
    </div>
  );
};

export default GameFilters; 
