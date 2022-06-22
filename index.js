"use strict";
exports.__esModule = true;
exports.wss = void 0;
var robot = require("robotjs");
var http_server_1 = require("./src/http_server");
var ws_1 = require("ws");
var HTTP_PORT = 3000;
console.log("Start static http server on the ".concat(HTTP_PORT, " port!"));
http_server_1.httpServer.listen(HTTP_PORT);
exports.wss = new ws_1.WebSocketServer({
    port: 8080
});
exports.wss.on('connection', function (ws) {
    ws.on('message', function (data) {
        // console.log(data, 'data');
        var _a = robot.getMousePos(), x = _a.x, y = _a.y;
        ws.send("mouse_position ".concat(x, ",").concat(y));
        ws.send("mouse_control ".concat(x, ",").concat(y));
    });
});
// wss.on('close', () => {
//   console.log('end');
// });
