import { Ref, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Talent } from "../../talent";
import { FeaturedContent } from "../profiles/featured-content";

export class UserJob {
  @prop({
    required: true,
  })
  userId: Types.ObjectId;

  @prop({
    default: Date.now,
  })
  joinedAt: Date;

  @prop({
    default: Date.now,
  })
  quitDate: Date;

  @prop()
  jobDescription?: string;

  @prop({
    ref: () => Talent,
  })
  talents?: Ref<Talent>;

  @prop({
    required: true,
  })
  jobId: Types.ObjectId;

  @prop({
    ref: () => "User",
    foreignField: () => "_id",
    localField: () => "userId",
    justOne: true,
  })
  user?: Types.ObjectId;

  @prop({
    ref: () => "Job",
    foreignField: () => "_id",
    localField: () => "jobId",
    justOne: true,
  })
  job?: Types.ObjectId;

  @prop({
    ref: FeaturedContent,
  })
  featuredContent?: Ref<FeaturedContent>;

  @prop({
    required: true,
  })
  current: boolean;
}
