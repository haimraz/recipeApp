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

exports.getCommentById = function(req, res){
    console.log(req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Comment.findById(id, function(err, commentFromDB) {
        if (!err){
            console.log(commentFromDB);
            res.end(JSON.stringify(commentFromDB));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.addComment = function(req, res){
    var recipeid = mongoose.Types.ObjectId(req.params.recipeId);
    var newComment =  new Comment({
        _id : GLOBAL.DB.Types.ObjectId(),
        content : req.body.content,
        creation_date : new Date,
        creating_user : req.body.creating_user,
        title: req.body.title
    });
    //Recipe.findById(recipeid)
    newComment.save(function(err)
    {
        if (!err)
        {
            Utils.generateResponse(req, res, 1, "");
        }
        else
        {
            Utils.generateResponse(req, res, 0, err.message);
            console.log(err);
        }
    });


};