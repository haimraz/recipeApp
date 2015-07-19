recApp.factory('logoutService', ['$rootScope', '$http', function ($rootScope, $http) {

    var fac = {};

    fac.sendLogin = function (user) {
        return $http.post($rootScope.url + 'Users/Logout');
    }

    return fac;

}]);