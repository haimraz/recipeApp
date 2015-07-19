var recApp = angular.module('recApp', ['ngRoute', '720kb.tooltips', 'locationModule', 'smallRecipeModule', 'ratingStarModule', 'usernameModule']);
var user = {};
user.name = "Haim" // TODO take from session

// configure our routes
recApp.config(['$routeProvider', '$compileProvider',  function ($routeProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(true);
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
        .when('/BigRecipe/:recipeId?', {
            templateUrl: 'BigRecipeModule/bigRecipe.html',
            controller: 'bigRecipeCtrl'
        })
        .when('/Graphs', {
            templateUrl: '../GraphModule/graph.html',
            controller: 'graphCtrl'
        })
        .when('/Login', {
            templateUrl: 'LoginModule/login.html',
            controller: 'loginCtrl'
        })
        .when('/Logout', {
            controller: 'logoutCtrl'
        })
        .when('/Register', {
            templateUrl: 'RegisterModule/register.html',
            controller: 'registerCtrl'
        })
        .when('/404', {
            templateUrl: 'NotFoundModule/notFoundPage.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
}]);