angular.module('ratingStarModule', []).
<<<<<<< HEAD
factory('ratingService', ['$rootScope', '$http', function ($rootScope, $http)
    {
        var fac = {};
        fac.rateStar = function(rank, recipeId)
        {
            
        }
        return fac;
=======
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
>>>>>>> 672b75325e3e42e83e3ec792fab6c52f0a2c8a0e
    }]).
directive('ratingStarDirective', ['userService', function (userService) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            rank: '='
        },
        templateUrl: "RatingModule/ratingStar.html",
        link: function (scope, elm, attrs) {
            scope.starClicked = function (value) {
                userService.checkIfConnected().success(function (response) {
                    if (response.exit_code == 1) {
                        scope.rank = value;
                    } else {
                        console.log(response.message);
                    }
                }).error(function (error) {
                    console.log(error);
                });
            }
        }
    }
}]);
