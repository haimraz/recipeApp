recApp.factory('allRecipesService', ['$rootScope', '$http', function ($rootScope, $http) {

    var fac = {};

    fac.getAllRecipes = function () {
        return $http.get($rootScope.url + 'Recipes/getAllRecipes');
    }

    return fac;
}]);