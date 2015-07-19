var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Globals
GLOBAL.DB = require('mongoose');
GLOBAL.DB.connect('mongodb://bbb:bbb@ds047722.mongolab.com:47722/recipedb');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
	cookieName :'session',
	genid: function()
		  {
		    return guid(); // use UUIDs for session IDs 
		  },
	  secret: 'asavadv'
	}
));

//app.use(express.static(__dirname + '/public'));

// General

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
io.on('connection', function(socket){
	  console.log('a user connected');

	  socket.on('doSend', function(msg)
	  {
	    io.emit('doSend', msg);
	    console.log('message: ' + msg);
	  });

	  socket.on('addMessage', function(msg)
	  {
	    io.emit('addMessage', msg);
	    console.log('message: ' + msg);
	  });

	  socket.on('removeMessage', function(msg)
	  {
	    io.emit('removeMessage', msg);
	    console.log('message: ' + msg);
	  });

	  socket.on('updateMessage', function(msg)
	  {
	    io.emit('updateMessage', msg);
	    console.log('message: ' + msg);
	  });
});

function guid()
{
  function s4()
  {
	return Math.floor((1 + Math.random()) * 0x10000)
	  .toString(16)
	  .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

// posts
app.listen(80);
console.log('Express started on port 80');
