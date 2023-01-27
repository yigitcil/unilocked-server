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
var base_controller_1 = __importDefault(require('./base-controller'));
var mongodb_1 = require('mongodb');
var UserController = (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.listen = function (router) {
    };
    Object.defineProperty(UserController.prototype, 'users', {
        get: function () {
            return this.db.collection('users');
        },
        enumerable: false,
        configurable: true
    });
    UserController.prototype.byEmail = function (email) {
        return this.users.findOne({ email: email });
    };
    UserController.prototype.byId = function (_id) {
        return this.users.findOne({ _id: new mongodb_1.ObjectId(_id) });
    };
    return UserController;
})(base_controller_1.default);
exports.UserController = UserController;