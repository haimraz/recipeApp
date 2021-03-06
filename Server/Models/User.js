// grab the things we need
var validator = require("email-validator");
var Schema = GLOBAL.DB.Schema;


// create a schema
var userSchema = new Schema({
  //_id: { type: String, required: true, unique: true , index : true},
  username: { type: String, required: true, unique: true, validate : [ UsernameValidator , "The username should be 3 to 8 characters" ]},
  password: { type: String, required: true },
  email: { type: String, required: true, validate : [emailValidator, "The email you entered is invalid"]},
  address : {type: String, required: true},
  creation_date: Date,
  salt : {type: Number, required: true, min : 1000, max : 9999}
});

function emailValidator(v)
{
	return validator.validate(v);
}

function UsernameValidator (v) {
  return (v.length > 3 && v.length < 9);
}

// the schema is useless so far
// we need to create a model using it
var User = GLOBAL.DB.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;