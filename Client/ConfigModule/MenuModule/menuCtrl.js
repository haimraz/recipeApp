recApp.controller('menuCtrl', ['$scope', function ($scope) {
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
        },
        {
            title: "Big Recipe",
            href: "#BigRecipe"
        }
    ];
}]);