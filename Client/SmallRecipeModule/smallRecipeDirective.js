angular.module('smallRecipeModule', [])
    .directive('smallRecipeDirective', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                recipe: '='
            },
            templateUrl: "SmallRecipeModule/smallRecipe.html",
            link: function (scope, elm, attrs) {
            }
        }
    });