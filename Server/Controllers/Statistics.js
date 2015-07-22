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

exports.getCountByCategory = function(req,res)
{
    var agg = [
        {$group: {
            _id: "$category",

            // SUCCESS!!! :D
            total: {$sum: 1}

        }},
        {$match : req.body }
    ];

    Recipe.aggregate(agg, function(err, recipes){
        if (!err){
            res.end(JSON.stringify(recipes));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};