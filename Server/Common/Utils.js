/**
 * Created by Ilya on 16/07/2015.
 */
var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} pwd to hash
 * @param {String} salt
 * @param {Function} fn
 * @api public
 */

exports.hash = function (pwd, salt, fn) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
};

exports.generateResponse = function (req, res, exitCode, message, fn)
{
    var jsonResult = {"exit_code" : exitCode, "message" : message};

    if (fn) {
        res = JSON.stringify(jsonResult);
        fn(exitCode, res);
    }
    else
        res.end(JSON.stringify(jsonResult));

    if (exitCode == 0)
    {
        req.session.error = message;
        console.log(message);
    }
};

exports.currentUser = function (req) {
    return req.session.user;
};