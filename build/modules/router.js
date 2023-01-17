"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.prototype.listen = function (app, db) {
        /**
         * For Cors
         */
        app.use("*", function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With,ngsw-bypass");
            next();
        });
    };
    Router.prototype.error = function (res) {
        res.send({ success: false });
    };
    return Router;
}());
exports.Router = Router;
