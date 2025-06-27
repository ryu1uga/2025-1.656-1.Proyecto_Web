export interface juego {
  id: number
  name: string
  price: number
  description: string
  company: string
  category: {
    name: string
  }
  sells: { amount: number }[]
  ratings: { rating: number }[]
  images: { url: string }[]
  trailers?: { url: string }[];
}

export interface Comment {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  rating: number; 
}