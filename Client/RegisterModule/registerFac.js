recApp.factory('registerService', ['$rootScope', '$http', function ($rootScope, $http){

    var fac = {};

    fac.sendReg = function (user) {
       return $http.post($rootScope.url + 'Users/Signup', user);
    }

    fac.checkIfUsernameExists = function (username) {
        //TODO get request to server

    }

    return fac;

}]);