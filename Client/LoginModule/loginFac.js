recApp.factory('loginService', ['$rootScope', '$http', function ($rootScope, $http) {

    var fac = {};

    fac.sendLogin = function (user) {
        return $http.post($rootScope.url + 'Users/Login', user);
    }

    return fac;

}]);