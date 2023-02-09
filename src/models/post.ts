import { ObjectId } from "mongodb";
import { User } from "./user";

export class Post {
    id: ObjectId;
    text?: string;
    image_url?: any;
    likes?: User[];
}