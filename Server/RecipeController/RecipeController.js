/**
 * Created by Ilya on 15/07/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var Recipe = require('../Models/Recipe');
var app = express();

app.get('/getAllRecipes', function(req, res)
{
    console.log("Got req: "+ req.originalUrl +", method: "+req.method);

    Recipe.find({}, function(err, recipesFromDB) {
        if (!err){
            console.log(recipesFromDB);
            res.end(JSON.stringify(recipesFromDB));
        }
        else {
            console.log(err);
            generateResponse(req, res, 0, err);
        }
    });
});


function generateResponse(req, res, exitCode, message)
{
    var jsonResult = {"exit_code" : exitCode, "message" : message};
    res.end(JSON.stringify(jsonResult));

    if (exitCode == 0)
    {
        req.session.error = message;
        console.log(message);
    }
}

app.listen(80);
console.log('Express started on port ' + 80);