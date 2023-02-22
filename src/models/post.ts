import { getModelForClass } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import mongoose from "mongoose";

import { User } from "./user";

export class Post {
  @prop()
  _id: mongoose.Types.ObjectId;
  @prop()
  text?: string;
  @prop()
  image_url?: any;
  @prop({ type: () => [User] })
  likes?: User[];
}

const PostModel = getModelForClass(Post);

export { PostModel };
