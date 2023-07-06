import { ObjectId } from "mongodb";
import { DocumentType, Ref, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Profile } from "../profile";
import { User } from "../user";
import { Role } from "../role";

export class Members {
  @prop({
    ref: () => (doc: DocumentType<Members>) => "User", // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "_id", // no "doc" parameter provided here
    localField: () => "memberId", // no "doc" parameter provided here
    justOne: true,
  })
  public member?: Ref<User>;

  @prop({
    ref: () => (doc: DocumentType<Members>) => doc.profileType, // This need to be written this way, because since typegoose "7.1", deferred function are supported
    foreignField: () => "_id", // no "doc" parameter provided here
    localField: () => "profileId", // no "doc" parameter provided here
    justOne: true,
  })
  public profile?: Ref<Profile>;

  @prop()
  memberId: Types.ObjectId;

  @prop()
  profileId: Types.ObjectId;

  @prop()
  profileType: string;

  @prop({ ref: () => Role })
  memberRole: Ref<Role>;
}
