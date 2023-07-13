'use strict';
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Router = void 0;
const auth_controller_1 = __importDefault(require('./controllers\\auth-controller'));
const user_profile_controller_1 = require('./controllers\\user-profile-controller');
const express_1 = require('express');

const message_controller_1 = require('./controllers\\message-controller');
const society_controller_1 = require('./controllers/society-controller');
const project_controller_1 = require('./controllers/project-controller');
const post_controller_1 = require('./controllers/post-controller');
const event_controller_1 = require('./controllers/event-controller');
const home_controller_1 = __importDefault(require('./controllers/home-controller'));

class Router {
    constructor(app) {
        this.app = app;
    }
    listen() {
        this.createRoute('auth', auth_controller_1.default);
        this.createRoute('user-profile', user_profile_controller_1.UserProfileController);
        this.createRoute('society', society_controller_1.SocietyController);
        this.createRoute('project', project_controller_1.ProjectController);
        this.createRoute('posts', post_controller_1.PostController);
        this.createRoute('event', event_controller_1.EventController);
        this.createRoute('message', message_controller_1.MessageController);
        this.createRoute('home', home_controller_1.default);
    }
    createRoute(path = null, controller, base = '/api/') {
        const router = (0, express_1.Router)();
        new controller().listen(router);
        if (path) {
            this.app.use(base + path, router);
        } else {
            this.app.use(base, router);
        }
    }
    error(res) {
        res.send({ success: false });
    }
}
exports.Router = Router;