/**
 * Created by Ilya on 15/07/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var Recipe = require('../Models/Recipe');
var Utils = require('../Common/Utils');
var app = express();


exports.getAllRecipes = function(req,res)
{
    Recipe.find({}, function(err, recipesFromDB) {
        if (!err){
            res.end(JSON.stringify(recipesFromDB));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.getRecipeById = function(req,res)
{
    console.log(req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Recipe.findById(id, function(err, recipeFromDB) {
        if (!err){
            console.log(recipeFromDB);
            res.end(JSON.stringify(recipeFromDB));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.getCommentsByRecipeId = function(req,res)
{
    var id = mongoose.Types.ObjectId(req.params.id);
    Recipe.findById(id, function(err, recipeFromDB) {
        if (!err){
            console.log(recipeFromDB.comments);
            res.end(JSON.stringify(recipeFromDB.comments));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};
