import { User, UserModel } from "@models/user";
import success from "@modules/responses/success";
import PaginateService from "@modules/services/paginate";
import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller";
import mongoose from "mongoose";

export class UserProfileController extends BaseController {
  listen(router: Router): void {

    router.get("/:username", async (req, res, next) => {
      const user = await this.byUserName(req.params.username);
      res.send({
        sucess: true,
        data: user,
      });
      next()
    });
    
    router.get("/", async (req, res, next) => {
      const users = await UserModel.find();

      res.send(success(await PaginateService.paginate(req, UserModel, users)));
      next()
    });

    router.get("/:username/savedposts", async(req, res, next) => {
      if (req.user._id.toString() !== (await this.byUserName(req.params.username)).id) {
        res.status(403).send('The user does not have the permission.');
        next();
      }
      else {
        const posts = await this.getSavedPosts(req.user._id, req.query.page, req.query.perPage);
        res.send({
          success: true,
          data: posts
        });
      }
      next();
    });
  }

  public async byUserName(username: string) {
    const userController = new UserController();
    const user = userController.byUsername(username);
    return user;
  }

  public async getSavedPosts(userID: mongoose.Types.ObjectId, reqPage, perPage) {
    const page = parseInt((reqPage as string) || "1");

    return UserModel.findOne({ _id: userID }).select('postsSaved').populate({
      path: 'postsSaved',
      select: ['text', 'image_url'],
      options: {
        limit: parseInt((perPage as string) || "15"),
        skip: (page - 1) * perPage
      }
    }).exec();
  }
}
