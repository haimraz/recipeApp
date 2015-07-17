// grab the things we need
var Schema = GLOBAL.DB.Schema;

// create a schema
var recipeSchema = new Schema({
  //_id: { type: ObjectId, required: true, unique: true , index : true},
  category: { type: String, required: true},
  ingredients: { type: String, required: true },
  directions: { type: String, required: true},
  title : {type: String, required: true},
  rank: { type: Number, required: true},
  cuisine : {type: String, required: true},
  picture_path : {type: String, required: true},
  difficulty : {type : Number},
  comments: [{type:Schema.ObjectId, ref:'Comment'}]
});

// the schema is useless so far
// we need to create a model using it
var Recipe = GLOBAL.DB.model('Recipe', recipeSchema);

// make this available to our users in our Node applications
module.exports = Recipe;