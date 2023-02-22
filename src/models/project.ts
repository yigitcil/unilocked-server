import { User } from "@models/user";
import { prop } from "@typegoose/typegoose/lib/prop";
import mongoose from "mongoose";
import { Post } from "./post";

export class Project {
  @prop()
  _id: mongoose.Types.ObjectId;;
  @prop()
  name: string;
  @prop()
  summary: string;
  @prop()
  description: string;

  //Target
  @prop()
  currency: string;
  @prop()
  amount: number;
  @prop()
  tags: string[];
  @prop()
  daysRemaining: number;
  @prop()
  numberOfFollowers: number;
  @prop({ type: () => [Post] })
  posts: Post[];
  @prop({ type: () => [User] })
  likes: User[];
  @prop({ type: () => [String] })
  links: string[];
}
