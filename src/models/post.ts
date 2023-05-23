import { getModelForClass, Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { Comment } from "./comment";
import { User } from "./user";
import { Society } from "./society";
import { University } from "./university";
import { Community } from "./community";
import { Profile } from "./profile";
import mongoose from "mongoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Post {
  @prop()
  text?: string;
  @prop((type) => [String])
  images?: string[];

  @prop((ref) => () => User)
  author?: Ref<User>;

  @prop({
    type: () => Profile,
    discriminators: () => [Society, University, Community, User],
  })
  postedBy?: Profile;

  @prop({ default: Date.now() })
  createdAt: Date;

  @prop({default: Date.now()})
  updatedAt: Date
}
