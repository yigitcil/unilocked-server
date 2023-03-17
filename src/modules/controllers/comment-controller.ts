import { CommentModel } from "@models/comment";
import { PostModel } from "@models/post";
import { OID } from "@modules/helpers/generate-object-id";
import { Router } from "express";
import BaseController from "./base-controller";

export default class CommentController extends BaseController {
  listen(router: Router): void {}

  private async createComment(postID: string, userID, message: string) {
    this.validateComment(message);

    const newComment = new CommentModel({
      post: OID(postID),
      author: userID,
      text: message,
    });

    const savedComment = await newComment.save();

    //Add comment to post
    PostModel.updateOne({ _id: postID }, { $push: { comments: savedComment._id } })


    return savedComment;
  }

  // Be sure message length is more than 4 and less than 250
  private async validateComment(message: string) {

    if (message.length < 4 || message.length > 250) {
      throw new Error("Comment must be between 4 and 250 characters");
    }
    // Check for bad words
    // ...
  }
}
