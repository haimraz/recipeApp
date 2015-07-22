/**
 * Created by Ilya on 17/07/2015.
 */
var Schema = GLOBAL.DB.Schema;

var commentSchema = new Schema({
    _id: String
    ,content: String
    ,creation_date: Date
    ,creating_user: String
});

// the schema is useless so far
// we need to create a model using it
var Comment = GLOBAL.DB.model('Comment', commentSchema);

// make this available to our users in our Node applications
module.exports = Comment;