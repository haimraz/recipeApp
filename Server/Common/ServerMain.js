var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

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

// posts
app.listen(80);
console.log('Express started on port 80');
