recApp.factory('bigRecipeService', ['$http', '$rootScope', 'userService', function ($http, $rootScope, userService) {

    var Service = {};
    Service.loadBigRecipePage = function (recipeId, scope) {
        Service.scope = scope;
        return $http.get($rootScope.url + 'Recipes/getRecipeById/' + recipeId);
    }

    socket.on('addComment', function (data) {
        writeToScreen(data);
        data = JSON.parse(data);
        if (data.exit_code == 1) {
            addMessage(data);
        }
    });

    socket.on('deleteComment', function (data) {
        writeToScreen(data);
        data = JSON.parse(data);
        if (data.exit_code == 1) {
            deleteMessage(data);
        }
    });

    socket.on('editComment', function (data) {
        writeToScreen(data);
        data = JSON.parse(data);
        if (data.exit_code == 1) {
            editMessage(data);
        }

    });

    Service.doAdd = function (message) {
        writeToScreen("Add: " + message);
        socket.emit('sendAdd', message);
    }

    Service.doDel = function (comId) {
        writeToScreen("Del: " + comId);
        socket.emit('sendDelete', comId);
    }

    Service.doEdit = function (message) {
        writeToScreen("Edit: " + message);
        socket.emit('sendEdit', message);
    }

    function deleteMessage(data) {
        var result = $.grep(Service.scope.recipeData.comments, function (e) {
            return e._id != data.message.commentId;
        });
        Service.scope.recipeData.comments = result;
        Service.scope.$apply();
    }

    function editMessage(data) {
        for (var i = 0; i < Service.scope.recipeData.comments.length; i++)
        {
            if(Service.scope.recipeData.comments[i]._id == data.message.commentId)
            {
                Service.scope.recipeData.comments[i].content = data.message.content;
            }
        }

        Service.scope.$apply();
    }

    function addMessage(data) {
        var msgDate = new Date(data.message.creation_date);
        data.message.creation_date = msgDate.format("dd-m-yy");
        data.message.isShow = (Service.scope.$parent.user == data.message.creating_user);
        Service.scope.recipeData.comments.push(data.message);
        Service.scope.$apply();
    }

    // TODO function for test
    function writeToScreen(message) {
      //  console.log(message);
    }

    return Service;

}]);