/**
 * Created by Ilya on 22/07/2015.
 */


var usernames = {};
//Socket.io manager
io.sockets.on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendAdd', function (req) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        //if (session.user) {
        //socket.username = session.user.username;
        //console(req.session.user);
        console.log(req);

        req.body = {
            recId: req.recId,
            content: req.content,
            creation_date: new Date,
            creating_user: socket.username
        };

        var res = {};
        commentController.addCommentToRecipe(req, res,
            function(errCode, data){
                io.sockets.emit('addComment', data);
                if (errCode == 1)
                    socket.broadcast.emit('addComment', 'SERVER', data);
            });
    });

    socket.on('sendEdit', function (req) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        console.log(req);

        req.body = {
            commentId: req.commentId,
            content: req.content
        };

        var res = {};
        commentController.updateComment(req, res,
            function(errCode, data){
                io.sockets.emit('editComment', data);
                if (errCode == 1)
                    socket.broadcast.emit('editComment', 'SERVER', data);
            });
    });

    socket.on('sendDelete', function (req) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        req.body = {
            commentId: req.commentId,
            recipeId: req.recipeId
        };

        var res = {};
        commentController.removeCommentFromRecipe(req, res,
            function(errCode, data){
                io.sockets.emit('deleteComment', data);
                if (errCode == 1)
                    socket.broadcast.emit('deleteComment', 'SERVER', data);
            });
    });

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function (username) {
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client they've connected
        //socket.emit('updatechat', 'SERVER', 'you have connected');
        // echo globally (all clients) that a person has connected
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        //io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        //socket.broadcast.emit('updateComments', 'SERVER', socket.username + ' has disconnected');
    });
});