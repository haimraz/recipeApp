recApp.controller('bigRecipeCtrl', ['$scope', 'bigRecipeService', '$routeParams', '$filter', '$rootScope', function ($scope, bigRecipeService, $routeParams, $filter, $rootScope) {
    $scope.countFrom = 0;
    $scope.runOver = function (response) {
         for (var i = 0; i < response.comments.length; i++)
         {
             var msgDate = new Date(response.comments[i].creation_date);
             response.comments[i].creation_date = msgDate.format("dd-m-yy");
         }
        return response;
    }
    $scope.commentBtn = "Add Comment";
    bigRecipeService.loadBigRecipePage($routeParams.recipeId, $scope)
        .success(function (response) {
            response.cuisine = ($filter('lowercase')(response.cuisine)).substring(0, 2);
            $scope.recipeData = $scope.runOver(response);
            $scope.countTo = $scope.recipeData.difficulty;
            $scope.progressValue = $scope.recipeData.difficulty;
        })
        .error(function (error) {
            console.log(error);
            $scope.recipeData = [];
        });

    $scope.addComment = function () {
        if ($scope.commentBtn == "Add Comment") {
            var req = {
                content: angular.copy($scope.currMsg),
                recId: $routeParams.recipeId
            };
            bigRecipeService.doAdd(req);
            $scope.currMsg = "";
        } else {
            var req = {
                commentId: $scope.recipeData.comments[$scope.comentsToEdit]._id,
                content: angular.copy($scope.currMsg)
            };
            bigRecipeService.doEdit(req);
            $scope.commentBtn = "Add Comment";
            $scope.currMsg = "";
        }
    }

    $scope.delComment = function (index) {
        var req = {
            recipeId: $routeParams.recipeId,
            commentId: $scope.recipeData.comments[index]._id
        }
        bigRecipeService.doDel(req);
    }

    $scope.editComment = function (index) {
        $scope.currMsg = $scope.recipeData.comments[index].content;
        $scope.commentBtn = "Edit Comment";
        $scope.comentsToEdit = index;
    }
}]);