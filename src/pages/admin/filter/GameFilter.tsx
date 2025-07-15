import React, { useState, useEffect } from 'react';
import './GameFilter.css';
import { API_URL } from '../../../main';

interface Game {
  id: number;
  name: string;
  price: number;
  createdAt: string; // releaseDate → createdAt en Prisma
  category: {
    name: string;
  };
  images: { url: string }[];
}

interface FilterState {
  releaseDate: string;
  category: string;
  priceMin: string;
  priceMax: string;
}

const GameFilter: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    releaseDate: '',
    category: '',
    priceMin: '',
    priceMax: ''
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  // 1) Fetch de categorías al montar el componente
  useEffect(() => {
    // Cargar categorías
    fetch(`${API_URL}/categories`)
      .then(resp => resp.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const categoriesList = data.data.map((c: any) => ({
            id: c.id,
            name: c.name,
          }));
          setCategories(categoriesList);
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
      });

    // Cargar todos los juegos por defecto
    fetch(`${API_URL}/games/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // filtros vacíos
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setFilteredGames(data.data);
        }
      })
      .catch(err => {
        console.error("Error fetching all games:", err);
      });
  }, []);

  // 2) Manejadores
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFilter = () => {
    const payload = {
      releaseDate: filters.releaseDate || undefined,
      category: filters.category ? Number(filters.category) : undefined,
      priceMin: filters.priceMin ? parseFloat(filters.priceMin) : undefined,
      priceMax: filters.priceMax ? parseFloat(filters.priceMax) : undefined,
    };

    fetch(`${API_URL}/games/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setFilteredGames(data.data);
        } else {
          setFilteredGames([]);
        }
      })
      .catch(err => {
        console.error("Error fetching filtered games:", err);
        setFilteredGames([]);
      });
  };

  const handleCancel = () => {
    setFilters({
      releaseDate: '',
      category: '',
      priceMin: '',
      priceMax: ''
    });
    setFilteredGames([]);
  };

  return (
    <div className="GameFilt-container">
      <div className="GameFilt-header">
        <h1>SEARCH</h1>
      </div>
      
      <div className="GameFilt-content">
        <div className="GameFilt-sidebar">
          <div className="GameFilt-filter-group">
            <label className="GameFilt-label">Release Date:</label>
            <input
              type="date"
              className="GameFilt-input"
              value={filters.releaseDate}
              onChange={(e) => handleFilterChange('releaseDate', e.target.value)}
            />
          </div>

          <div className="GameFilt-filter-group">
            <label className="GameFilt-label">Category</label>
            <select
              className="GameFilt-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="GameFilt-filter-group">
            <label className="GameFilt-label">Price Range</label>
            <div className="GameFilt-price-range">
              <input
                type="number"
                className="GameFilt-input GameFilt-price-input"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              />
              <span className="GameFilt-price-separator">to</span>
              <input
                type="number"
                className="GameFilt-input GameFilt-price-input"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              />
            </div>
          </div>

          <div className="GameFilt-buttons">
            <button 
              className="GameFilt-button GameFilt-cancel"
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button 
              className="GameFilt-button GameFilt-filter"
              onClick={handleFilter}
            >
              FILTER
            </button>
          </div>
        </div>

        <div className="GameFilt-results">
          <div className="GameFilt-grid">
            {filteredGames.map(game => (
              <div key={game.id} className="GameFilt-game-card">
                <div className="GameFilt-game-image">
                  {game.images && game.images.length > 0 ? (
                    <img src={game.images[0].url} alt={game.name} />
                  ) : (
                    <div className="GameFilt-placeholder-image"></div>
                  )}
                </div>
                <div className="GameFilt-game-info">
                  <h3 className="GameFilt-game-name">{game.name}</h3>
                </div>
              </div>
            ))}
            
            {filteredGames.length === 0 && (
              <>
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={`placeholder-${index}`} className="GameFilt-game-card GameFilt-placeholder">
                    <div className="GameFilt-game-image">
                      <div className="GameFilt-placeholder-image"></div>
                    </div>
                    <div className="GameFilt-game-info">
                      <h3 className="GameFilt-game-name">Game Name</h3>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameFilter;
