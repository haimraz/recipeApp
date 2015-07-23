recApp.controller('graphCtrl', ['$scope', 'graphService', function ($scope, graphService) {
    //    aboutService.getAboutData().success(function (response) {
    //            $scope.config = response[0];
    //        })
    //        .error(function (error) {
    //            console.log(error);
    //            $scope.config = {};
    //        });

    $scope.options = {
        width: 500,
        height: 300,
        'bar': 'aaa'
    };
    $scope.data = [1, 2, 3, 4];
    $scope.hovered = function (d) {
        $scope.barValue = d;
        $scope.$apply();
    };
    $scope.barValue = 'None';
}]);