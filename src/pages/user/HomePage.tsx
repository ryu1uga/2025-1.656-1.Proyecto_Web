import { API_URL } from "../../main"
import "./HomePage.css"
import "./CartPage.css"
import { useEffect, useState } from "react"
import type { juego } from "../../components/user/HomeJuego"
import type { news } from "../../components/user/HomeNews"
import HomeNavbar from "../../components/user/HomeNavbar"
import HomeSlides from "../../components/user/HomeSlides"
import HomeList from "../../components/user/HomeList"
import CartGames from "../../components/user/CartGames"
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  
  const [juegos, setjuegos] = useState<juego[]>([])
  const [carrito, setCarrito] = useState<juego[]>([])
  const [news, setnews] = useState<news[]>([])
  const [mostrarCarrito, setMostrarCarrito] = useState<boolean>(false)
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("busqueda")?.toLowerCase() || "";
  console.log("Buscando:", busqueda);

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");
  const userId = user?.id;

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

  const ObetenerNews = async() =>{
    const response = await fetch(`${API_URL}/news`)
    const data = await response.json()

    if (Array.isArray(data.data)) {
      setjuegos(data.data)
      sessionStorage.setItem('newslist', JSON.stringify(data.data))
    } else {
      console.error("La propiedad 'data' no es un array:", data)
      setnews([])
    }
  }
  useEffect(() => {ObetenerNews()}, [])
  
  const ListaN = sessionStorage.getItem("newslist")

  let list: news[]
  if (ListaN == null) {
    list = []
  } else {
    list = JSON.parse(ListaN)
  }

  const ObtenerCarritoBD = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_URL}/cart?userId=${userId}`);
      const data = await response.json();

      if (Array.isArray(data.carrito)) {
        setCarrito(data.carrito);
      } else {
        console.warn("Carrito no válido o vacío en la BD");
      }
    } catch (error) {
      console.error("Error al obtener carrito desde la BD:", error);
    }
  };
  
  useEffect(() => { ObtenerCarritoBD() }, []);

  useEffect(() => {
    const carritoGuardado = sessionStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);
  
  const ordenarPorVentas = async () => {
    try {
        const response = await fetch(`${API_URL}/games/sells`); // Ajusta la URL según tu backend
        const data = await response.json();
        console.log("Juegos ordenados por ventas:", data);
        if (Array.isArray(data.data)) {
          setjuegos(data.data)
          sessionStorage.setItem('listaJuegos', JSON.stringify(data.data))
        } else {
          console.error("La propiedad 'data' no es un array:", data)
          setjuegos([])
        }
        // Si estás usando estado para renderizar los juegos:
    } catch (error) {
        console.error("Error al ordenar por ventas", error);
    }
};

  

  const promedio = (ratings: { rating: number }[]) => 
  ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1)

  const ordenarPorValoracion = async() => {
    try {
        const response = await fetch(`${API_URL}/games/ratings`); // Ajusta la URL según tu backend
        const data = await response.json();
        console.log("Juegos ordenados por ventas:", data);
        if (Array.isArray(data.data)) {
          setjuegos(data.data)
          sessionStorage.setItem('listaJuegos', JSON.stringify(data.data))
        } else {
          console.error("La propiedad 'data' no es un array:", data)
          setjuegos([])
        }
        // Si estás usando estado para renderizar los juegos:
    } catch (error) {
        console.error("Error al ordenar por ventas", error);
    }
  }

  const Restablecer = () => {
    ObtenerJuegos();
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
            <HomeSlides news = {news} />
            <HomeList
              juegos={busqueda
                ? juegos.filter(j => j.name.toLowerCase().includes(busqueda))
                : juegos}
            />
            {mostrarCarrito && <CartGames data={carrito} actualizarCarrito={setCarrito}/>}
          </div>

      </div>
    </div>
  )
}

export default HomePage