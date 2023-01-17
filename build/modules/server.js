"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var Server = /** @class */ (function () {
    function Server() {
        this.privateKey = fs_1.default.readFileSync('C:/Certbot/live/tau-video.xyz/privkey.pem', 'utf8');
        this.certificate = fs_1.default.readFileSync('C:/Certbot/live/tau-video.xyz/cert.pem', 'utf8');
        this.ca = fs_1.default.readFileSync('C:/Certbot/live/tau-video.xyz/chain.pem', 'utf8');
        this.credentials = {
            key: this.privateKey,
            cert: this.certificate,
            ca: this.ca
        };
        this.app = (0, express_1.default)();
        this.use();
    }
    Server.prototype.listen = function (port, callback) {
        var _this = this;
        var httpServer = http_1.default.createServer(this.app);
        var httpsServer = https_1.default.createServer(this.credentials, this.app);
        httpServer.listen(80, function () {
            console.log('HTTP Server running on port 80');
        });
        httpsServer.listen(443, function () {
            console.log('HTTP Server running on port 443');
            callback(_this.app);
        });
    };
    Server.prototype.use = function () {
        this.app.use(express_1.default.static(process.env.APP_PATH + "/ui"));
        this.app.use(express_1.default.json());
    };
    return Server;
}());
exports.Server = Server;
