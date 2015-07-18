recApp.controller('loginCtrl', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.user = {};

    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            loginService.sendLogin($scope.user)
        }

    };

}]);