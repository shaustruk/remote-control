"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
var robot = require("robotjs");
var http_server_1 = require("./src/http_server");
var ws_1 = require("ws");
var HTTP_PORT = 3000;
console.log("Start static http server on the ".concat(HTTP_PORT, " port!"));
http_server_1.httpServer.listen(HTTP_PORT);
exports.wss = new ws_1.WebSocketServer({
    port: 8080,
});
exports.wss.on('connection', function (ws) {
    ws.on('message', function (data) {
        var command = data.toString().split(' ');
        var currentCommand = command[0];
        var currentArgument = command[1];
        if (currentCommand === 'mouse_position') {
            var _a = robot.getMousePos(), x = _a.x, y = _a.y;
            ws.send("mouse_position ".concat(x, ",").concat(y));
            console.log("mouse_position ".concat(x, ",").concat(y));
        }
        else if (currentCommand === 'mouse_up') {
            var _b = robot.getMousePos(), x = _b.x, y = _b.y;
            robot.moveMouse(x, y - Number(currentArgument));
            ws.send("mouse_up ".concat(y, "px"));
            console.log('the mouse was moved up');
        }
        else if (currentCommand === 'mouse_down') {
            var _c = robot.getMousePos(), x = _c.x, y = _c.y;
            robot.moveMouse(x, y + Number(currentArgument));
            ws.send("mouse_down ".concat(y, "px"));
            console.log('the mouse was moved down');
        }
        else if (currentCommand === 'mouse_left') {
            var _d = robot.getMousePos(), x = _d.x, y = _d.y;
            robot.moveMouse(x - Number(currentArgument), y);
            ws.send("mouse_left ".concat(y, "px"));
            console.log('the mouse was moved left');
        }
        else if (currentCommand === 'mouse_right') {
            var _e = robot.getMousePos(), x = _e.x, y = _e.y;
            robot.moveMouse(x + Number(currentArgument), y);
            ws.send("mouse_right ".concat(y, "px"));
            console.log('the mouse was moved right');
        }
    });
});
// wss.on('close', () => {
//   console.log('end');
// });
//# sourceMappingURL=index.js.map