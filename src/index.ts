
import { Connector } from "@modules/connector";

import { Router } from "@modules/router";

import { Express } from "express";
import { Server } from "@modules/server";

require('dotenv/config')

process.env.APP_PATH = "C:/Users/Administrator/Desktop/"
process.env.path = "C:/Users/Administrator/Desktop/"

const connector = new Connector();
connector.connect(() => {
 

    const server = new Server();
    server.listen(3000, (app: Express) => {
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
