// grab the things we need
var Schema = GLOBAL.DB.Schema;

// create a schema
var recipeSchema = new Schema({
  //_id: { type: ObjectId, required: true, unique: true , index : true},
  category: { type: String, required: true},
  comments: [{type:Schema.Types.ObjectId, ref:'Comment'}],
  ingredients: [{ type: String, required: true }],
  directions: { type: String, required: true},
  title : {type: String, required: true},
  rankers: { type: Number, required: true, default: 0},
  rank: { type: Number, required: true, default: 0.0},
  cuisine : {type: String, required: true},
  picture_path_small : {type: String, required: false},
  picture_path_big : {type: String, required: false},
  difficulty : {type : Number}
});

// the schema is useless so far
// we need to create a model using it
var Recipe = GLOBAL.DB.model('Recipe', recipeSchema);

// make this available to our users in our Node applications
module.exports = Recipe;