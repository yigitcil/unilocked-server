import { Post } from "@models/post";
import { User } from "@models/user";
import { Ref, prop } from "@typegoose/typegoose";

export class PostReactions {
  @prop({ ref: () => Post })
  post: Ref<Post>;

  @prop()
  type: "like" | "dislike";

  @prop({ ref: () => User })
  user: Ref<User>;
}
