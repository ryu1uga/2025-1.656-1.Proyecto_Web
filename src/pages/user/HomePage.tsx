import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState } from "react";
import type { juego } from "../../components/user/HomeJuego";
import HomeNavbar from "../../components/user/HomeNavbar";0.

import Barra from "./Filtro_Precio_etc/BarraFiltros";
import HomeSlides from "../../components/user/HomeSlides";
import HomeList from "../../components/user/HomeList";
import BarraFiltros from "./Filtro_Precio_etc/BarraFiltros";

const HomePage = () => {
  useEffect(() => {
    localStorage.setItem('listaPrueba', JSON.stringify([
        { 
        "nombre": "The Legend of Zelda: Breath of the Wild", 
        "valoracion": "9.8", 
        "ventas": "31.5", 
        "categoria": "Action-Adventure",
        "descripcion": "Embárcate en una épica aventura en un vasto mundo abierto lleno de misterio y maravillas. Explora el reino de Hyrule, descubre santuarios antiguos, resuelve acertijos y combate contra criaturas mágicas mientras desentrañas la historia del héroe Link y la princesa Zelda.", 
        "comentarios": [], 
        "trailer": "zw47_q9wbBE" 
        },
        { 
        "nombre": "Red Dead Redemption 2", 
        "valoracion": "9.7", 
        "ventas": "61", 
        "categoria": "Action-Adventure",
        "descripcion": "Sumérgete en una épica historia ambientada en el salvaje oeste americano a finales del siglo XIX. Vive la vida de Arthur Morgan, un forajido de la banda Van der Linde, mientras enfrentas dilemas morales, robos, tiroteos y la lucha por sobrevivir en un mundo que cambia rápidamente.", 
        "comentarios": [], 
        "trailer": "gmA6MrX81z4" 
        },
        { 
        "nombre": "The Witcher 3: Wild Hunt", 
        "valoracion": "9.6", 
        "ventas": "50", 
        "categoria": "RPG",
        "descripcion": "Adéntrate en un vasto mundo de fantasía como Geralt de Rivia, un cazador de monstruos profesional. Embárcate en misiones épicas, explora un continente devastado por la guerra, toma decisiones que afectan la historia y enfréntate a criaturas míticas en combates estratégicos llenos de acción.", 
        "comentarios": [], 
        "trailer": "c0i88t0Kacs" 
        },
        { 
        "nombre": "God of War (2018)", 
        "valoracion": "9.5", 
        "ventas": "23", 
        "categoria": "Action-Adventure",
        "descripcion": "Acompaña a Kratos y su hijo Atreus en un viaje épico a través de la mitología nórdica. Disfruta de combates intensos, resuelve acertijos y descubre una narrativa emocional sobre la redención y la relación padre-hijo, todo en un mundo lleno de dioses y monstruos.", 
        "comentarios": [], 
        "trailer": "K0u_kAWLJOA" 
        },
        { 
        "nombre": "Elden Ring", 
        "valoracion": "9.5", 
        "ventas": "25", 
        "categoria": "RPG",
        "descripcion": "Explora las Tierras Intermedias, un vasto mundo abierto creado por FromSoftware y George R.R. Martin. Enfréntate a desafiantes enemigos, descubre secretos ocultos y forja tu propio camino en una aventura épica llena de combates intensos y exploración sin límites.", 
        "comentarios": [], 
        "trailer": "E3Huy2cdih0" 
        },
        { 
        "nombre": "Grand Theft Auto V", 
        "valoracion": "9.6", 
        "ventas": "185", 
        "categoria": "Action-Adventure",
        "descripcion": "Sumérgete en la vibrante ciudad de Los Santos y sus alrededores en este juego de mundo abierto. Sigue las historias entrelazadas de tres criminales mientras realizas atracos, exploras, participas en actividades ilegales y vives una experiencia llena de acción y libertad sin límites.", 
        "comentarios": [], 
        "trailer": "QkkoHAzjnUs" 
        },
        { 
        "nombre": "Super Mario Odyssey", 
        "valoracion": "9.2", 
        "ventas": "27", 
        "categoria": "Platformer",
        "descripcion": "Acompaña a Mario y su nuevo amigo Cappy en un viaje global para rescatar a la princesa Peach de Bowser. Explora reinos únicos, recolecta lunas para alimentar tu nave y disfruta de mecánicas de plataformas innovadoras en esta colorida y creativa aventura 3D.", 
        "comentarios": [], 
        "trailer": "wGQHQc_3ycE" 
        },
        { 
        "nombre": "Minecraft", 
        "valoracion": "9.0", 
        "ventas": "300", 
        "categoria": "Sandbox",
        "descripcion": "Crea y explora un mundo infinito generado proceduralmente, donde cada bloque puede ser tu herramienta para construir. Sobrevive a las noches, enfréntate a criaturas, mina recursos y desata tu creatividad en un juego que ha inspirado a millones de jugadores en todo el mundo.", 
        "comentarios": [], 
        "trailer": "MmB9b5njVbA" 
        },
        { 
        "nombre": "Horizon Zero Dawn", 
        "valoracion": "8.9", 
        "ventas": "24", 
        "categoria": "Action-RPG",
        "descripcion": "Explora un impresionante mundo postapocalíptico donde las máquinas dominan la tierra. Como Aloy, descubre los secretos de tu pasado, caza robots gigantes con estrategias únicas y desentraña los misterios de una civilización perdida en esta aventura visualmente espectacular.", 
        "comentarios": [], 
        "trailer": "u4-FCsiF5x4" 
        },
        { 
        "nombre": "Cyberpunk 2077", 
        "valoracion": "8.5", 
        "ventas": "25", 
        "categoria": "RPG",
        "descripcion": "Adéntrate en Night City, una metrópoli futurista donde las megacorporaciones controlan todo. Personaliza a tu personaje, toma decisiones que moldean la historia y vive una experiencia inmersiva llena de acción, tecnología avanzada y dilemas morales en un mundo cyberpunk vibrante.", 
        "comentarios": [], 
        "trailer": "8X2kIfS6fb8" 
        },
        { 
        "nombre": "Haxball", 
        "valoracion": "10.0", 
        "ventas": "100", 
        "categoria": "Sports",
        "descripcion": "Disfruta de un juego multijugador en línea de fútbol con mecánicas simples pero adictivas. Controla un disco en un campo 2D, compite contra otros jugadores en partidas rápidas y demuestra tus habilidades en este título minimalista que ha ganado popularidad por su jugabilidad directa y divertida.", 
        "comentarios": [], 
        "trailer": "OTv7xd8PTpg" 
        }
    ]));
    }, []);
  
  const ListaJ = localStorage.getItem("listaPrueba");

  let prueba: juego[];
  if (ListaJ == null) {
    prueba = [];
  } else {
    prueba = JSON.parse(ListaJ);
  }

  const [juegos, setjuegos] = useState<juego[]>(prueba);

  const ordenarPorVentas = () => {
    const ordenado = [...juegos].sort((a, b) => parseFloat(b.ventas) - parseFloat(a.ventas));
    setjuegos(ordenado);
  };

  const ordenarPorValoracion = () => {
    const ordenado = [...juegos].sort((a, b) => parseFloat(b.valoracion) - parseFloat(a.valoracion));
    setjuegos(ordenado);
  };

  const Restablecer = () => {
    setjuegos(prueba);
  };

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
  );
};

export default HomePage;