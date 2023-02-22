"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Connector = /** @class */ (function () {
    function Connector() {
    }
    Connector.prototype.connect = function (callback) {
        mongoose_1.default
            .connect(process.env.DATABASE)
            .then(function () {
            callback();
        });
    };
    Connector.prototype.disconnect = function () {
        mongoose_1.default.disconnect();
    };
    return Connector;
}());
exports.Connector = Connector;
