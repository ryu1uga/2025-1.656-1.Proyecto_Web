export interface juego {
  id: number;
  name: string;
  price: number;
  description: string;
  company: string;
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  sells: {
    amount: number;
  }[];
  ratings: {
    rating: number;
  }[];
  images: {
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
    gameId: number;
  }[];
  trailers?: {
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
    gameId: number;
  }[];
}

export interface Comment {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  rating: number; 
}