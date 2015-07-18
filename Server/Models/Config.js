/**
 * Created by Ilya on 18/07/2015.
 */
// grab the things we need
var Schema = GLOBAL.DB.Schema;

// create a schema
var configSchema = new Schema({
    //_id: { type: ObjectId, required: true, unique: true , index : true},
    fbPage: {type: String, required: true},
    address: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    supportHours: {type: String, required: true}
});

// the schema is useless so far
// we need to create a model using it
var Config = GLOBAL.DB.model('Config', configSchema);

// make this available to our users in our Node applications
module.exports = Config;