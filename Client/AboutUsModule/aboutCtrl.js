recApp.controller('aboutCtrl', ['$scope', 'aboutService', function ($scope, aboutService) {

    $scope.init = function () {
        var mapOptions = {
            center: {
                lat:  $scope.config.latitude,
                lng:  $scope.config.longitude
            },
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        
        var marker = new google.maps.Marker({
            position:new google.maps.LatLng($scope.config.latitude, $scope.config.longitude),
            map: map,
            title: "We are here"
        })
    }
    aboutService.getAboutData().success(function (response) {
            $scope.config = response[0];
            $scope.init();
        })
        .error(function (error) {
            console.log(error);
            $scope.config = {};
        });

}]);