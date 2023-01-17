import { MongoClient } from "mongodb";
import { Connector } from "./modules/connector.js";
import { Creator } from "./modules/creator.js";
import { Router } from "./modules/router.js";
import { Server } from "./modules/server.js";
import { Express } from "express";


process.env.APP_PATH = "C:/Users/Administrator/Desktop/tau"
process.env.path = "C:/Users/Administrator/Desktop/tau"

const connector = new Connector();
connector.connect((db: MongoClient | undefined) => {
  if (db !== undefined) {
    const dbo = db.db("tau-video");
    Creator.create(dbo);

    const server = new Server();
    server.listen(80, (app: Express) => {
      const router = new Router();
      router.listen(app, dbo);
      
    });
  }
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
  });
