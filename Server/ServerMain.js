var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');
var loginController = require('./LoginController/LoginController');
var recipeController = require('./RecipeController/RecipeController');

var app = express();
module.exports = app;

// Config

//app.set('view engine', 'jade');
//app.set('views', __dirname + '/views');


/* istanbul ignore next */


//app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/public'));

// General

//app.get('/', site.index);

// Login controller

app.post('/LoginController/login', loginController.login);
app.post('/LoginController/signup', loginController.signup);
app.get('/LoginController/checkIfUserExist/:username', loginController.checkIfUserExist);

// Recepies controller
app.get('/RecipeController/getAllRecipes', recipeController.getAllRecipes);
app.get('/RecipeController/getRecipeById/:id', recipeController.getRecipeById);

// posts


/* istanbul ignore next */
if (!module.parent) {
  app.listen(80);
  console.log('Express started on port 80');
}
