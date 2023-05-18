import { Router } from "express";
import { param } from "express-validator";
import mongoose from "mongoose";
import { SocietyModel, Society } from "../../models/society";
import ensureAuthorized from "../middleware/ensure-authorized";
import success from "../responses/success";
import PaginateService from "../services/paginate";
import BaseController from "./base-controller";


export class SocietyController extends BaseController {
    listen(router: Router): void {
  
      //Get society by ID
      router.get("/:id", ensureAuthorized('societies.view'), param('id').isMongoId(),async (req, res, next) => {
        const society = await this.byId(req.params.id);
        res.send({
          sucess: true,
          data: society,
        });
        next()
      });

      //Get socities
      router.get("/",ensureAuthorized('societies.view'), async (req, res, next) => {
        const socities = SocietyModel.find();
  
        res.send(success(await PaginateService.paginate(req, SocietyModel, socities)));
        next()
      });
    }
    
    public byId(_id: string) {
        return SocietyModel.findOne<Society>({ _id: new mongoose.Types.ObjectId(_id) });
    }
  }