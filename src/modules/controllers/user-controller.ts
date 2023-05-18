
import { Router } from "express";
import mongoose from "mongoose";
import BaseController from "./base-controller";
import { UserModel } from "../../models/user";


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
