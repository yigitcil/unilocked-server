import PassportConfig from "@config/passport";
import express from "express";
import fs from "fs";
import http from "http";
import https from "https";
import { Db } from "mongodb";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";

export class Server {
  private app;

  private privateKey = fs.readFileSync(
    "C:/Certbot/live/tau-video.xyz/privkey.pem",
    "utf8"
  );
  private certificate = fs.readFileSync(
    "C:/Certbot/live/tau-video.xyz/cert.pem",
    "utf8"
  );
  private ca = fs.readFileSync(
    "C:/Certbot/live/tau-video.xyz/chain.pem",
    "utf8"
  );

  private credentials = {
    key: this.privateKey,
    cert: this.certificate,
    ca: this.ca,
  };

  constructor(private db: Db) {
    this.app = express();
    this.use();
  }

  public listen(port: number, callback: any) {
    const httpServer = http.createServer(this.app);
    const httpsServer = https.createServer(this.credentials, this.app);

    httpServer.listen(80, () => {
      console.log("HTTP Server running on port 80");
    });

    httpsServer.listen(443, () => {
      console.log("HTTP Server running on port 443");
      callback(this.app);
    });
  }

  private use() {
    new PassportConfig().init(this.db);
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(flash());
    this.app.use(express.static(process.env.APP_PATH + "/ui"));
    this.app.use(express.json());

    /**
     * For Cors
     */
    this.app.use("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With,ngsw-bypass"
      );
      next();
    });
  }
}
