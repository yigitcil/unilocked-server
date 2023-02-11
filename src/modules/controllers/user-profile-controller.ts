import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller";

export class UserProfileController extends BaseController {
  listen(router: Router): void {
    router.get("/:username", async (req, res, next) => {
      const user = await this.byUserName(req.params.username);
      res.send({
        sucess: true,
        data: user,
      });
    });
  }

  public byUserName(id: string) {
    const userController = new UserController(this.db);
    const user = userController.byUsername(id);
    const userToReturn = {};

    const keys = ["posts", "followers", "university", "projectsParticipated"];

    Object.keys(user).forEach((key) => {
      if (keys.includes(key)) userToReturn[key] = user[key];
    });

    return userToReturn;
  }
}
