import { Response, Router } from "express";
import BaseController from "./base-controller";
import { CommunityModel } from "../../resolved-models";
import { FollowService } from "../services/follow";
import { param } from "express-validator";
import success from "../responses/success";

export default class CommunityController extends BaseController {
  listen(router: Router): void {
    // follow
    router.post(
      "/:id/follow",
      param("id").isMongoId(),
      this.followCommunity.bind(this)
    );
  }

  async followCommunity(req, res: Response) {
    const followService = new FollowService(CommunityModel);
    const profileId = req.params.id;
    const followerId = req.user._id;
    const result = await followService.follow(profileId, followerId);
    res.send(
      success({
        followed: result,
      })
    );
  }
}
