/**
 * Created by Ilya on 16/07/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var Utils = require('../Common/Utils');
var Recipe = require('../Models/Recipe');
var app = express();

exports.getCountByDifficulty = function(req,res)
{
    Recipe.aggre({}, function(err, recipesFromDB) {
        if (!err){
            res.end(JSON.stringify(recipesFromDB));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};