import { CommentModel } from "@models/comment";
import { PostModel } from "@models/post";
import { OID } from "@modules/helpers/generate-object-id";
import { Router } from "express";
import BaseController from "./base-controller";

export default class CommentController extends BaseController {
  listen(router: Router): void {
    router.post("/:id", async (req, res, next) => {
      const comment = await this.createComment(
        req.params.id,
        req.user._id,
        req.body.message
      );

      res.send({
        success: true,
        data: comment,
      });
      next();
    });

    router.delete("/:id", async (req, res, next) => {
      const result = await this.deleteComment(req.params.id);

      res.send({
        success: true,
        data: result,
      });
      next();
    });

    router.post("/:id/edit", async (req, res, next) => {
      const result = await this.editComment(req.params.id, req.body.message);

      res.send({
        success: true,
        data: result,
      });
      next();
    });
  }

  private async deleteComment(commentID: string) {
    const comment = await CommentModel.findById(OID(commentID));
    await comment.remove();
    await PostModel.updateOne(
      { _id: comment.post },
      { $pull: { comments: OID(commentID) } }
    );

    return comment;
  }

  //edit comment
  public async editComment(commentID: string, message: string) {
    this.validateComment(message);
    const comment = await CommentModel.findById(OID(commentID));
    const updatedComment = await comment.save();
    return updatedComment;
  }

  private async createComment(postID: string, userID, message: string) {
    this.validateComment(message);

    const newComment = new CommentModel({
      post: OID(postID),
      author: userID,
      text: message,
    });

    const savedComment = await newComment.save();

    //Add comment to post
    PostModel.updateOne(
      { _id: postID },
      { $push: { comments: savedComment._id } }
    );

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
