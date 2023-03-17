import { getModelForClass, Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";

import { User } from "./user";

export class Post {
  @prop()
  text?: string;
  @prop()
  image_url?: any;
  @prop({ ref: () => User })
  likes?: Ref<User>[];
  @prop({ ref: () => User })
  dislikes?: Ref<User>[];
}

const PostModel = getModelForClass(Post);

export { PostModel };
