"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Connector {
    connect(callback) {
        mongoose_1.default
            .connect(process.env.DATABASE)
            .then(() => {
            callback();
        });
    }
    disconnect() {
        mongoose_1.default.disconnect();
    }
}
exports.Connector = Connector;
