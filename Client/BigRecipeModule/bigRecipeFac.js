recApp.factory('bigRecipeService', [function () {

    var Service = {};
    Service.loadBigRecipePage = function (recipeId, scope) {
        //Todo take from server data
        Service.scope = scope;
        loadAllMessages();
    };
    function loadAllMessages() {
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
    }
//    var socket = io();
//
//    socket.on('addMessageFromServer', function (data) {
//        writeToScreen("RECIVED: " + data);
//        Service.scope.messages.push(JSON.parse(data));
//        Service.scope.$apply();
//    });
//
//    Service.closeSocket = function () {
//        websocket.close();
//    }
//
//    function onError(evt) {
//        writeToScreen(evt.data);
//    }
//
//    Service.doSend = function (message) {
//        writeToScreen("SENT: " + message);
//        websocket.send(message);
//    }
//
//    // TODO function for test
//    function writeToScreen(message) {
//        console.log(message);
//    }

    return Service;

}]);