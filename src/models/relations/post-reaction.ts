import { Post } from "@models/post";
import { User } from "@models/user";
import { Ref, getModelForClass, prop } from "@typegoose/typegoose";

export class PostReaction {
  @prop({ ref: () => Post })
  post: Ref<Post>;

  @prop()
  type: "like" | "dislike";

  @prop({ ref: () => User })
  user: Ref<User>;
}

const PostReactionModel = getModelForClass(PostReaction);

export {PostReactionModel}