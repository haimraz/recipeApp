angular.module('locationModule', [])
    .directive('placeDirective', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                user: '='
            },
            template: '<input id="address" name="address" type="text" class="form-control input-lg" placeholder="Address"/>',
            link: function ($scope, elm, attrs) {
                var autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var place = autocomplete.getPlace();
                    $scope.user = "";
                    $scope.user.address = place.formatted_address;
                    $scope.$apply();
                });
            }
        }
    });