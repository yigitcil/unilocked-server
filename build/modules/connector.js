"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
var mongodb_1 = require("mongodb");
var Connector = /** @class */ (function () {
    function Connector() {
        this.url = "mongodb://localhost:27017/tau-video";
    }
    Connector.prototype.connect = function (callback) {
        var _this = this;
        mongodb_1.MongoClient.connect(this.url, function (err, db) {
            if (err)
                throw err;
            console.log("Database created!");
            _this.db = db;
            callback(db);
        });
    };
    Connector.prototype.disconnect = function () {
        if (this.db !== undefined) {
            this.db.close();
        }
    };
    return Connector;
}());
exports.Connector = Connector;
