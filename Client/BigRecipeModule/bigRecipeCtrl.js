recApp.controller('bigRecipeCtrl', ['$scope', 'bigRecipeService', function ($scope, bigRecipeService) {
    $scope.currMsg = {};
    $scope.currMsg.name = user.name;
    $scope.messages = [
        {
            time: "15",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            name: "Haim"
            },
        {
            time: "10",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            name: "Dudu"
            },
        {
            time: "7",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            name: "Talya"
            }
        ];

    $scope.addComment = function () {
        $scope.currMsg.time = "1";
        $scope.messages.push(angular.copy($scope.currMsg));
    }
}]);