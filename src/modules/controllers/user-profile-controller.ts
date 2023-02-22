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
    const userController = new UserController();
    const user = userController.byUsername(id);
    const userToReturn = {};

    return user;
  }
}
