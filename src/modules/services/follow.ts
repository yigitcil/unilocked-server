import { ObjectId } from "mongodb";
import { Profile } from "./../../models/profile";
import { ReturnModelType } from "@typegoose/typegoose";
import { BeAnObject, DocumentType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { FollowersModel } from "../../resolved-models";

export class FollowService {
  constructor(private model: ReturnModelType<typeof Profile, BeAnObject>) {}

  public async follow(
    profileId: Types.ObjectId,
    followerId: Types.ObjectId
  ): Promise<Boolean> {
    const profile = await this.model.findById(profileId);
    const type = profile.type;
    const follower = FollowersModel.find({
      followerId: followerId,
      followingId: profileId,
    });
    const count = await follower.count();
    if (count > 0) {
      await follower.remove();
      profile.followerCount = profile.followerCount - 1;
      await profile.save();
      return false;
    } else {
      const newFollower = new FollowersModel();
      newFollower.followerId = followerId;
      newFollower.followingId = profileId;
      newFollower.followerType = "User";
      newFollower.followingType = type;
      await newFollower.save();
      profile.followerCount = profile.followerCount + 1;
      await profile.save();
      return true;
    }
  }
}
