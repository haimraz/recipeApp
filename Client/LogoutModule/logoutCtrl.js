recApp.controller('logoutCtrl', ['$scope', 'logoutService', '$location', 'userService', function ($scope, logoutService, $location, userService) {

    userService.checkIfConnected().success(function (response) {
        if (response.exit_code == 1) {
            logoutService.sendLogout()
                .success(function (response) {
                    if (response.exit_code == 1) {
                        $scope.$parent.menuItems[4].href = "#Login";
                        $scope.$parent.menuItems[4].title = "Login";
                        //socket.io.disconnect();
                         socket.emit('discon');
                        $location.path('/Login');
                        alertify.notify('Logout Succeeded', 'success', 5);
                    } else {
                        alertify.error(response.message, 5);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        } else {
            console.log(response.message);
        }
    }).error(function (error) {
        console.log(error);
    });

}]);