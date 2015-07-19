recApp.factory('bigRecipeService', [function () {

    var Service = {};
    Service.passScope = function (scope) {
        Service.scope = scope;
    };
    Service.loadAllMessages = function () {
        Service.scope.messages = [
            {
                time: "15",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                name: "Haim"
            },
            {
                time: "10",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                name: "Dudu"
            },
            {
                time: "7",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                name: "Talya"
            }
        ];
    };
    var wsUri = "ws://echo.websocket.org/"; // todo put you socket url

    Service.testWebSocket = function () {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) {
            onOpen(evt)
        };
        websocket.onclose = function (evt) {
            onClose(evt)
        };
        websocket.onmessage = function (evt) {
            onMessage(evt)
        };
        websocket.onerror = function (evt) {
            onError(evt)
        };
    };


    function onOpen(evt) {
        writeToScreen("CONNECTED");
    }

    function onClose(evt) {
        writeToScreen("DISCONNECTED");
    }

    function onMessage(evt) {
        writeToScreen("RECIVED: " + evt.data);
        Service.scope.messages.push(JSON.parse(evt.data));
        Service.scope.$apply();
    }
    
    Service.closeSocket = function()
    {
        websocket.close();
    };

    function onError(evt) {
        writeToScreen(evt.data);
    }

    Service.doSend = function (message) {
        writeToScreen("SENT: " + message);
        websocket.send(message);
    };

    // TODO function for test
    function writeToScreen(message) {
        console.log(message);
    }

    return Service;

}]);