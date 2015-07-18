recApp.controller('allRecipesCtrl', ['$scope', 'allRecipesService', function ($scope, allRecipesService) {

    allRecipesService.getAllRecipes()
    .success(function (response) {
            $scope.recipes = response;
        })
        .error(function (error) {
            console.log(error);
            $scope.recipes = [];
        });

}]);