/**
 * Created by Ilya on 18/07/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var Utils = require('../Common/Utils');
var Config = require('../Models/Config');
var app = express();

exports.getAllConfigs = function (req, res) {
    Config.find({}, function (err, configs) {
        if (!err) {
            res.end(JSON.stringify(configs));
        }
        else {
            Utils.generateResponse(req, res, 0, err.message);
        }
    });
};