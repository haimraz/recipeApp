recApp.controller('bigRecipeCtrl', ['$scope', 'bigRecipeService', '$routeParams', function ($scope, bigRecipeService, $routeParams) {
    $scope.currMsg = {};
    bigRecipeService.loadBigRecipePage($routeParams.recipeId, $scope)
        .success(function (response) {
            $scope.recipeData = response;
        })
        .error(function (error) {
            console.log(error);
            $scope.recipeData = [];
        });
    bigRecipeService.loadBigRecipePage($routeParams.recipeId, $scope);
    $scope.addComment = function () {
        $scope.currMsg.time = "1";
        $scope.currMsg.name = user.name;
        var msgCopy = angular.copy($scope.currMsg);
        bigRecipeService.doSend(angular.toJson(msgCopy));
        $scope.currMsg = {};
    }
}]);