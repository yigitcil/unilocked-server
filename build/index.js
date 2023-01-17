"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connector_js_1 = require("./modules/connector.js");
var creator_js_1 = require("./modules/creator.js");
var router_js_1 = require("./modules/router.js");
var server_js_1 = require("./modules/server.js");
process.env.APP_PATH = "C:/Users/Administrator/Desktop/tau";
process.env.path = "C:/Users/Administrator/Desktop/tau";
var connector = new connector_js_1.Connector();
connector.connect(function (db) {
    if (db !== undefined) {
        var dbo_1 = db.db("tau-video");
        creator_js_1.Creator.create(dbo_1);
        var server = new server_js_1.Server();
        server.listen(80, function (app) {
            var router = new router_js_1.Router();
            router.listen(app, dbo_1);
        });
    }
});
process
    .on("unhandledRejection", function (reason, p) {
    console.error(reason, "Unhandled Rejection at Promise", p);
})
    .on("uncaughtException", function (err) {
    console.error(err, "Uncaught Exception thrown");
});
