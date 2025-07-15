import { useNavigate, useLocation } from "react-router-dom";
import type { juego, Comment } from '../../components/user/HomeJuego';
import { SeccionNavbar } from "../../components/user/SeccionNavbar";
import "./JuegoDetalle.css";
import { useState, useEffect } from "react";
import { API_URL } from "../../main";
import CartGames from "../../components/user/CartGames";

const JuegoDetalle = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { juego }: { juego: juego } = state || {
    juego: {
      id: 0,
      name: "Juego no encontrado",
      price: 0,
      description: "Sin descripción",
      company: "N/A",
      category: { name: "N/A" },
      sells: [],
      ratings: [],
      images: [],
      trailers: [],
    },
  };

  const trailerId = juego.trailers?.[0]?.url?.replace("https://www.youtube.com/watch?v=", "").trim() || "";
  const embedUrl = trailerId ? `https://www.youtube.com/embed/${trailerId}` : "https://www.youtube.com/embed/";

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [imageSources, setImageSources] = useState<string[]>([]); // Almacena las rutas de las imágenes
  
  const [carrito, setCarrito] = useState<juego[]>(() => {
    const storedCart = sessionStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const userId = Number(sessionStorage.getItem("userId"));

  useEffect(() => {
    // Cargar las imágenes solo una vez al montar el componente
    const gameNameForFolder = juego.name.toLowerCase().replace(/[\s:]+/g, '');
    const images = [1, 2, 3, 4, 5, 6].map((i) => {
      const imagePath = `/imagenes/juegos/${gameNameForFolder}/${i}.jpg`;
      // Preload la imagen y usa un fallback si falla
      const img = new Image();
      img.src = imagePath;
      return new Promise((resolve) => {
        img.onload = () => resolve(imagePath);
        img.onerror = () => resolve("https://via.placeholder.com/300x200?text=Imagen+No+Disponible");
      });
    });

    Promise.all(images).then((resolvedSources) => {
      setImageSources(resolvedSources as string[]);
    });
  }, [juego.name]); // Se ejecuta solo si el name del juego cambia

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const res = await fetch(`${API_URL}/cart?userId=${userId}`);
        const data = await res.json();
        setCarrito(data.carrito || []);
      } catch (err) {
        console.error("Error cargando carrito:", err);
      }
    };

    obtenerCarrito();
  }, [userId]);

  const handleAddComment = () => {
    if (newComment.trim() === "" || selectedStars === null) return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      text: newComment,
      likes: 0,
      dislikes: 0,
      rating: selectedStars * 2
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setSelectedStars(null);
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment));
  };

  const handleDislike = (id: number) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, dislikes: comment.dislikes + 1 } : comment));
  };

  // Recuperar carrito desde sessionStorage al montar el componente
  useEffect(() => {
    const storedCart = sessionStorage.getItem("carrito");
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito actualizado en sessionStorage cada vez que cambie
  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = () => {
    const yaExiste = carrito.some((item) => item.id === juego.id);
    if (!yaExiste) {
      const nuevoCarrito = [...carrito, juego];
      setCarrito(nuevoCarrito);
      console.log("Juego agregado al carrito");
    } else {
      console.log("Este juego ya está en el carrito");
    }
  };

  const averageRating = comments.length > 0
    ? (comments.reduce((acc, curr) => acc + (curr.rating || 0), 0) / comments.length).toFixed(1)
    : (juego.ratings.length > 0
      ? (juego.ratings.reduce((acc, r) => acc + r.rating, 0) / juego.ratings.length).toFixed(1)
      : "N/A");

  return (
    <div className="background-container">
      <SeccionNavbar toggleCarrito={() => setMostrarCarrito(prev => !prev)}/>
      <div className="container mt-4">
        <div className="JuegoDetalle-game-container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h3">{juego.name}</h1>
          </div>

          <div className="row">
            <div className="col-12 col-md-8 mb-3">
              <div className="card trailer-card">
                <div className="card-body text-center">
                  <h5 className="card-title">Trailer de {juego.name}</h5>
                  <iframe
                    width="100%"
                    height="400px"
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Trailer de ${juego.name}`}
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Detalles de juego</h5>
                  <p className="card-text fw-bold">Descripción:</p>
                  <p>{juego.description}</p>
                  <div className="mb-3">
                    <p><strong>Categoría:</strong> {juego.category.name}</p>
                    <p><strong>Ventas:</strong> {juego.sells.length}</p>
                    <p><strong>Desarrollado por:</strong> {juego.company}</p>
                    <p>{juego.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-stretch">
            <div className="col-12 col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Valoración promedio ({comments.length} usuarios)</h5>
                  <p>{averageRating}/10.00</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3 d-flex align-items-stretch">
              <button className="btn btn-primary btn-lg w-100" onClick={agregarAlCarrito}>COMPRAR AHORA</button>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <h5 className="mb-3">Galería</h5>
              <div className="JuegoDetalle-gallery-container">
                <div className="JuegoDetalle-gallery-inner">
                  {imageSources.map((src, index) => (
                    <div className="JuegoDetalle-gallery-item">
                      <div className="border rounded overflow-hidden" style={{ height: "200px", width: "300px" }}>
                        <img
                          src={src}
                          alt={`Imagen ${index + 1} de ${juego.name}`}
                          className="img-fluid h-100 w-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 bg-dark text-white rounded">
            <h4>RESEÑAS</h4>
            <div className="row">
              <div className="col-md-8">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Escribe tu comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <p className="mb-1">VALORACIÓN:</p>
                <div className="d-flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        color: selectedStars && selectedStars >= star ? "#ffc107" : "#ccc"
                      }}
                      onClick={() => setSelectedStars(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-light"
                  disabled={newComment.trim() === "" || selectedStars === null}
                  onClick={handleAddComment}
                >
                  Publicar
                </button>
              </div>
            </div>

            <hr className="border-light" />

            {comments.map((comment) => (
              <div key={comment.id} className="bg-secondary text-white p-3 mb-3 rounded">
                <p className="mb-1">{comment.text}</p>
                <p className="mb-1">{comment.rating}/10</p>
                <div className="d-flex gap-3">
                  <button className="btn btn-sm btn-outline-light" onClick={() => handleLike(comment.id)}>
                    👍 {comment.likes}
                  </button>
                  <button className="btn btn-sm btn-outline-light" onClick={() => handleDislike(comment.id)}>
                    👎 {comment.dislikes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {mostrarCarrito && (
          <CartGames data={carrito} actualizarCarrito={setCarrito} />
        )}
      </div>
    </div>
  );
};

export default JuegoDetalle;