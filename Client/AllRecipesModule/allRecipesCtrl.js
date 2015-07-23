recApp.controller('allRecipesCtrl', ['$scope', 'allRecipesService', '$routeParams', function ($scope, allRecipesService, $routeParams) {

    allRecipesService.getAllRecipes()
        .success(function (response) {
            $scope.recipes = response;
        })
        .error(function (error) {
            console.log(error);
            $scope.recipes = [];
        });
    
    if ($routeParams.filterTag)
    {
        $scope.tags = [];
        $scope.tags.push($routeParams.filterTag);
    }

}]);


recApp.filter('filterByTags', [ '$filter', function ($filter) {
    return function (items, tags) {
        var filtered = [];
        if (items && tags && tags.length > 0)
        {
            items.forEach(function (item) {
                 var matches = tags.some(function (tag) {
                    var upper = $filter('uppercase')(tag.text);
                    return ($filter('uppercase')(item.title).indexOf(upper) > -1) ||
                           ($filter('uppercase')(item.category).indexOf(upper) > -1) ||
                           ($filter('uppercase')(item.cuisine).indexOf(upper) > -1 );
                });
                if (matches) {
                    filtered.push(item);
                }
            });
        }
        else if (!items)
        {
            return filtered;
        }
        else
        {
            return items;
        }
    
        return filtered;
    };
}]);