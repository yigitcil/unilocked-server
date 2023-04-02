import { User, UserModel } from "@models/user";
import BaseController from "@modules/controllers/base-controller";
import { Router } from "express";
import mongoose from "mongoose";


export class UserController extends BaseController{


  listen(router: Router): void {
   
  }

  public byEmail(email: string) {
    return UserModel.findOne({ email: email });
  }
  public byId(_id: string) {
    return UserModel.findOne({ _id: new mongoose.Types.ObjectId(_id) });
  }

  public byUsername(username: string) {
    return UserModel.findOne({ username: username });
  }
}
