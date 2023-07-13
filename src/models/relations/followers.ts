import { ObjectId } from "mongodb";
import { DocumentType, Ref, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Profile } from "../profile";

export class Followers {
  @prop({
    ref: () => (doc: DocumentType<Followers>) => doc.followerType, // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "_id", // no "doc" parameter provided here
    localField: () => "followerId", // no "doc" parameter provided here
    justOne: true,
  })
  public follower?: Ref<Profile>;

  @prop({
    ref: () => (doc: DocumentType<Followers>) => doc.followingType, // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "_id", // no "doc" parameter provided here
    localField: () => "followingId", // no "doc" parameter provided here
    justOne: true,
  })
  public following?: Ref<Profile>;

  @prop()
  followerType: string;

  @prop()
  followerId: Types.ObjectId;

  @prop()
  followingId: Types.ObjectId;

  @prop()
  followingType: string;
}
