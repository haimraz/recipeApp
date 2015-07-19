recApp.controller('registerCtrl', ['$scope', 'registerService', '$location' , function ($scope, registerService, $location) {
    $scope.user = {};
//    $scope.user.address="";
    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
             registerService.sendReg($scope.user)
                .success(function (response) {
                    if (response.exit_code == 1) {
                        $location.path('/Login');
                        alertify.notify('Register Succeeded', 'success', 5);
                    } else {
                        alertify.error(response.message, 5);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        }
    };
}]);