import { User } from "@models/user";
import BaseController from "@modules/controllers/base-controller";
import { Router } from "express";
import { Collection, Db, ObjectId } from "mongodb";

export class UserController extends BaseController{


  listen(router: Router): void {
   
  }

  private get users(): Collection {
    return this.db.collection("users");
  }

  public byEmail(email: string) {
    return this.users.findOne({ email: email });
  }
  public byId(_id: string) {
    return this.users.findOne<User>({ _id: new ObjectId(_id) });
  }
}
