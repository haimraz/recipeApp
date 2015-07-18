recApp.factory('bigRecipeService', ['$http', '$rootScope', function ($http, $rootScope) {

    var Service = {};
    Service.loadBigRecipePage = function (recipeId, scope) {
        Service.scope = scope;
        return $http.get($rootScope.url + 'Recipes/getRecipeById/' + recipeId);
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