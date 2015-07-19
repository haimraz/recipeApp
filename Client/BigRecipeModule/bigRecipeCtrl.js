recApp.controller('bigRecipeCtrl', ['$scope', 'bigRecipeService', '$routeParams', 'userService', '$timeout', function ($scope, bigRecipeService, $routeParams, userService, $timeout) {
    $scope.currMsg = {};
    $scope.readOnly = true;
    bigRecipeService.loadBigRecipePage($routeParams.recipeId, $scope)
        .success(function (response) {
            $scope.recipeData = response;
            $scope.countTo = $scope.recipeData.diffculty;
            $scope.countFrom = 0;

            $timeout(function () {
                $scope.progressValue = $scope.recipeData.diffculty;
            }, 200);
        })
        .error(function (error) {
            console.log(error);
            $scope.recipeData = [];
        });
    userService.checkIfConnected().success(function (response) {
        if (response.exit_code == 1) {
            $scope.readOnly = false;
        } else {
            $scope.readOnly = true;
        }
    }).error(function (error) {
        $scope.readOnly = true;
        console.log(error);
    }).then(function () {});
    $scope.addComment = function () {
        $scope.currMsg.time = "1";
        $scope.currMsg.name = user.name;
        var msgCopy = angular.copy($scope.currMsg);
        bigRecipeService.doSend(angular.toJson(msgCopy));
        $scope.currMsg = {};
    }
}]);