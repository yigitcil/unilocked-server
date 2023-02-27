import AuthController from "@modules/controllers/auth-controller";
import BaseController from "@modules/controllers/base-controller";
import { UserProfileController } from "@modules/controllers/user-profile-controller";
import e, { Express, Response, Router as ExpressRouter } from "express";
import { SocietyController } from "./controllers/society-controller";
import { ProjectController } from "./controllers/project-controller";

export class Router {
  constructor(private app: Express) {}

  public listen() {
    
    this.createRoute("auth", AuthController);
    this.createRoute("user-profile", UserProfileController);
    this.createRoute("society", SocietyController);
    this.createRoute("project", ProjectController);
  }

  public createRoute<Type extends BaseController>(
    path: string | null = null,
    controller: { new (): Type },
    base: string = "/api/"
  ) {
    const router = ExpressRouter();
    new controller().listen(router);
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
