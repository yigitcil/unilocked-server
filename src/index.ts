import { Connector } from "./modules/connector";

import { Router } from "./modules/router";

import { Express } from "express";
import { Server } from "./modules/server";
import mongoose, { Mongoose } from "mongoose";
import {  User as UserModel } from "./models/user";
import { RedisService } from "./modules/services/redis";

declare global {
  namespace Express {
    interface User extends UserModel {
      _id: mongoose.Types.ObjectId;
    }
  }
}

require("dotenv/config");


process.env.APP_PATH = "C:/Users/Administrator/Desktop/";
process.env.path = "C:/Users/Administrator/Desktop/";

const connector = new Connector();
connector.connect(() => {
  const server = new Server();
  server.listen(3000, (app: Express) => {
    RedisService.init();
    const router = new Router(app);
    router.listen();
   
  });
});



process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
  });
