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
    console.log(req.params.id);
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

exports.updateComment = function(req,res)
{
    var commentId = req.params.id;
    var query = {_id : commentId};

    Comment.update(query,{content : req.body.content, title: req.body.title}, function(err)
    {
        if (err)
        {
            Utils.generateResponse(req, res, 0, err.message);
        }
        else
        {
            Utils.generateResponse(req, res, 1, "");
        }
    })
};

exports.removeCommentFromRecipe = function(req,res)
{
    var recipeId = req.params.id;
    var commentId = req.body.commentid;
    Comment.remove({_id : commentId }, function(err){

        if (err)
        {
            Utils.generateResponse(req, res, 0, err.message);
        }
        else
        {
            Recipe.findById(recipeId, function (err, recipe)
            {
                console.log(recipe);
                if (err)
                {
                    Utils.generateResponse(req, res, 0, err.message);
                }
                else if (recipe)
                {
                    recipe.comments.pull(commentId);
                    console.log(recipe);
                    recipe.save(
                        function(err)
                        {
                            if (err)
                            {
                                Utils.generateResponse(req, res, 0, err);
                            }
                            else
                            {
                                Utils.generateResponse(req, res, 1, "");
                            }
                        });
                }
                else
                {
                    Utils.generateResponse(req, res, 0, "Recipe doesn't exist");
                }
            });
            //Recipe.update(
            //    {'_id': req.params.id},
            //    { $pull: { "comments" : { id: commentId }}},
            //    function(err)
            //    {
            //        if (err)
            //        {
            //            Utils.generateResponse(req, res, 0, err.message);
            //        }
            //        else
            //        {
            //            Utils.generateResponse(req, res, 1, "");
            //        }
            //    }
            //);

            Utils.generateResponse(req, res, 1, "");
        }
    })
};

exports.addCommentToRecipe = function(req,res)
{
    var recipeId = req.params.id;

    var newComment = new Comment({
        _id: GLOBAL.DB.Types.ObjectId(),
        content: req.body.content,
        creation_date: new Date,
        creating_user: req.body.creating_user,
        title: req.body.title
    });

    newComment.save(function (err) {
        if (!err) {

            Recipe.findById(recipeId, function (err, recipe)
            {
                console.log(recipe);
                if (err)
                {
                    Utils.generateResponse(req, res, 0, err.message);
                }
                else if (recipe)
                {
                    recipe.comments.push(newComment);
                    console.log(recipe);
                    recipe.save(
                        function(err)
                        {
                            if (err)
                            {
                                Utils.generateResponse(req, res, 0, err);
                            }
                            else
                            {
                                Utils.generateResponse(req, res, 1, "");
                            }
                        });
                }
                else
                {
                    Utils.generateResponse(req, res, 0, "Recipe doesn't exist");
                }
            });
        }
        else {
            Utils.generateResponse(req, res, 0, err.message);
            console.log(err);
        }
    });
};