recApp.controller('aboutCtrl', ['$scope', 'aboutService', function ($scope, aboutService) {
    aboutService.getAboutData().success(function (response) {
            $scope.config = response[0];
        })
        .error(function (error) {
            console.log(error);
            $scope.config = {};
        });

}]);