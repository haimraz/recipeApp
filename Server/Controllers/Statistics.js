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

exports.getCountByCategory = function (req, res)
{
    var agg = [];

    // Building the query filters with the users parameters
    var filter = {};

    // In case the body is not empty
    if(req.body)
    {
        // Add rank filter if not empty
        if(req.body.rank)
            filter.rank = { $gte : req.body.rank };

        // Add difficulty filter if not empty
        if(req.body.difficulty)
            filter.difficulty = { $lte : req.body.difficulty };

        // Add ingredients filter if not empty
        if(req.body.ingredients)
            filter.$text = {$search : req.body.ingredients };

        // Add the filters to the aggregation array
        agg.push({$match: filter});
    }

    // Add the group field to aggregation array
    agg.push({
        $group: {
            _id: "$category"
            , total: {$sum: 1}
        }
    });

    // Aggregate
    Recipe.aggregate(agg, function (err, recipes)
    {
        if (!err)
        {
            Utils.generateResponse(req, res, 1, recipes);
        }
        else
        {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.getAverageRankByCuisine = function (req, res)
{
    var agg = [];
    var filter = {};

    // In case the body is not empty
    if(req.body)
    {
        // Add rankers filter if not empty
        if(req.body.rankers)
            filter.rankers = { $gte : req.body.rankers };

        // Add category filter if not empty
        if(req.body.category)
            filter.category = req.body.category;

        // Add ingredients filter if not empty
        if(req.body.ingredients)
            filter.$text = {$search : req.body.ingredients };

        // Add the filters to aggregation array
        agg.push({$match: filter});
    }

    // Add the group field to aggregation array
    agg.push({
        $group: {
            _id: "$cuisine"
            , average: {$avg: '$rank'}
        }
    });

    // Aggregate
    Recipe.aggregate(agg, function (err, recipes)
    {
        if (!err)
        {
            Utils.generateResponse(req, res, 1, recipes);
        }
        else
        {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};