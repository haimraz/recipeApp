angular.module('ratingStarModule', []).
factory('ratingService', ['$rootScope', '$http', function ($rootScope, $http)
    {
        var fac = {};
        fac.rateStar = function(rank, recipeId)
        {
            
        }
        return fac;
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