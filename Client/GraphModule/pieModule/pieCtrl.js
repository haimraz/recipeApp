recApp.controller('pieCtrl', ['$scope', 'pieService', function ($scope, pieService) {
    $scope.sendToMongo = function () {
            var query = {};
            //if ()
           // pieService.findInServer();
    }

    $scope.data = [
        {
            _id: "Appetizers",
            total: "5"
                },
        {
            _id: "Main course",
            total: "7"
                },
        {
            _id: "dudu",
            total: "8"
                }
            ];
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

}]);