import e, { Express, Response } from "express";
import { Db } from "mongodb";


export class Router {
  

  public listen(app: Express, db: Db) {
    
    /**
     * For Cors
     */
    app.use("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With,ngsw-bypass"
      );
      next();
    });

    
  
  }

  public error(res: Response) {
    res.send({ success: false });
  }
}
