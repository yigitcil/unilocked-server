"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const base_controller_1 = __importDefault(require("./base-controller"));
const resolved_models_1 = require("../../resolved-models");
class UserController extends base_controller_1.default {
    listen(router) {
    }
    byEmail(email) {
        return resolved_models_1.UserModel.findOne({ email: email });
    }
    byId(_id) {
        return resolved_models_1.UserModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(_id) });
    }
    byUsername(username) {
        return resolved_models_1.UserModel.findOne({ username: username });
    }
}
exports.UserController = UserController;
