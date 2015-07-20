angular.module('ratingStarModule', []).
factory('ratingService', ['$rootScope', '$http', function ($rootScope, $http)
    {
        var fac = {};
        fac.rateStar = function (rank, recipeId) {
            return $http.put($rootScope.url + 'Recipes/addRank/' + recipeId, {
                rank: rank
            });
        }
        return fac;
    }]).
directive('ratingStarDirective', ['userService', 'ratingService', function (userService, ratingService) {
            return {
                restrict: 'E',
                replace: false,
                scope: {
                    rank: '=',
                    rid: "="
                },
                templateUrl: "RatingModule/ratingStar.html",
                link: function (scope, elm, attrs) {
                    scope.$watch("rank", function (newValue, oldValue) {
                            scope.roundRank = Math.round(scope.rank);
                            scope.rank = Math.round(scope.rank * 10) / 10;
                        });
                        scope.starClicked = function (value) {
                            userService.checkIfConnected().success(function (response) {
                                if (response.exit_code == 1) {
                                    ratingService.rateStar(value, scope.rid).success(function (response) {
                                        if (response.exit_code == 1) {
                                            scope.rank = Math.round(response.message * 10) / 10;
                                            scope.roundRank = Math.round(response.message);
                                        }
                                    }).error(function (error) {
                                        console.log(error);
                                    });
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