recApp.controller('loginCtrl', ['$scope', 'loginService', '$location', function ($scope, loginService, $location) {
    $scope.user = {};

    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            loginService.sendLogin($scope.user)
                .success(function (response) {
                    if (response.exit_code == 1) {
                        $scope.$parent.menuItems[3].href = "#Logout";
                        $scope.$parent.menuItems[3].title = "Logout";
                        socket.emit('adduser', response.message);
                        $location.path('/');
                        alertify.notify('Login Succeeded', 'success', 5);
                    } else {
                        alertify.error(response.message, 5);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        }
    };
}]);