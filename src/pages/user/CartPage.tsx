import CartGames, { type Games } from "../../components/user/CartGames";
import "./CartPage.css";

const CartPage = () => {
  const lista : Games[] = [
    { id : 1, name : "GOD OF WAR" },
    { id : 2, name : "RAYMAN" },
    { id : 3, name : "METAL GEAR SOLID" },
    { id : 4, name : "DARK SOULS" },
    { id : 5, name : "POKEMON" }
  ]
  
  return <div>
    <CartGames data={ lista }></CartGames> 
    
</div>
}

export default CartPage