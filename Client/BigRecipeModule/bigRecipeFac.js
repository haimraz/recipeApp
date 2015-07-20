recApp.factory('bigRecipeService', ['$http', '$rootScope', function ($http, $rootScope) {

    var Service = {};
    Service.loadBigRecipePage = function (recipeId, scope) {
        Service.scope = scope;
        return $http.get($rootScope.url + 'Recipes/getRecipeById/' + recipeId);
    }
    var socket = io.connect('http://10.0.0.10:8080');

    socket.on('addComment', function (data) {
        writeToScreen(data);
        addMessage(data);
    });

    Service.doSend = function (message) {
        writeToScreen("SENT: " + message);
        socket.emit('sendAdd', message);
        addMessage(data);
    }

    function addMessage(data) {
        Service.scope.messages.push(JSON.parse(data));
        Service.scope.$apply();
    }

    // TODO function for test
    function writeToScreen(message) {
        console.log(message);
    }

    return Service;

}]);