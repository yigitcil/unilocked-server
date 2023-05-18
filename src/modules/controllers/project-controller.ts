import { Router } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { ProjectModel, Project } from "../../models/project";
import ensureAuthorized from "../middleware/ensure-authorized";
import success from "../responses/success";
import PaginateService from "../services/paginate";
import BaseController from "./base-controller";



export class ProjectController extends BaseController {
  listen(router: Router): void {
    //Get project by ID
    router.get(
      "/:id",
      ensureAuthorized("projects.view"),
      param("id").isMongoId(),
      async (req, res, next) => {
        const project = await this.byId(req.params.id);
        res.send({
          sucess: true,
          data: project,
        });
        next();
      }
    );

    //Get project
    router.get(
      "/",
      ensureAuthorized("projects.view"),
      async (req, res, next) => {
        const projects = ProjectModel.find();

        res.send(
          success(await PaginateService.paginate(req, ProjectModel, projects))
        );
        next();
      }
    );
  }

  public byId(_id: string) {
    return ProjectModel.findOne<Project>({
      _id: new mongoose.Types.ObjectId(_id),
    });
  }
}
