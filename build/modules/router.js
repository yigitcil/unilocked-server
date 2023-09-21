"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const auth_controller_1 = __importDefault(require("../modules/controllers/auth-controller"));
const user_profile_controller_1 = require("../modules/controllers/user-profile-controller");
const express_1 = require("express");
const society_controller_1 = require("./controllers/society-controller");
const project_controller_1 = require("./controllers/project-controller");
const post_controller_1 = require("./controllers/post-controller");
const event_controller_1 = require("./controllers/event-controller");
const message_controller_1 = require("./controllers/message-controller");
const home_controller_1 = __importDefault(require("./controllers/home-controller"));
const user_recommendation_controller_1 = require("./controllers/user-recommendation-controller");
const company_controller_1 = __importDefault(require("./controllers/company-controller"));
const upload_controller_1 = require("./controllers/upload-controller");
class Router {
    constructor(app) {
        this.app = app;
    }
    listen() {
        this.createRoute("auth", auth_controller_1.default);
        this.createRoute("user-profile", user_profile_controller_1.UserProfileController);
        this.createRoute("society", society_controller_1.SocietyController);
        this.createRoute("project", project_controller_1.ProjectController);
        this.createRoute("posts", post_controller_1.PostController);
        this.createRoute("event", event_controller_1.EventController);
        this.createRoute("message", message_controller_1.MessageController);
        this.createRoute("home", home_controller_1.default);
        this.createRoute("user-recommendation", user_recommendation_controller_1.UserRecommentationController);
        this.createRoute("company", company_controller_1.default);
        // init upload controler
        new upload_controller_1.UploadController(this.app).listen();
    }
    createRoute(path = null, controller, base = "/api/") {
        const router = (0, express_1.Router)();
        new controller().listen(router);
        if (path) {
            this.app.use(base + path, router);
        }
        else {
            this.app.use(base, router);
        }
    }
    error(res) {
        res.send({ success: false });
    }
}
exports.Router = Router;
