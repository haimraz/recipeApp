var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Utils = require('../Common/Utils');

// Globals
GLOBAL.DB = require('mongoose');
GLOBAL.DB.connect('mongodb://bbb:bbb@ds047722.mongolab.com:47722/recipedb');
//GLOBAL.DB.socket = socket;

var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server)
    , session = require('express-session');

var loginController = require('./../Controllers/Users');
var recipeController = require('./../Controllers/Recipes');
var commentController = require('./../Controllers/Comments');
var configController = require('./../Controllers/Configs');
var statisticsController = require('./../Controllers/Statistics');


// Config

//app.set('view engine', 'jade');
//app.set('views', __dirname + '/views');

// middleware

app.use(cookieParser());
app.use(bodyParser.json());

app.use(session(
    {
        cookieName: 'session',
        genid: function () {
            return guid(); // use UUIDs for session IDs
        },
        secret: 'asavadv'
    }
));

//app.use(express.static(__dirname + '/public'));

// General
var port = 8080;
//app.get('/', site.index);

// Login controller
app.post('/Users/login', loginController.login);
app.post('/Users/logout', loginController.logout);
app.post('/Users/signup', loginController.signup);
app.get('/Users/getCurrentUser', loginController.getCurrentUser);
app.get('/Users/checkIfUserExist/:username', loginController.checkIfUserExist);

// Recipes controller
app.get('/Recipes/getAllRecipes', recipeController.getAllRecipes);
app.get('/Recipes/getRecipeById/:id', recipeController.getRecipeById);
app.get('/Recipes/getCommentsByRecipeId/:id', recipeController.getCommentsByRecipeId);
app.put('/Recipes/addRank/:id', recipeController.addRank);

// Comments controller
app.get('/Comments/getCommentById/:id', commentController.getCommentById);
app.post('/Comments/addCommentToRecipe/:id', commentController.addCommentToRecipe);
app.post('/Comments/removeCommentFromRecipe/:id', commentController.removeCommentFromRecipe);
app.put('/Comments/updateComment/:id', commentController.updateComment);

// Config controller
app.get('/Configs/getAllConfigs', configController.getAllConfigs);

// Statistics controller
app.put('/Statistics/getCountByCategory', statisticsController.getCountByCategory);
app.put('/Statistics/getAverageRankByCuisine', statisticsController.getAverageRankByCuisine);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

//Socket.io manager

var usernames = {};

//io.sockets.on('connect', function(client) {
//    clients.push(client);
//
//    client.on('disconnect', function() {
//        clients.splice(clients.indexOf(client), 1);
//    });
//});

io.sockets.on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendAdd', function (req) {
      //  console.log(JSON.stringify(socket));
      //  console.log(req.session.user);
        if (socket.username) {
            req.body = {
                recId: req.recId,
                content: req.content,
                creation_date: new Date,
                creating_user: socket.username
            };

            var res = {};
            commentController.addCommentToRecipe(req, res,
                function (errCode, data) {
                    io.sockets.emit('addComment', data);
                    if (errCode == 1)
                        socket.broadcast.emit('addComment', 'SERVER', data);
                });
        }
    });

    socket.on('sendEdit', function (req) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        console.log(req);
        console.log(socket.username);
        if (socket.username) {
            req.body = {
                commentId: req.commentId,
                content: req.content
            };

            var res = {};
            commentController.updateComment(req, res,
                function (errCode, data) {
                    io.sockets.emit('editComment', data);
                    if (errCode == 1)
                        socket.broadcast.emit('editComment', 'SERVER', data);
                });
        }
    });

    socket.on('sendDelete', function (req) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        console.log(socket.username);
        if (socket.username) {
            req.body = {
                commentId: req.commentId,
                recipeId: req.recipeId
            };

            var res = {};
            commentController.removeCommentFromRecipe(req, res,
                function (errCode, data) {
                    io.sockets.emit('deleteComment', data);
                    if (errCode == 1)
                        socket.broadcast.emit('deleteComment', 'SERVER', data);
                });
        }
    });

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function (username) {
        console.log('Socket Connected', username);
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client they've connected
        //socket.emit('updatechat', 'SERVER', 'you have connected');
        // echo globally (all clients) that a person has connected
    });

    // when the user disconnects.. perform this
    socket.on('discon', function () {
        console.log('Socket disconed', socket.username);
        // remove the username from global usernames list
        delete usernames[socket.username];

        // update list of users in chat, client-side
        //io.sockets.emit('desconnected', socket.username);
        socket.username = null;
        // echo globally that this client has left
        //socket.broadcast.emit('updateComments', 'SERVER', socket.username + ' has disconnected');
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        console.log('Socket disconnected', socket.username);
        // remove the username from global usernames list
        delete usernames[socket.username];

        // update list of users in chat, client-side
        //io.sockets.emit('desconnected', socket.username);
        socket.username = null;
        // echo globally that this client has left
        //socket.broadcast.emit('updateComments', 'SERVER', socket.username + ' has disconnected');
    });
});

// posts
//app.listen(80);
//app.listen(port);
server.listen(port);
console.log('Express started on port', port);
