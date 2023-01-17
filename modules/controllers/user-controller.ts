import axios from "axios";
import { Collection, Db, ObjectId } from "mongodb";
import { Video } from "../../models/video";

export class UserController {
  constructor(private db: Db) {}

  private get users(): Collection {
    return this.db.collection("users");
  }

}
