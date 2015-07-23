/**
 * Created by Ilya on 17/07/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var Utils = require('../Common/Utils');
var Comment = require('../Models/Comment');
var Recipe = require('../Models/Recipe');
var User = require('../Models/User');
var app = express();

exports.getCommentById = function (req, res) {
    //console.log(req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Comment.findById(id, function (err, commentFromDB) {
        if (!err) {
            console.log(commentFromDB);
            res.end(JSON.stringify(commentFromDB));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.updateComment = function (req, res, fn) {
    var commentId = req.body.commentId;
    var content = req.body.content;
    var query = {_id: commentId};

    Comment.update(query, {content: content}, function (err) {
        if (err) {
            Utils.generateResponse(req, res, 0, err.message, fn);
        }
        else {
            Utils.generateResponse(req, res, 1, req.body, fn);
        }
    })
};

exports.removeCommentFromRecipe = function (req, res, fn) {
    var recipeId = req.body.recipeId;
    var commentId = req.body.commentId;

    Comment.remove({_id: commentId}, function (err) {
        if (err) {
            Utils.generateResponse(req, res, 0, err.message, fn);
        }
        else {
            Recipe.findById(recipeId, function (err, recipe) {
                console.log(recipe);
                if (err) {
                    Utils.generateResponse(req, res, 0, err.message, fn);
                }
                else if (recipe) {
                    recipe.comments.pull(commentId);
                    console.log(recipe);
                    recipe.save(
                        function (err) {
                            if (err) {
                                Utils.generateResponse(req, res, 0, err, fn);
                            }
                            else {
                                Utils.generateResponse(req, res, 1, req.body, fn);
                            }
                        });
                }
                else {
                    Utils.generateResponse(req, res, 0, "Recipe doesn't exist", fn);
                }
            });
            //Utils.generateResponse(req, res, 1, "");
        }
    })
};

exports.addCommentToRecipe = function (req, res, fn) {
    var recipeId = req.body.recId;

    var newComment = new Comment({
        _id: GLOBAL.DB.Types.ObjectId(),
        content: req.body.content,
        creation_date: (req.body.date) ? req.body.date : new Date,
        creating_user: req.body.creating_user
    });

    newComment.save(function (err) {
        if (!err) {

            Recipe.findById(recipeId, function (err, recipe) {
                console.log(recipe);
                if (err) {
                    Utils.generateResponse(req, res, 0, err.message, fn);
                }
                else if (recipe) {
                    recipe.comments.push(newComment);
                    console.log(recipe);
                    recipe.save(
                        function (err) {
                            if (err) {
                                console.log(err);
                                Utils.generateResponse(req, res, 0, err.message, fn);
                            }
                            else {
                                Utils.generateResponse(req, res, 1, newComment, fn);
                            }
                        });
                }
                else {
                    Utils.generateResponse(req, res, 0, "Recipe doesn't exist", fn);
                }
            });
        }
        else {
            console.log(err);
            Utils.generateResponse(req, res, 0, err.message, fn);
        }
    });
};