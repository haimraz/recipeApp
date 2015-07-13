var recApp = angular.module('recApp', ['ngRoute']);

// configure our routes
recApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../HomeModule/Home.html',
        })
        .when('/Main/:committeeId:userId:first:last', {
            templateUrl: '../MainModule/Main.html',
            controller: 'MainController'
        })
        .when('/Calendar', {
            templateUrl: '../CalendarModule/Calendar.html',
            controller: 'caleController'
        })
        .when('/Team', {
            templateUrl: '../TeamModule/Team.html',
            controller: 'teamController'
        })
        .when('/Forum', {
            templateUrl: '../ForumModule/Forum.html',
            controller: 'ForumController'
        })
        .when('/Users', {
            templateUrl: '../HouseModule/Users/Users.html',
            controller: 'UserController'
        })
        .when('/Committee', {
            templateUrl: '../CommitteeModule/CommitteeStatus.html',
            controller: 'CommitteeStatusController'
        })
        .when('/Faults', {
            templateUrl: '../HouseModule/Faults/Faults.html',
            controller: 'FaultsController'
        })
        .when('/Posts/:postId', {
            templateUrl: '../ForumModule/Post.html',
            controller: 'PostController'
        })
        .when('/Suppliers', {
            templateUrl: '../HouseModule/Suppliers/Suppliers.html',
            controller: 'SupplierController'
        });

});