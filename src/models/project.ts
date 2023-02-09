import { ObjectId } from "mongodb";
import { Post } from "./post";

export class Project {
    id: ObjectId;
    name: string;
    summary: string;
    description: string;

    //Target
    currency: string;
    amount: number;

    tags: string[];
    daysRemaining: number;
    numberOfFollowers: number;
    posts: Post[];
    likes: Post[];
    links: string[];
}