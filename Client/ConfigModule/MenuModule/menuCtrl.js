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
            title: "Pie Statistics",
            href: "#Pie"
        },
        {
            title: "Bar Statistics",
            href: "#Bar"
        },
        {
            title: "Login",
            href: "#Login"
        }
    ];
    $rootScope.url = 'http://192.168.43.176:8080/';
    $rootScope.user = "";
    socket.on('connect', function () {
        userService.checkIfConnected().success(function (response) {
            $scope.user = response.message;
            if (response.exit_code == 1) {
                socket.emit('adduser', response.message);
            }
        }).error(function (error) {
            console.log(error);
        });
    });
    userService.checkIfConnected().success(function (response) {
        if (response.exit_code == 1) {
            $scope.user = response.message;
            $scope.menuItems[4].href = "#Logout";
            $scope.menuItems[4].title = "Logout";
        } else {
            $scope.menuItems[4].href = "#Login";
            $scope.menuItems[4].title = "Login";
        }
    }).error(function (error) {

        console.log(error);
    });
}]);