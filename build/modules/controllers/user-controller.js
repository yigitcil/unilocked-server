"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var UserController = /** @class */ (function () {
    function UserController(db) {
        this.db = db;
    }
    Object.defineProperty(UserController.prototype, "users", {
        get: function () {
            return this.db.collection("users");
        },
        enumerable: false,
        configurable: true
    });
    return UserController;
}());
exports.UserController = UserController;
