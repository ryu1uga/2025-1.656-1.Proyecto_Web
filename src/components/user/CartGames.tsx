import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import type { juego } from "./HomeJuego"

interface ListGames {
  data : juego[]
}

const CartGames = (props : ListGames) => { 
  const navigate = useNavigate()
  const saveCart = localStorage.getItem("guardar-carrito")
  const initialCart: juego[] = saveCart ? JSON.parse(saveCart) : props.data

  const [cart, setCart] = useState<juego[]>(initialCart) 

  const removeGame = (id : number) => {
    const updateCart = cart.filter((elemento) => elemento.id !== id)
    setCart(updateCart)
    localStorage.setItem("guardar-carrito", JSON.stringify(updateCart))
  }

  const resetCart = () => {
    setCart(props.data) 
    localStorage.removeItem("guardar-carrito")
  }

  return <footer id="footer-c"className="footer">
    <h3>Shopping Cart</h3>
    <div className="card-group-style">
      {
        cart.map((game) => {
          return <div id="Card-s-c" className="card-style position-relative" key={game.id}>
            <button type="button" className="btn-close position-absolute top-0 end-0 m-1" aria-label="Close" onClick={() => removeGame(game.id)}></button>
            <div id ="img-juego"className="game-img d-flex align-items-center justify-content-center">
              <img src={`/imagenes/juegos_carrito/${game.name.toLowerCase().replace(/\s+/g, "")}.jpg`} alt={game.name} className="img-fluid" />
            </div>
            <p id="texto-C"className="texto">{game.name}</p>
          </div>
        })
      }
    </div>

    <div id="botones-c" className="botones">
      <button id="confirmar-c"className="confirmar" onClick={()=>navigate("/user/pago")}>Confirm Order</button>
      <button id="cancelar-c"className="cancelar">Cancel Order</button>
      <button className="btn btn-secondary" onClick={resetCart}>
          Reset Cart
        </button>
    </div>
  </footer>
}

export default CartGames