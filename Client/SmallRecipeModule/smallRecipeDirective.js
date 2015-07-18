angular.module('smallRecipeModule', []).
controller('smallRecipeCtrl', ['$scope', function ($scope) {


    }]).
directive('smallRecipeDirective', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            recipe: '='
        },
        templateUrl: "SmallRecipeModule/smallRecipe.html",
        link: function (scope, elm, attrs) {
        }
    }
});