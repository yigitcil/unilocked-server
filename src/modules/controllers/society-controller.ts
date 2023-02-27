import { Society, SocietyModel } from "@models/society";
import success from "@modules/responses/success";
import PaginateService from "@modules/services/paginate";
import { Router } from "express";
import mongoose from "mongoose";
import BaseController from "./base-controller";

export class SocietyController extends BaseController {
    listen(router: Router): void {
  
      //Get society by ID
      router.get("/:id", async (req, res, next) => {
        const society = await this.byId(req.params.id);
        res.send({
          sucess: true,
          data: society,
        });
        next()
      });

      //Get socities
      router.get("/", async (req, res, next) => {
        const socities = SocietyModel.find();
  
        res.send(success(await PaginateService.paginate(req, SocietyModel, socities)));
        next()
      });
    }
    
    public byId(_id: string) {
        return SocietyModel.findOne<Society>({ _id: new mongoose.Types.ObjectId(_id) });
    }
  }