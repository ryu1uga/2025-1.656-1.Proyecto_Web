import { API_URL } from "../../main"
import "./HomePage.css"
import "./CartPage.css"
import { useEffect, useState } from "react"
import type { juego } from "../../components/user/HomeJuego"
import HomeNavbar from "../../components/user/HomeNavbar"
import HomeSlides from "../../components/user/HomeSlides"
import HomeList from "../../components/user/HomeList"
import CartGames from "../../components/user/CartGames"

const HomePage = () => {
  
  const [juegos, setjuegos] = useState<juego[]>([])
  const [mostrarCarrito, setMostrarCarrito] = useState<boolean>(false)

  const ObtenerJuegos = async () => {
    const response = await fetch(`${API_URL}/games`)
    const data = await response.json()

    if (Array.isArray(data.data)) {
      setjuegos(data.data)
      sessionStorage.setItem('listaJuegos', JSON.stringify(data.data))
    } else {
      console.error("La propiedad 'data' no es un array:", data)
      setjuegos([])
    }
  }
  
  useEffect(() => {ObtenerJuegos()}, [])
  
  const ListaJ = sessionStorage.getItem("listaJuegos")

  let lista: juego[]
  if (ListaJ == null) {
    lista = []
  } else {
    lista = JSON.parse(ListaJ)
  }

  const ordenarPorVentas = () => {
    const ordenado = [...juegos].sort((a, b) => parseFloat(b.sells) - parseFloat(a.sells))
    setjuegos(ordenado)
  }

  const ordenarPorValoracion = () => {
    const ordenado = [...juegos].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    setjuegos(ordenado)
  }

  const Restablecer = () => {
    setjuegos(lista)
  }

  const toogleCarrito = () => {
    setMostrarCarrito(prev => !prev)
  }

  return (
    <div className="background-container">
      <HomeNavbar 
        OrdenarVentas={ordenarPorVentas}
        OrdenarValoracion={ordenarPorValoracion}
        Restablecer={Restablecer}
        toggleCarrito={toogleCarrito}
      />
      <div className="container my-5">

          <div className="content-column">
            <HomeSlides />
            <HomeList juegos={juegos} />
            {mostrarCarrito && <CartGames data={juegos} />}
          </div>

      </div>
    </div>
  )
}

export default HomePage