// grab the things we need
var mongoose = require('mongoose');
var validator = require("email-validator");
var Schema = mongoose.Schema;

mongoose.connect('mongodb://bbb:bbb@ds047722.mongolab.com:47722/recipedb');

// create a schema
var userSchema = new Schema({
  //_id: { type: String, required: true, unique: true , index : true},
  username: { type: String, required: true, unique: true, validate : [ UsernameValidator , "The username minimal length is 8 characters" ]},
  password: { type: String, required: true },
  email: { type: String, required: true, validate : [emailValidator, "The email you enterd is invalid"]},
  address : {type: String, required: true},
  creation_date: Date,
  salt : {type: Number, required: true, min : 1000, max : 9999}
});

function emailValidator(v)
{
	return validator.validate(v);
}

function UsernameValidator (v) {
  return v.length > 7;
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;