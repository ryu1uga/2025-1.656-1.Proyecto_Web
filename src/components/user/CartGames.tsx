import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export interface Games { 
  id : number
  name : string
  image : string
}

interface ListGames {
  data : Games[]
}

const CartGames = (props : ListGames) => { 
  const navigate = useNavigate()
  const saveCart = localStorage.getItem("guardar-carrito")
  const initialCart: Games[] = saveCart ? JSON.parse(saveCart) : props.data

  const [cart, setCart] = useState<Games[]>(initialCart) 

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
        cart.map((elemento: Games) => {
          return <div id="Card-s-c" className="card-style position-relative" key={elemento.id}>
            <button type="button" className="btn-close position-absolute top-0 end-0 m-1" aria-label="Close" onClick={() => removeGame(elemento.id)}></button>
            <div id ="img-juego"className="game-img d-flex align-items-center justify-content-center">
              <img src={elemento.image} alt={elemento.name} className="img-fluid" />
            </div>
            <p id="texto-C"className="texto">{elemento.name}</p>
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