var recApp = angular.module('recApp', ['ngRoute', '720kb.tooltips', 'locationModule', 'smallRecipeModule']);

// configure our routes
recApp.config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $routeProvider
        .when('/', {
            templateUrl: 'HomeModule/home.html',
            controller: 'homeCtrl'
        })
        .when('/About', {
            templateUrl: 'AboutUsModule/about.html',
            controller: 'aboutCtrl'
        })
        .when('/AllRecipes', {
            templateUrl: 'AllRecipesModule/allRecipes.html',
            controller: 'allRecipesCtrl'
        })
        .when('/Graphs', {
            templateUrl: '../GraphModule/graph.html',
            controller: 'graphCtrl'
        })
        .when('/Login', {
            templateUrl: 'LoginModule/login.html',
            controller: 'loginCtrl'
        })
        .when('/Register', {
            templateUrl: 'RegisterModule/register.html',
            controller: 'registerCtrl'
        })
        .when('/Recipe', {
            templateUrl: 'RecipeModule/recipe.html',
            controller: 'recipeCtrl'
        })
        .otherwise({
            redirectTo: '../404Module/404.html'
        });
}]);