angular.module('smallRecipeModule', []).
controller('smallRecipeCtrl', ['$scope', function ($scope) {
    console.log($scope);

    $scope.rate = "1";
    $scope.rateChange = function (value) {
        $scope.rate = value;
        console.log($scope);
        // return scope.rate;

    }
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
directive('smallRecipeDirective', function () {
    return {
        restrict: 'E',
        replace: false,
//        scope: {
//            recipe: '='
//        },
        templateUrl: "SmallRecipeModule/smallRecipe.html",
        link: function (scope, elm, attrs) {

            console.log(scope);


        }
    }
});