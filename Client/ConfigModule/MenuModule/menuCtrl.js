recApp.controller('menuCtrl', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
    $scope.menuItems = [
        {
            title: "About Us",
            href: "#About"
        },
        {
            title: "All Recipes",
            href: "#AllRecipes"
        },
        {
            title: "Statistics",
            href: "#Graphs"
        },
        {
            title: "Login",
            href: "#Login"
        }
    ];
    $rootScope.url = 'http://10.0.0.10:8080/';
    socket.on('connect', function () {
        userService.checkIfConnected().success(function (response) {
            if (response.exit_code == 1) {
                socket.emit('adduser', response.message);
            }
        }).error(function (error) {
            console.log(error);
        });
    });
    userService.checkIfConnected().success(function (response) {
        if (response.exit_code == 1) {
            $scope.userName = response.message;
            $scope.menuItems[3].href = "#Logout";
            $scope.menuItems[3].title = "Logout";
        } else {
            $scope.menuItems[3].href = "#Login";
            $scope.menuItems[3].title = "Login";
        }
    }).error(function (error) {

        console.log(error);
    });
}]);