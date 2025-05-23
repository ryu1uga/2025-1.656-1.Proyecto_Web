export interface juego{
    nombre: string;
    categoria: string;
    valoracion: string;
    ventas: string;
    empresa: string;
    descripcion: string;
    comentarios: string[];
    trailer: URL;
    imagenes: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
}

export interface Comment {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  rating: number; 
}