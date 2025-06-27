export interface juego{
    id: number
    name: string
    rating: string
    price: number
    category: string
    description: string
    coments?: string[]
    sells: string
    company: string
    images_url?: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
    trailer?: URL
    state: number
}

export interface Comment {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  rating: number; 
}