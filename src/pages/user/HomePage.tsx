import { API_URL } from "../../main"
import "./HomePage.css"
import { useEffect, useState } from "react"
import type { juego } from "../../components/user/HomeJuego"
import HomeNavbar from "../../components/user/HomeNavbar"
import HomeSlides from "../../components/user/HomeSlides"
import HomeList from "../../components/user/HomeList"

const HomePage = () => {
  
  const [juegos, setjuegos] = useState<juego[]>([])

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
    const ordenado = [...juegos].sort((a, b) => {
      const totalA = a.sells.reduce((sum, sell) => sum + sell.amount, 0)
      const totalB = b.sells.reduce((sum, sell) => sum + sell.amount, 0)
      return totalB - totalA
    })
    setjuegos(ordenado)
  }

  const ordenarPorValoracion = () => {
    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1)
    const ordenado = [...juegos].sort((a, b) => {
      const avgA = avg(a.ratings.map(r => r.rating))
      const avgB = avg(b.ratings.map(r => r.rating))
      return avgB - avgA
    })
    setjuegos(ordenado)
  }

  const Restablecer = () => {
    setjuegos(lista)
  }

  return (
    <div className="background-container">
      <HomeNavbar 
        OrdenarVentas={ordenarPorVentas}
        OrdenarValoracion={ordenarPorValoracion}
        Restablecer={Restablecer}
      />
      <div className="container my-5">

          <div className="content-column">
            <HomeSlides />
            <HomeList juegos={juegos} />
          </div>

      </div>
    </div>
  )
}

export default HomePage