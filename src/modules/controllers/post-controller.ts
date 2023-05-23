import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller";
import { param } from "express-validator";
import mongoose from "mongoose";
import { PostReactionModel } from "../../models/relations/post-reaction";
import ensureAuthorized from "../middleware/ensure-authorized";
import success from "../responses/success";
import PaginateService from "../services/paginate";
import { PostModel, UserModel } from "../../resolved-models";

export class PostController extends BaseController {
  //Get post by ID
  listen(router: Router): void {
    router.get(
      "/:id",
      ensureAuthorized("posts.view"),
      param("id").isMongoId(),
      async (req, res, next) => {
        const post = await this.byId(req.params.id);

        res.send({
          sucess: true,
          data: post,
        });
        next();
      }
    );

    router.post(
      "/",
      ensureAuthorized("posts.create"),
      async (req, res, next) => {
        const post = await PostModel.create({
          text: req.body.text,
          images: req.body.images,
          postedById: req.user._id,
          postedByType: req.user.type,
          author: req.user._id,
        });

        res.send(success(post));
      }
    );

    //Get posts
    router.get("/", ensureAuthorized("posts.view"), async (req, res, next) => {
      const posts = PostModel.find();
      res.send(success(await PaginateService.paginate(req, PostModel, posts)));
      next();
    });

   

    //Save the post
    router.post(
      "/:id/save",
      ensureAuthorized("posts.view"),
      param("id").isMongoId(),
      async (req, res, next) => {
        await this.save(req.params.id, req.user._id);
        res.send({ sucess: true, post: await this.byId(req.params.id) });
        next();
      }
    );

    //Delete the post from the saved posts
    router.post(
      "/:id/deletebookmark",
      ensureAuthorized("posts.view"),
      param("id").isMongoId(),
      async (req, res, next) => {
        await this.deleteBookmark(req.params.id, req.user._id);
        res.send({ sucess: true, post: await this.byId(req.params.id) });
        next();
      }
    );

    //Check if the user has saved the post.
    router.get(
      "/:id/issaved",
      ensureAuthorized("posts.view"),
      param("id").isMongoId(),
      async (req, res, next) => {
        const result = await this.isSaved(req.params.id, req.user._id);
        res.send({
          success: true,
          data: result,
        });
        next();
      }
    );

     //Add reaction
     router.post(
      "/:id/:reaction",
      ensureAuthorized("posts.view"),
      param("id").isMongoId(),
      async (req, res, next) => {
        if (req.params.reaction !== "like" && req.params.reaction !== "dislike")
          res.status(404).send({ success: false, error: "Invalid reaction" });
        else {
          const result = await this.addReaction(
            req.user,
            req.params.id,
            req.params.reaction
          );
          res.send({ sucess: true, data : result });
          next();
        }
      }
    );
  }

  public async byId(_id: string) {
    return PostModel.findOne({ _id: new mongoose.Types.ObjectId(_id) });
  }

  public async addReaction(reqUser, postID: string, reaction: string) {
    const userController = new UserController();
    const user = userController.byId(reqUser._id);
    const post = await PostModel.findOne({
      _id: new mongoose.Types.ObjectId(postID),
    }).exec();

    const isLiked = await PostReactionModel.findOne({
      post: post._id,
      user: user._id,
      reaction: reaction,
    });

    if (!post.reactions) {
      post.reactions = {
        like: 0,
        dislike: 0,
      };
    }

    if (isLiked) {
      await PostReactionModel.deleteOne({
        post: post._id,
        user: user._id,
        reaction: reaction,
      });
      post.reactions[reaction] -= 1;
    } else {
      await PostReactionModel.create({
        post: post._id,
        user: user._id,
        reaction: reaction,
      });
      post.reactions[reaction] += 1;
    }
    return await post.save();
  }

  public async save(postID: string, userID: mongoose.Types.ObjectId) {
    await UserModel.updateOne(
      { _id: userID },
      { $push: { postsSaved: postID } }
    );
  }

  public async deleteBookmark(postID: string, userID: mongoose.Types.ObjectId) {
    await UserModel.updateOne(
      { _id: userID },
      { $pull: { postsSaved: postID } }
    );
  }

  public async isSaved(
    postID: string,
    userID: mongoose.Types.ObjectId
  ): Promise<boolean> {
    return (
      (await UserModel.findOne({
        _id: userID,
        postsSaved: { $in: [postID] },
      }).count()) > 0
    );
  }
}
