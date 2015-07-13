recApp.controller('registerCtrl', ['$scope', 'registerService', function ($scope, registerService) {
//    $scope.user = new Object();
//    $scope.user.address="";
    $scope.submitForm = function (isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            //Todo go to factory
            
            alert(angular.toJson($scope.user));
        }

    };

}]);