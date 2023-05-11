'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var connector_1 = require('./modules/connector');
var router_1 = require('./modules/router');
var server_1 = require('./modules/server');
var redis_1 = require('./modules/services/redis');
require('dotenv/config');
process.env.APP_PATH = 'C:/Users/Administrator/Desktop/';
process.env.path = 'C:/Users/Administrator/Desktop/';
var connector = new connector_1.Connector();
connector.connect(function () {
    var server = new server_1.Server();
    server.listen(3000, function (app) {
        redis_1.RedisService.init();
        var router = new router_1.Router(app);
        router.listen();
    });
});
process.on('unhandledRejection', function (reason, p) {
    console.error(reason, 'Unhandled Rejection at Promise', p);
}).on('uncaughtException', function (err) {
    console.error(err, 'Uncaught Exception thrown');
});