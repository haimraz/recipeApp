recApp.controller('pieCtrl', ['$scope', 'pieService', function ($scope, pieService) {
    $scope.sendToMongo = function () {
        var query = {};
        if ($scope.selected_rank != 1) {
            query.rank = $scope.ranks[$scope.selected_rank - 1].name;
        }
        if ($scope.selected_diff != 1) {
            query.difficulty = $scope.difficulties[$scope.selected_diff - 1].name;
        }
        if ($scope.ingridiant != "") {
            query.ingredients = $scope.ingridiant;
        }
        pieService.findInServer(query).success(function (response) {
                if (response.exit_code == 1)
                {
                    $scope.data = response.message;
                }
            })
            .error(function (error) {
                console.log(error);
            });
    }
   
   $scope.data = [];
    $scope.ranks = [
        {
            id: 1,
            name: "Select:"
    },
        {
            id: 2,
            name: "1"
    }, {
            id: 3,
            name: "2"
    }, {
            id: 4,
            name: "3"
    }, {
            id: 5,
            name: "4"
    }, {
            id: 6,
            name: "5"
    }];
    $scope.selected_rank = 1;
    $scope.difficulties = [
        {
            id: 1,
            name: "Select:"
    },
        {
            id: 2,
            name: "1"
    }, {
            id: 3,
            name: "2"
    }, {
            id: 4,
            name: "3"
    }, {
            id: 5,
            name: "4"
    }, {
            id: 6,
            name: "5"
    }];
    $scope.selected_diff = 1;
    $scope.ingridiant = "";
     $scope.sendToMongo();

}]);