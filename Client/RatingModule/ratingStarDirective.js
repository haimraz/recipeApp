angular.module('ratingStarModule', []).
controller('ctrl', ['$scope', function ($scope) {
            $scope.rankChange = function (value) {
                $scope.rank = value;
                console.log($scope);

            };
            $scope.stars = [
                {
                    id: "star-1"
                    },
                {
                    id: "star-2"
                    },
                {
                    id: "star-3"
                    },
                {
                    id: "star-4"
                    },
                {
                    id: "star-5"
                    },
                ];
    }]).
directive('ratingStarDirective', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            rank: '='
        },
        templateUrl: "RatingModule/ratingStar.html",
        link: function (scope, elm, attrs) {
            console.log(scope.rank);
        }
    }
});