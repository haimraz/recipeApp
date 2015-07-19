recApp.factory('logoutService', ['$rootScope', '$http', function ($rootScope, $http) {

    var fac = {};

    fac.sendLogout = function () {
        return $http.post($rootScope.url + 'Users/Logout');
    }

    return fac;
}]);