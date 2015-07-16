recApp.controller('bigRecipeCtrl', ['$scope', 'bigRecipeService', function ($scope, bigRecipeService) {
    $scope.currMsg = {};
    bigRecipeService.passScope($scope);
    bigRecipeService.loadAllMessages();

    // $scope.messages = bigRecipeService.scope.;
    bigRecipeService.testWebSocket();

    $scope.addComment = function () {
        $scope.currMsg.time = "1";
        $scope.currMsg.name = user.name;
        var msgCopy = angular.copy($scope.currMsg);
        //  $scope.messages.push(msgCopy);
        bigRecipeService.doSend(angular.toJson(msgCopy));
        $scope.currMsg = {};
    }
}]);