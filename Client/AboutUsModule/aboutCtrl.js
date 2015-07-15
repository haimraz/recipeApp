recApp.controller('aboutCtrl', ['$scope', 'aboutService', function ($scope, aboutService) {
    $scope.aboutData = aboutService.getAboutData();
}]);