recApp.factory('aboutService', ['$http', '$rootScope' , function($http, $rootScope){
     
    var fac = {};
     
    fac.getAboutData = function()
    {
        return $http.get($rootScope.url + 'Configs/getAllConfigs');
    }

    return fac;
}]);