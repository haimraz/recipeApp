recApp.controller('barCtrl', ['$scope', 'barService', function ($scope, barService) {
    $scope.data = [
        {
            _id: "Austria",
            average: "4.539814814814815"
            },
        {
            _id: "Belgium",
            average: "3.5398148148148154"
            },
        {
            _id: "Chinese",
            average: "4.539814814814815"
            },
        {
            _id: "Italy",
            average: "2.8485714285714288"
            }
        ];
    $scope.clicked = function () {
        $scope.data = [
            {
                _id: "Austria",
                average: "4.539814814814815"
            },
            {
                _id: "Belgium",
                average: "3.5398148148148154"
            },
            {
                _id: "Chinese",
                average: "4.539814814814815"
            },
            {
                _id: "Italy",
                average: "2.8485714285714288"
            },
            {
                _id: "Mexican",
                average: "3.5398148148148154"
            },
            {
                _id: "Greek",
                average: "2.539814814814815"
            },
        ];
    }
}]);