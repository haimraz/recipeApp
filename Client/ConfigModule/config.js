var recApp = angular.module('recApp', ['ngRoute', '720kb.tooltips', 'locationModule', 'smallRecipeModule', 'ratingStarModule', 'usernameModule', 'ui.bootstrap', 'countTo', 'ngTagsInput', 'd3App']);

var socket = io.connect('http://10.0.0.10:8080');

// configure our routes
recApp.config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {
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
            templateUrl: 'GraphModule/graph.html',
            controller: 'graphCtrl'
        })
        .when('/Login', {
            templateUrl: 'LoginModule/login.html',
            controller: 'loginCtrl'
        })
        .when('/Logout', {
            templateUrl: 'LogoutModule/logout.html',
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