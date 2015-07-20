recApp.controller('menuCtrl', ['$scope', '$rootScope' , function ($scope, $rootScope) {
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
    
    $rootScope.url = 'http://localhost:80/';
}]);