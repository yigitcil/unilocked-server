import { User } from "./user";
import { getModelForClass, Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { Post } from "./post";

export class Community {
  @prop()
  name: string;
  @prop()
  summary: string;
  @prop()
  description: string;

  @prop()
  backdrop: string;

  @prop()
  poster: string;

  @prop()
  tags: string[];

  @prop({ ref: () => User })
  followers: Ref<User>;

  @prop({ ref: () => User })
  contributors: Ref<User>[];

  @prop({ ref: () => User })
  likes: Ref<User>[];
  @prop({ type: () => [String] })
  links: string[];
}

