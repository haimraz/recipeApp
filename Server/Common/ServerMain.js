var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Globals
GLOBAL.DB = require('mongoose');
GLOBAL.DB.connect('mongodb://bbb:bbb@ds047722.mongolab.com:47722/recipedb');

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
app.get('/Statistics/getCountByCategory', statisticsController.getCountByCategory);

//Socket.io manager
io.sockets.on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendAdd', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        console.log(data);
        io.sockets.emit('addComment', socket.username, data);
    });

    socket.on('sendEdit', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        console.log(data);
        io.sockets.emit('editComment', socket.username, data);
    });

    socket.on('sendDelete', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //
        console.log(data);
        io.sockets.emit('DeleteComment', socket.username, data);
    });

    // when the user disconnects.. perform this
    //socket.on('disconnect', function(){
    //    // remove the username from global usernames list
    //    delete usernames[socket.username];
    //    // update list of users in chat, client-side
    //    io.sockets.emit('updateusers', usernames);
    //    // echo globally that this client has left
    //    socket.broadcast.emit('updateComments', 'SERVER', socket.username + ' has disconnected');
    //});
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

// posts
//app.listen(80);
server.listen(port);
console.log('Express started on port', port);
