import AuthController from "@modules/controllers/auth-controller";
import BaseController from "@modules/controllers/base-controller";
import e, { Express, Response, Router as ExpressRouter } from "express";
import { Db } from "mongodb";

export class Router {
  constructor(private app: Express, private db: Db) {}

  public listen() {
    
    this.createRoute("auth", AuthController);
    
  }

  public createRoute<Type extends BaseController>(
    path: string | null = null,
    controller: { new (db: Db): Type },
    base: string = "/api/"
  ) {
    const router = ExpressRouter();
    new controller(this.db).listen(router);
    if (path) {
      this.app.use(base + path, router);
    } else {
      this.app.use(base, router);
    }
  }

  public error(res: Response) {
    res.send({ success: false });
  }
}
