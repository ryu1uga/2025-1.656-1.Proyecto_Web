import React, { useState } from 'react';
import './BarraFiltros.css';

const BarraFiltros = () => {
  // Estado para el rango de precios
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  
  // Estado para las categorías
  const [categories, setCategories] = useState({
    accion: false,
    aventura: false,
    rpg: false,
    estrategia: false,
    deportes: false
  });
  
  // Estado para ofertas
  const [ofertas, setOfertas] = useState({
    descuento: false
  });
  
  // Estado para plataformas
  const [plataformas, setPlataformas] = useState({
    windows: false,
    macos: false,
    ps4: false,
    ps5: false,
    switch: false
  });

  // Manejadores de cambios
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    setPriceRange({
      ...priceRange,
      [type]: parseInt(e.target.value)
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({
      ...categories,
      [e.target.id]: e.target.checked
    });
  };

  const handleOfertaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfertas({
      ...ofertas,
      [e.target.id]: e.target.checked
    });
  };

  const handlePlataformaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlataformas({
      ...plataformas,
      [e.target.id]: e.target.checked
    });
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setPriceRange({ min: 0, max: 100 });
    setCategories({
      accion: false,
      aventura: false,
      rpg: false,
      estrategia: false,
      deportes: false
    });
    setOfertas({ descuento: false });
    setPlataformas({
      windows: false,
      macos: false,
      ps4: false,
      ps5: false,
      switch: false
    });
  };

  return (
    <div className="container catalog-container">
      <div className="filter-section">
        <h3 className="filter-title">Filtros</h3>
        
        {/* Filtro de precio */}
        <div className="filter-group">
          <div className="filter-group-title">Rango de precio</div>
          <input 
            type="range" 
            className="form-range" 
            min="0" 
            max="100" 
            step="5" 
            value={priceRange.max}
            onChange={(e) => handlePriceChange(e, 'max')}
          />
          <div className="price-range">
            <input 
              type="number" 
              className="form-control price-input" 
              placeholder="Min" 
              value={priceRange.min}
              onChange={(e) => handlePriceChange(e, 'min')}
            />
            <input 
              type="number" 
              className="form-control price-input" 
              placeholder="Max" 
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
            />
          </div>
        </div>
        
        {/* Filtro de categorías */}
        <div className="filter-group">
            <div className="filter-group-title">Categorias</div>
              {Object.entries({
                  CategoriaAccion: 'Acción',
                  CategoriaAventura: 'Aventura',
                  CategoriaRPG: 'RPG',
                  CategoriaEstrategia: 'Estrategia',  
                  CategoriaDeportes: 'Deportes'
              }).map(([id, label]) => (
              <div className="filter-option" key={id}>
              <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={id}
                checked={categories[id.toLowerCase().replace('categoria', '') as keyof typeof categories]}
                onChange={handleCategoryChange}/>
              <label className="form-check-label">{label}</label>
            </div>
          </div>
        ))}
      </div>
        
        {/* Filtro de ofertas */}
        <div className="filter-group">
          <div className="filter-group-title">Ofertas Especiales</div>
          <div className="filter-option">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="Solodescuento"
                checked={ofertas.descuento}
                onChange={handleOfertaChange}
              />
              <label className="form-check-label">Juegos con descuento</label>
            </div>
          </div>
        </div>
        
        {/* Filtro de plataformas */}
        <div className="filter-group">
          <div className="filter-group-title">Plataforma</div>
          {Object.entries({
            plataformaPC: 'Windows',
            plataformaMac: 'macOS',
            plataformaPS4: 'PS4',
            plataformaPS5: 'PS5',
            plataformaSwitch: 'Nintendo Switch'
          }).map(([id, label]) => (
            <div className="filter-option" key={id}>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={id}
                  checked={plataformas[id.toLowerCase().replace('plataforma', '') as keyof typeof plataformas]}
                  onChange={handlePlataformaChange}
                />
                <label className="form-check-label">{label}</label>
              </div>
            </div>
          ))}
        </div>
        
        <button className="btn btn-primary w-100 mt-2">Aplicar Filtros</button>
        <button 
          className="btn btn-outline-secondary w-100 mt-2"
          onClick={resetFilters}
        >
          Resetear Filtros
        </button>
      </div>
    </div>
  );
};

export default BarraFiltros;