angular.module('smallRecipeModule', []).
directive('smallRecipeDirective', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            recipe: '='
        },
        link: function (scope, elm, attrs) 
        {
            console.log(scope.recipe);
        },
        templateUrl: "SmallRecipeModule/smallRecipe.html"
    }
});