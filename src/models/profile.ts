import { Ref, prop } from "@typegoose/typegoose";
import { Followers } from "./relations/followers";
import { Members } from "./relations/members";

export class Profile {
  @prop()
  name: string;

  @prop()
  avatar?: string;

  @prop()
  type : string;

  @prop({ default: Date.now() })
  createdAt: Date;

  @prop({ default: Date.now() })
  updatedAt: Date;

  @prop({
    ref: () => () => "Followers", // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "followingId", // no "doc" parameter provided here
    localField: () => "_id", // no "doc" parameter provided here
    justOne: false,
  })
  public followers?: Ref<Followers>[];

  @prop({
    ref: () => () => "Members", // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "profileId", // no "doc" parameter provided here
    localField: () => "_id", // no "doc" parameter provided here
    justOne: false,
  })
  public members?: Ref<Members>[];

  @prop()
  followerCount?: number;
}
