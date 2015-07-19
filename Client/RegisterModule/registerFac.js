recApp.factory('registerService', ['$rootScope', '$http', function ($rootScope, $http){

    var fac = {};

    fac.sendReg = function (user) {
        $http.post($rootScope.url + 'Users/Signup', user).success(function (response) {
            if (response.action == 1) {
                copySup.id = response.data;
                $scope.suppliersCopy.push(copySup);
                $scope.suppliers.push(copySup);
                alertify.notify('Add supplier successfully', 'success', 5);
            } else {
                alertify.error(response.error, 5);
            }
        }).error(function () {
            $scope.suppliersCopy.push(copySup);
            $scope.suppliers.push(copySup);
            alertify.error('Add supplier failed', 5);
        });

    };

    fac.checkIfUsernameExists = function (username) {
        //TODO get request to server

    };

    return fac;

}]);