import { Quality } from "./quality";

export interface Video {
  
  title_id: string;
  season_number: number;
  episode_number: number;
  urls: Quality[];
  thumbnail: string;
  fid:string;
  dateAdded:number;
  translator:number;
}
