recApp.controller('barCtrl', ['$scope', 'barService', function ($scope, barService) {
    $scope.sendToMongo = function () {
        var query = {};
        if ($scope.selected_cat != 1) {
            query.category = $scope.categories[$scope.selected_cat - 1].name;
        }
        if ($scope.ingridiant != "") {
            query.ingredients = $scope.ingridiant;
        }
        query.rankers = $scope.rankers;
        
        barService.findInServer(query).success(function (response) {
                if (response.exit_code == 1) {
                    $scope.data = response.message;
                }
            })
            .error(function (error) {
                console.log(error);
            });
    }
    
      $scope.data = [];
    $scope.categories = [
        {
            id: 1,
            name: "Select:"
    },
        {
            id: 2,
            name: "Appetizers"
    }, {
            id: 3,
            name: "Main course"
    },
        {
            id: 4,
            name: "Dessert"
    }
    ];
    $scope.selected_cat = 1;
    $scope.ingridiant = "";
     $scope.rankers = 0;
     $scope.sendToMongo();
}]);