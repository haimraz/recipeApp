angular.module('usernameModule', []).directive('usernameValidator',['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.username = function(modelValue, viewValue) {
                return $http.get($rootScope + 'users/' + 'checkIfUserExist/' + viewValue).then(
                    function(response) {
                        if (!response.data.validUsername) {
                            return $q.reject(response.data.errorMessage);
                        }
                        return true;
                    }
                );
            };
        }
    };
}]);