angular.module('locationModule', [])
    .directive('placeDirective', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                address: '='
            },
            template: '<input id="address" name="address" type="text" class="form-control input-lg" placeholder="Address" required/>',
            link: function (scope, elm, attrs) {
                var autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var place = autocomplete.getPlace();
                    scope.address = place.formatted_address;
                    scope.$apply();
                });
            }
        }
    });