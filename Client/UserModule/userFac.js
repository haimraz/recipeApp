recApp.factory('userService', ['$rootScope', '$http', function ($rootScope, $http) {

    var fac = {};

    fac.checkIfConnected = function () {
        return $http.get($rootScope.url + 'Users/getCurrentUser');
    }

    return fac;
}]);