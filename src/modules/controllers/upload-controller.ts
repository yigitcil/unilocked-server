import { use } from "passport";
import { Server } from "./../server";
import { Router } from "express";
import BaseController from "./base-controller";
import ensureAuthenticated from "../middleware/ensure-authenticated";
import ensureAuthorized from "../middleware/ensure-authorized";
import { FileModel } from "../../resolved-models";
import { v4 } from "uuid";
import { Server as TusServer } from "@tus/server";
import { S3Store } from "@tus/s3-store";

export class UploadController extends BaseController {
  private s3Store = new S3Store({
    partSize: 8 * 1024 * 1024, // Each uploaded part will have ~8MB,
    s3ClientConfig: {
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  private server: TusServer = new TusServer({
    path: "/files",
    datastore: this.s3Store,
    onUploadCreate: async (req:any, res, upload) => {
      console.log(req.user)
      return res
    },
  });

  constructor() {
    super();
  }

  listen(router: Router): void {
    router.all(
      "/upload",
      ensureAuthenticated,
      ensureAuthorized("files.create"),
      async (req, res, next) => {
        const name = v4();
        const file = await FileModel.create({
          name,
          user: req.user._id,
        });

        this.server.handle(req, res);
      }
    );
  }
}
