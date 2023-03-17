import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller";
import { Post, PostModel } from "@models/post";
import mongoose from "mongoose";
import success from "@modules/responses/success";
import PaginateService from "@modules/services/paginate";
import { User, UserModel } from "@models/user";

export class PostController extends BaseController {
    //Get post by ID
    listen(router: Router): void {  
      router.get("/:id", async (req, res, next) => {
        const post = await this.byId(req.params.id);
        
        res.send({
          sucess: true,
          data: post,
        });
        next()
      });

      //Get posts
      router.get("/", async (req, res, next) => {
        const posts = PostModel.find();
  
        res.send(success(await PaginateService.paginate(req, PostModel, posts)));
        next()
      });
      
      //Add reaction
      router.post("/:id/:reaction", async (req, res, next) => {
          if (req.params.reaction !== "like" && req.params.reaction !==  "dislike")
            res.status(404).send({success : false, error : "Invalid reaction"});
          
          else {
            this.addReaction(req.user, req.params.id, req.params.reaction);
            res.send({sucess : true, user : req.user});
            next();
          }
        });
    }

    public byId(_id: string) {
      return PostModel.findOne<Post>({ _id: new mongoose.Types.ObjectId(_id) });
    }
    
    public addReaction(reqUser, postID, reaction) {
      const userController = new UserController();
      const user = userController.byId(reqUser.id);
      const post = this.byId(postID);

      if (reaction === "like") {
        PostModel.updateOne<Post>({_id: new mongoose.Types.ObjectId(postID)}, {$push: {likes: user}});
        UserModel.updateOne<User>({_id: new mongoose.Types.ObjectId(reqUser.id)}, {$push: {postsLiked: post}});
      }
      else { //Dislike
        PostModel.updateOne<Post>({_id: new mongoose.Types.ObjectId(postID)}, {$push: {dislikes: user}});
        UserModel.updateOne<User>({_id: new mongoose.Types.ObjectId(reqUser.id)}, {$push: {postsDisliked: post}});
      }
    }
}