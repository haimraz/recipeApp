// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://bbb:bbb@ds047722.mongolab.com:47722/recipedb');

// create a schema
var recipeSchema = new Schema({
  _id: { type: String, required: true, unique: true , index : true},
  category: { type: String, required: true},
  ingredients: { type: String, required: true },
  directions: { type: String, required: true},
  title : {type: String, required: true},
  rank: { type: Number, required: true},
  cuisine : {type: String, required: true},
  picture_path : {type: String, required: true},
  difficulty : {type : Number},
  comments: [{ id: String, content: String, creating_date: Date, creating_user: String, title: String }]
});

// the schema is useless so far
// we need to create a model using it
var Recipe = mongoose.model('Recipe', recipeSchema);

// make this available to our users in our Node applications
module.exports = Recipe;