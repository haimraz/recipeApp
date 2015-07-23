angular.module('smallRecipeModule', []).
directive('smallRecipeDirective', [ '$filter', function ($filter)  {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            recipe: '='
        },
        link: function (scope, elm, attrs) 
        {
            scope.cuisine = ($filter('lowercase')(scope.recipe.cuisine)).substring(0, 2);
        },
        templateUrl: "SmallRecipeModule/smallRecipe.html"
    }
}]);