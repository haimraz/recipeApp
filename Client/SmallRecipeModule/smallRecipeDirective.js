angular.module('smallRecipeModule', []).
directive('smallRecipeDirective', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            recipe: '='
        },
        templateUrl: "SmallRecipeModule/smallRecipe.html"
    }
});