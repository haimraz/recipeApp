/**
 * Created by Ilya on 15/07/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var Comment = require('../Models/Comment');
var Recipe = require('../Models/Recipe');
var User = require('../Models/User');
var Utils = require('../Common/Utils');
var app = express();


exports.getAllRecipes = function (req, res) {
    Recipe.find({}, '_id category cuisine picture_path_small rank title', function (err, recipesFromDB) {
        if (!err) {
            res.end(JSON.stringify(recipesFromDB));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.getRecipeById = function (req, res) {
    console.log(req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Recipe.findById(id)
        .populate('comments')
        .exec(function (err, recipeFromDB) {
            if (!err) {
                console.log(recipeFromDB);
                res.end(JSON.stringify(recipeFromDB));
            }
            else {
                Utils.generateResponse(req, res, 0, err);
            }
        });
};

exports.getCommentsByRecipeId = function (req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    Recipe.findById(id).
        populate('comments') // only works if we pushed refs to children
        .exec(function (err, recipeFromDB) {
            if (!err) {
                console.log(recipeFromDB.comments);
                res.end(JSON.stringify(recipeFromDB.comments));
            }
            else {
                Utils.generateResponse(req, res, 0, err);
            }
        });
};
