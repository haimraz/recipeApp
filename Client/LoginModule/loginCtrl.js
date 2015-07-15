recApp.controller('loginCtrl', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.user = new Object();

    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            alert(angular.toJson($scope.user));
            //Todo go to factory
        }

    };

}]);