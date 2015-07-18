recApp.factory('allRecipesService', ['$rootScope', '$http', function ($rootScope, $http) {

    var fac = {};

    fac.getAllRecipesDemo = function () {
        var recipes = [
            {
                id: "1",
                title: "bbb",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "2",
                title: "bbb",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "3",
                title: "aaa",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "4",
                title: "aaa",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "5",
                title: "aaa",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "6",
                title: "aaa",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "7",
                title: "aaa",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
        ]

        return recipes;
    }

    fac.getAllRecipes = function () {
        return $http.get($rootScope.url + 'Recipes/getAllRecipes');
    }

    return fac;
}]);