import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller";
import { Post, PostModel } from "@models/post";
import mongoose from "mongoose";
import success from "@modules/responses/success";
import PaginateService from "@modules/services/paginate";
import { User, UserModel } from "@models/user";
import ensureAuthorized from "@modules/middleware/ensure-authorized";

export class PostController extends BaseController {
  //Get post by ID
  listen(router: Router): void {
    router.get("/:id", async (req, res, next) => {
      const post = await this.byId(req.params.id);

      res.send({
        sucess: true,
        data: post,
      });
      next();
    });

    //Get posts
    router.get("/", ensureAuthorized("posts.view"),async (req, res, next) => {
      const posts = PostModel.find();

      res.send(success(await PaginateService.paginate(req, PostModel, posts)));
      next();
    });

    //Add reaction
    router.post("/:id/:reaction", async (req, res, next) => {
      if (req.params.reaction !== "like" && req.params.reaction !== "dislike")
        res.status(404).send({ success: false, error: "Invalid reaction" });
      else {
        const result = await this.addReaction(
          req.user,
          req.params.id,
          req.params.reaction
        );
        res.send({ sucess: true, user: req.user });
        next();
      }
    });
  }

  public byId(_id: string) {
    return PostModel.findOne({ _id: new mongoose.Types.ObjectId(_id) });
  }

  public async addReaction(reqUser, postID: string, reaction: string) {
    const userController = new UserController();
    const user = userController.byId(reqUser._id);
    const post = await PostModel.findOne({
      _id: new mongoose.Types.ObjectId(postID),
    }).populate({
      path: reaction,
      match: {
        _id: reqUser._id,
      },
    }).exec()  
  

    if (reaction === "like") {
      await PostModel.updateOne(
        { _id: new mongoose.Types.ObjectId(postID) },
        post.likes.length === 0 ? { $push: { likes: user._id } } : { $pull: { likes: user._id } }
      );
      await UserModel.updateOne(
        { _id: new mongoose.Types.ObjectId(reqUser.id) },
        post.likes.length === 0 ? { $push: { postsLiked: post._id } } : { $pull: { postsLiked: post._id } }
      );
    } else {
      //Dislike
      await PostModel.updateOne(
        { _id: new mongoose.Types.ObjectId(postID) },
        post.dislikes.length === 0 ? { $push: { dislikes: user._id } } : { $pull: { dislikes: user._id } }
      );
      await UserModel.updateOne(
        { _id: new mongoose.Types.ObjectId(reqUser.id) },
        post.dislikes.length === 0 ? { $push: { postsDisliked: post._id } } : { $pull: { postsDisliked: post._id } }
      );
    }
  }
}
