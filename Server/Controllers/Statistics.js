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

exports.getCountByCategory = function (req, res) {
    var agg = [];
    var filter = {};
    if(req.body) {
        if(req.body.rank)
            filter.rank = { $gte : req.body.rank };
        if(req.body.difficulty)
            filter.difficulty = { $lte : req.body.difficulty };
        if(req.body.ingredients)
            filter.$text = {$search : req.body.ingredients };

        console.log('filter: ', JSON.stringify(filter));
        agg.push({$match: filter});
    }

    agg.push({
        $group: {
            _id: "$category"
            , total: {$sum: 1}
        }
    });
    console.log('agg', JSON.stringify(agg));

    Recipe.aggregate(agg, function (err, recipes) {
        if (!err) {
            res.end(JSON.stringify(recipes));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.getAverageRankByCuisine = function (req, res) {
    var agg = [];
    var filter = {};
    if(req.body) {
        if(req.body.rankers)
            filter.rankers = { $gte : req.body.rankers };
        if(req.body.category)
            filter.category = req.body.category;
        if(req.body.ingredients)
            filter.$text = {$search : req.body.ingredients };

        console.log('filter: ', JSON.stringify(filter));
        agg.push({$match: filter});
    }

    agg.push({
        $group: {
            _id: "$cuisine"
            , average: {$avg: '$rank'}
        }
    });

    Recipe.aggregate(agg, function (err, recipes) {
        if (!err) {
            res.end(JSON.stringify(recipes));
        }
        else {
            Utils.generateResponse(req, res, 0, err);
        }
    });
};

//{
//    $match: {
//        _id: {
//            $in: product.Comments
//        }
//    }
//}
//,
//{
//    $group: {
//        _id: product._id, average
//    :
//        {
//            $avg: '$Rating'
//        }
//    }
//}