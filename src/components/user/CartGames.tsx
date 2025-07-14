import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { juego } from "../../components/user/HomeJuego"
import { API_URL } from "../../main";

interface ListGames {
  data : juego[]
  actualizarCarrito: (nuevo: juego[]) => void;
}

const CartGames = ({data, actualizarCarrito} : ListGames) => { 
  const navigate = useNavigate()

  const [cart, setCart] = useState<juego[]>(data)
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const nuevoTotal = cart.reduce((sum, juego) => sum + juego.price, 0);
    setTotal(nuevoTotal);
  }, [cart]);

  const actualizarCarritoBD = async (nuevoCarrito: juego[]) => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    const userId = user?.id;

    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          games: nuevoCarrito.map(j => j.id)
        })
      });

      const data = await response.json();
      if (!response.ok) {
        console.warn("No se pudo actualizar el carrito en BD:", data);
      }
    } catch (error) {
      console.error("Error al sincronizar el carrito:", error);
    }
  };

  const handleConfirmOrder = async () => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    const userId = user?.id;

    if (!userId) {
      console.log("Debe iniciar sesión para confirmar la orden.");
      return;
    }

    // Eliminar carrito del backend
    await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    // Limpiar sessionStorage y el estado
    sessionStorage.removeItem("carrito");
    resetCart();

    // Redirigir a la página de pago
    navigate("/user/pago");
  };

  const removeGame = (id: number) => {
    const updateCart = cart.filter(juego => juego.id !== id);
    setCart(updateCart);
    actualizarCarrito(updateCart);
    actualizarCarritoBD(updateCart); // Sincroniza con BD
  };

  const resetCart = () => {
    setCart([]);
    actualizarCarrito([]);
    actualizarCarritoBD([]); // Vacía en BD
  };


  return <footer id="footer-c"className="footer">
    <h3>Shopping Cart</h3>
    <div className="card-group-style">
      {
        cart.map(juego => {
          return <div id="Card-s-c" className="card-style position-relative" key={juego.id}>
            <button type="button" className="btn-close position-absolute top-0 end-0 m-1" aria-label="Close" onClick={() => removeGame(juego.id)}></button>
            <div id ="img-juego"className="game-img d-flex align-items-center justify-content-center">
              <img src={`${juego.attachment.url}`} alt={juego.name} className="img-fluid" />
            </div>
            <p id="texto-C"className="texto">{juego.name}</p>
            <p className="text-center fw-bold">${juego.price.toFixed(2)}</p>
          </div>
        })
      }
    </div>

    <div className="text-end mt-3">
      <h4>Total: ${total.toFixed(2)}</h4>
    </div>

    <div id="botones-c" className="botones">
      <button id="confirmar-c"className="confirmar" onClick={handleConfirmOrder} disabled={cart.length === 0}>Confirm Order</button>
      <button id="cancelar-c"className="cancelar">Cancel Order</button>
      <button className="btn btn-secondary" onClick={resetCart}>
          Reset Cart
      </button>
    </div>
  </footer>
}

export default CartGames