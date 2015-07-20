recApp.controller('bigRecipeCtrl', ['$scope', 'bigRecipeService', '$routeParams', '$timeout', function ($scope, bigRecipeService, $routeParams, userService, $timeout) {
    $scope.currMsg = {};
    $scope.countFrom = 0;
    bigRecipeService.loadBigRecipePage($routeParams.recipeId, $scope)
        .success(function (response) {
            $scope.recipeData = response;
            $scope.countTo = $scope.recipeData.difficulty;
            $scope.progressValue = $scope.recipeData.difficulty;
        })
        .error(function (error) {
            console.log(error);
            $scope.recipeData = [];
        });
    $scope.addComment = function () {
        $scope.currMsg.time = "1";
        $scope.currMsg.name = user.name;
        var msgCopy = angular.copy($scope.currMsg);
        bigRecipeService.doSend(angular.toJson(msgCopy));
        $scope.currMsg = {};
    }
}]);