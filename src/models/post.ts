import { getModelForClass, Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { Comment } from "./comment";

export class Post {
  @prop()
  text?: string;
  @prop()
  image_url?: any;
  
  @prop({ref: ()=> Comment})
  comments?: Ref<Comment>[]
}
