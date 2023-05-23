import { DocumentType, getModelForClass, modelOptions, Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { Comment } from "./comment";
import { User } from "./user";
import { Society } from "./society";
import { University } from "./university";
import { Community } from "./community";
import { Profile } from "./profile";
import mongoose from "mongoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { PostReaction } from "./relations/post-reaction";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
export class Post {
  @prop()
  text?: string;
  @prop((type) => [String])
  images?: string[];

  @prop((ref) => () => User)
  author?: Ref<User>;

  @prop({
    ref: () => (doc: DocumentType<Post>) => doc.postedByType, // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "_id", // no "doc" parameter provided here
    localField: () => "postedById", // no "doc" parameter provided here
    justOne: true,
  })
  public postedBy?: Ref<Profile>;

  @prop({
    ref: () => () => "PostReaction", // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "post", // no "doc" parameter provided here
    localField: () => "_id", // no "doc" parameter provided here
    justOne: false,
  })
  public reactions?: Ref<PostReaction>[];

  @prop({
    ref: () => () => "Comment", // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "post", // no "doc" parameter provided here
    localField: () => "_id", // no "doc" parameter provided here
    justOne: false,
  })
  public comments?: Ref<Comment>[];

  @prop()
  public postedById?: mongoose.Types.ObjectId;

  @prop()
  public postedByType?: string;

  @prop()
  public reactionsCounts? : ReactionCounts

  @prop({ default: Date.now() })
  createdAt: Date;

  @prop({ default: Date.now() })
  updatedAt: Date;
}

export interface ReactionCounts {
  like: number;
  dislike: number;
}