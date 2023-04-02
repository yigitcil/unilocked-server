'use strict';
var __extends = this && this.__extends || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== 'function' && b !== null)
            throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserController = void 0;
var user_1 = require('../../models/user');
var base_controller_1 = __importDefault(require('./base-controller'));
var mongoose_1 = __importDefault(require('mongoose'));
var UserController = (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.listen = function (router) {
    };
    UserController.prototype.byEmail = function (email) {
        return user_1.UserModel.findOne({ email: email });
    };
    UserController.prototype.byId = function (_id) {
        return user_1.UserModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(_id) });
    };
    UserController.prototype.byUsername = function (username) {
        return user_1.UserModel.findOne({ username: username });
    };
    return UserController;
})(base_controller_1.default);
exports.UserController = UserController;