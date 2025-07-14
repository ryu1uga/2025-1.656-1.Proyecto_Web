export interface news {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  text: string;
  state: number;
  attachment:{
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
    newsId: number;
  }
}