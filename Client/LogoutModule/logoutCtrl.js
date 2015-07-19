recApp.controller('logoutCtrl', ['$scope', 'loginService', '$location', function ($scope, logoutService, $location) {
    $scope.user = {};

    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            loginService.sendLogin($scope.user)
                .success(function (response) {
                    if (response.exit_code == 1) {
                        $scope.$parent.menuItems[3].href = "#Login";
                        $scope.$parent.menuItems[3].title = "Login";
                        $location.path('/Login');
                        alertify.notify('Logout Succeeded', 'success', 5);
                    } else {
                        alertify.error(response.message, 5);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        }
    };
}]);