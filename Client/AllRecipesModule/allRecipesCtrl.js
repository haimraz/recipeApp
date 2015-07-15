recApp.controller('allRecipesCtrl', ['$scope', 'allRecipesService', function ($scope, allRecipesService) {
    
    $scope.recipes = allRecipesService.getAllRecipes();
    
}]);