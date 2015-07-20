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

//    userService.checkIfConnected().success(function (response) {
//
//    }).error(function (error) {
//        console.log(error);
//    });
//
//    if ()
//
//    {
//        title: "Login",
//        href: "#Login"
//    }

    $rootScope.url = 'http://10.0.0.10:8080/';
}]);