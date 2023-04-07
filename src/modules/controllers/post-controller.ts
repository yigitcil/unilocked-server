import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller";
import { PostModel } from "@models/post";
import mongoose from "mongoose";
import success from "@modules/responses/success";
import PaginateService from "@modules/services/paginate";
import { UserModel } from "@models/user";

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
    router.get("/", async (req, res, next) => {
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

    //Save the post
    router.post("/:id/save", async (req, res, next) => {
      await this.save(req.params.id, req.user._id);
      res.send({ sucess: true, post: await this.byId(req.params.id) });
      next();
    });

    //Delete the post from the saved posts
    router.post("/:id/deletebookmark", async (req, res, next) => {
      await this.deleteBookmark(req.params.id, req.user._id);
      res.send({ sucess: true, post: await this.byId(req.params.id) });
      next();
    });
    
    //Check if the user has saved the post.
    router.get("/:id/issaved", async(req, res, next) => {
      const result = await this.isSaved(req.params.id, req.user._id);
      res.send({ 
        success: true,
        data: result
       });
       next();
    });
  }

  public async byId(_id: string) {
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

  public async save(postID: string, userID: mongoose.Types.ObjectId) {
    await UserModel.updateOne({ _id: userID }, { $push: { postsSaved: postID } })
  }

  public async deleteBookmark(postID: string, userID: mongoose.Types.ObjectId) {
    await UserModel.updateOne({ _id: userID }, { $pull: { postsSaved: postID } })
  }

  public async isSaved(postID: string, userID: mongoose.Types.ObjectId): Promise<boolean> {
    return await UserModel.findOne({ _id: userID, postsSaved: { $in: [postID] } }).count() > 0;
  }
}