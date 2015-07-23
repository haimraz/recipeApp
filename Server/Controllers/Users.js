// Requiers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
var User = require('../Models/User');
var Utils = require('../Common/Utils');

function authenticate(name, pass, fn) {
    // Looking for user with the same username
    User.find({username: name}, function (err, userFromDatabase) {
        if (err) {
            return null;
        }
        // Query succeeded
        else if (userFromDatabase[0] != null) {
            // Hash the entered password
            Utils.hash(pass, userFromDatabase[0].salt.toString(), function (err, hash) {
                // In case of error
                if (err) {
                    console.log("failed");
                    return fn(err);
                }

                // Check if the hash from database and the entered password hash are equal
                if (hash.toString('hex') == userFromDatabase[0].password) {
                    return fn(null, userFromDatabase[0]);
                }

                // The entered password is invalid
                fn(new Error('invalid password'));
            });
        }
        // The user is not exist
        else {
            return fn(new Error('cannot find user'));
        }
    });
}

function restrict(req, res, next) {
    if (Utils.currentUser(req)) {
        next();
    }
    else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

exports.login = function (req, res) {
    if (Utils.currentUser(req)) {
        Utils.generateResponse(req, res, 0, "User already connected");
    }
    else {
        authenticate(req.body.username, req.body.password, function (err, user) {
            if (user != null) {
                // Regenerate session when signing in
                // to prevent fixation
                req.session.regenerate(function () {
                    // Store the user's primary key
                    // in the session store to be retrieved
                    req.session.user = user;
                    console.log("Connected -> ", req.session.user);
                    Utils.generateResponse(req, res, 1, user.username);
                });
            }
            else {
                Utils.generateResponse(req, res, 0, err.message);
            }
        });
    }
};

exports.logout = function (req, res) {
    if (Utils.currentUser(req)) {
        req.session.destroy(function () {
            Utils.generateResponse(req, res, 1, "User disconnected");
        });
    }
    else {
        Utils.generateResponse(req, res, 0, "No user is connected");
    }
};

exports.getCurrentUser = function (req, res) {
    var user = Utils.currentUser(req);
    if (user) {
        Utils.generateResponse(req, res, 1, user.username);
    }
    else {
        Utils.generateResponse(req, res, 0, "No user is connected");
    }
};

exports.signup = function (req, res) {
    if (Utils.currentUser(req)) {
        Utils.generateResponse(req, res, 0, "User already connected");
    }
    else {
        User.find({username: req.body.username}, function (err, userFromDatabase) {
            console.log(req.body);

            if (err) {
                Utils.generateResponse(req, res, 0, err.message);
            }
            else if (userFromDatabase[0] == null) {
                if ((req.body.password.toString().length < 11) && (req.body.password.toString().length > 4 )) {
                    console.log("Got user: ", userFromDatabase);
                    var randomSalt = Math.floor(Math.random() * 9000) + 1000;

                    Utils.hash(req.body.password, randomSalt.toString(), function (err, hash) {
                        var newUser = new User({
                            _id: GLOBAL.DB.Types.ObjectId(),
                            username: req.body.username,
                            password: hash.toString('hex'),
                            creation_date: new Date,
                            email: req.body.email,
                            address: req.body.address,
                            salt: randomSalt
                        });

                        newUser.save(function (err) {
                            if (err) {
                                Utils.generateResponse(req, res, 0, err.message);
                                console.log(err);
                            }
                            else {
                                Utils.generateResponse(req, res, 1, "");
                            }
                        });
                    });
                }
                else
                    Utils.generateResponse(req, res, 0, "invalid password length. length should be between 5-10 characters");
            }
            else
                Utils.generateResponse(req, res, 0, "username already exist");
        });
    }
};

exports.checkIfUserExist = function (req, res) {
    var name = req.params.username;

    User.find({username: name}, function (err, userFromDatabase) {
        // If error occured
        if (err) {
            Utils.generateResponse(req, res, 0, err.message);
        }
        // If the user exist in database
        else if (userFromDatabase[0] != null) {
            Utils.generateResponse(req, res, 1, 'user exist');
        }
        else {
            Utils.generateResponse(req, res, 0, 'cannot find user');
        }
    });
};
