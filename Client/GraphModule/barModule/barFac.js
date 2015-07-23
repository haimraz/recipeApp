recApp.factory('barService', ['$http', '$rootScope' , function($http, $rootScope){
     
    var fac = {};
    
    fac.findInServer = function (query) {
        return $http.put($rootScope.url + 'Statistics/getAverageRankByCuisine' , query);
    }
    
    return fac;
}]);