recApp.factory('allRecipesService', function () {

    var fac = {};

    fac.getAllRecipes = function () {
        //TODO get request to server
        var recipes = [
            {
                id: "1",
                title: "aaa",
                category: "sdsa",
                description: "asdsaasd",
                img: "Vendor/images/mypic.jpg",
                rank: "3"
            },
            {
                id: "2",
                title: "aaa",
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

    return fac;
});