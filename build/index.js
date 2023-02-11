'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var connector_1 = require('./modules\\connector');
var creator_1 = require('./modules\\creator');
var router_1 = require('./modules\\router');
var server_1 = require('./modules\\server');
process.env.APP_PATH = 'C:/Users/Administrator/Desktop/';
process.env.path = 'C:/Users/Administrator/Desktop/';
var connector = new connector_1.Connector();
connector.connect(function (db) {
    if (db !== undefined) {
        var dbo_1 = db.db('unilocked');
        creator_1.Creator.create(dbo_1);
        var server = new server_1.Server(dbo_1);
        server.listen(3000, function (app) {
            var router = new router_1.Router(app, dbo_1);
            router.listen();
        });
    }
});
process.on('unhandledRejection', function (reason, p) {
    console.error(reason, 'Unhandled Rejection at Promise', p);
}).on('uncaughtException', function (err) {
    console.error(err, 'Uncaught Exception thrown');
});