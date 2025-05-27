import CartGames, { type Games } from "../../components/user/CartGames";
import "./CartPage.css";

const CartPage = () => {
  const lista : Games[] = [
    { id : 1, name : "GOD OF WAR (2018)" , image: "/public/imagenes/juegos_carrito/gow.jpg"},
    { id : 2, name : "SUPER MARIO ODYSSEY", image: "/public/imagenes/juegos_carrito/smo.jpg"},
    { id : 3, name : "ELDEN RING", image: "/public/imagenes/juegos_carrito/er.jpg"},
    { id : 4, name : "RED DEAD REDEMPTION 2", image: "/public/imagenes/juegos_carrito/rdr2.jpg"},
    { id : 5, name : "MINECRAFT", image: "/public/imagenes/juegos_carrito/mine.jpg"}
  ]
  
  return <div>
    <CartGames data={ lista }></CartGames> 
    
</div>
}

export default CartPage