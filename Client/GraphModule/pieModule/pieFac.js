recApp.factory('pieService', ['$http', '$rootScope' , function($http, $rootScope){
     
    var fac = {};
    
    fac.findInServer = function (query) {
        return $http.put($rootScope.url + 'Statistics/getCountByCategory' , query);
    }

    return fac;
}]);