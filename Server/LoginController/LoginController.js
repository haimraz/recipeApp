// grab the user model
var express = require('express');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
var hash = require('./passEncryption').hash;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
var bodyParser = require('body-parser');  
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");

var User = require('../Models/User');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
var app = express();  
     

// config                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// middleware                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

app.use(bodyParser.json());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.use(cookieParser());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

app.use(session(
	{
	  genid: function(req) 
		  {
		    return guid(); // use UUIDs for session IDs 
		  },
	  secret: 'asavadv'
	}
));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
// Session-persisted message middleware                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// app.use(function(req, res, next){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
//   var err = req.session.error                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
//     , msg = req.session.success;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
//   delete req.session.error;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
//   delete req.session.success;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
//   next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
// });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// dummy database                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// when you create a user, generate a salt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
// and hash the password ('foobar' is the pass here)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// hash('foobar', function(err, salt, hash){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
//   if (err) throw err;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//   // store the salt & hash in the "db"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
//   users.tj.salt = salt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
//   users.tj.hash = hash.toString();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
// });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// Authenticate using our plain-object database of doom!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
function authenticate(name, pass, fn) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  if (!module.parent) 
  	console.log('authenticating %s:%s', name, pass);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  
	User.find({ username: name }, function(err, userFromDatabase) {
  							if (err) 
  								{
  									return null;
  								}
  								else if (userFromDatabase[0] != null)
							  	{
  									console.log("Got user: ", userFromDatabase);
							  		
							  		hash(pass, userFromDatabase[0].salt.toString(), function(err, hash){
							  		console.log("Got hash: ", hash.toString('hex'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
								    
								    if (err) 
								    	return fn(err);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
								    
								    if (hash.toString() == userFromDatabase[0].hash) 
								    	return fn(null, userFromDatabase[0]); 

								    fn(new Error('invalid password'));
							  		});
							  	}
								else
								{ 
							  		return fn(new Error('cannot find user'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
							  	}
		});

  	
  }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
function restrict(req, res, next) 
{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  if (req.session.user) 
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  } 
  else 
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    req.session.error = 'Access denied!';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    res.redirect('/login');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}    

/*
app.get('/restricted', restrict, function(req, res)
{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.get('/logout', function(req, res)
{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  // destroy the user's session to log them out                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  // will be re-created next request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    res.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.get('/login', function(req, res)
{  
	console.log("Got req: "+req.originalUrl+", method: "+req.method);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  	res.render('login');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
     */            
exports.login = function(req, res)
{
  authenticate(req.body.username, req.body.password, function(err, user)
  	{        
	    if (user) 
	    {                 
	        // Regenerate session when signing in                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
	        // to prevent fixation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
	        req.session.regenerate(function()
	        {     
		        // Store the user's primary key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
		        // in the session store to be retrieved                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
		        req.session.user = user._id; 
		        generateResponse(req, res, 1, "");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	      	});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	    } 
	    else 
	    {  
	    	generateResponse(req, res, 0, err);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
	    }
	});
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
     
exports.signup = function(req,res)
{
	User.find({ username: req.body.username }, function(err, userFromDatabase) 
	{
		console.log(req.body);
		var jsonResult;
		
		if (err != null) 
		{
			generateResponse(req, res, 0, err);
		}
		else if (userFromDatabase[0] == null)
		{
			if ((req.body.password.length() < 11) && (req.body.password.length() > 4 ))
			{
				console.log("Got user: ", userFromDatabase);
				var randomSalt = Math.floor(Math.random() * 9000) + 1000;

			  	hash(req.body.password, randomSalt.toString() ,function(err, hash)
			  	{
				    var newUser =  new User({
											 _id : mongoose.Types.ObjectId(),
											  username : req.body.username,
											  password : hash.toString('hex'),
											  creation_date : new Date,
											  email : req.body.email,
											  address: req.body.address,
											  salt : randomSalt
											});
					
					newUser.save(function(err) 
					{
					  	if (err)
					  	{
					  		generateResponse(req, res, 0, err);
					  	 	console.log(err);
					  	} 
					  	else
					  	{
					  	 	generateResponse(req, res, 1, "");
					  	}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
					});
				});
			}
			else
				generateResponse(req, res, 0, "invalid password length. length should be between 5-10 characters");
		}
		else
			generateResponse(req, res, 0, "username already exist");
	});
};

 function generateResponse(req, res, exitCode, message)
 {
 	var jsonResult = {"exit_code" : exitCode, "message" : message};
	res.end(JSON.stringify(jsonResult));

	if (exitCode == 0)
	{
		req.session.error = message;
		console.log(message);
	}   
 }

exports.checkIfUserExist = function(req,res)
{
	var name = req.params.username;
	console.log(name);
 	User.find({ username: name }, function(err, userFromDatabase)
	 	{
	 		if (err) 
			{
				generateResponse(req, res, 0, err);
			}
			else if (userFromDatabase[0] != null)
		  	{
		  		generateResponse(req, res, 1, 'user exist');
		  	}
			else
			{ 
				generateResponse(req, res, 0, 'cannot find user');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
		  	}
	 	});
};
                   

 function guid() 
 {
	  function s4() 
	  {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }

	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        