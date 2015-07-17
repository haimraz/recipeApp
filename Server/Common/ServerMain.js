var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Globals
GLOBAL.DB  = require('mongoose');
GLOBAL.DB.connect('mongodb://bbb:bbb@ds047722.mongolab.com:47722/recipedb');

var loginController = require('./../Controllers/Users');
var recipeController = require('./../Controllers/Recipes');
var commentController = require('./../Controllers/Comments');

var app = express(); 

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
app.post('/LoginController/login', loginController.login);
app.post('/LoginController/signup', loginController.signup);
app.get('/LoginController/checkIfUserExist/:username', loginController.checkIfUserExist);

// Recipes controller
app.get('/RecipeController/getAllRecipes', recipeController.getAllRecipes);
app.get('/RecipeController/getRecipeById/:id', recipeController.getRecipeById);
app.get('/RecipeController/getCommentsByRecipeId/:id', recipeController.getCommentsByRecipeId);

<<<<<<< HEAD:Server/ServerMain.js
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
=======
// Comments controller
//app.get('/Controllers/getAllRecipes', commentController.getAllRecipes);
app.post('/Controllers/addComment', commentController.addComment);
app.get('/Controllers/getCommentById/:id', commentController.getCommentById);
//app.get('/Controllers/getCommentsByRecipeId/:id', commentController.getCommentsByRecipeId);

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
>>>>>>> 0d5abf3f83b9132b20433417633842ba82592e5c:Server/Common/ServerMain.js

// posts
app.listen(80);
console.log('Express started on port 80');
