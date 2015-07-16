// Requiers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
var hash = require('./passEncryption').hash;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
var User = require('../Models/User');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
     

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
function authenticate(name, pass, fn) 
{   
	// Looking for user with the same username
	User.find({ username: name }, function(err, userFromDatabase) 
	{
  							if (err) 
							{
								return null;
							}
							// Query succeeded
							else if (userFromDatabase[0] != null)
						  	{
						  		// Hash the entered password
						  		hash(pass, userFromDatabase[0].salt.toString(), function(err, hash)
						  		{
						  			// In case of error
								    if (err) 
								    {
								    	console.log("failed");
								    	return fn(err);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
								    }
				    
				    				// Check if the hash from database and the entered password hash are equal
								    if (hash.toString('hex') == userFromDatabase[0].password) 
								    {
								    	return fn(null, userFromDatabase[0]); 
									}

									// The entered password is invalid
								    fn(new Error('invalid password'));
						  		});
						  	}
						  	// The user is not exist
							else
							{ 
						  		return fn(new Error('cannot find user'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
						  	}
		});
  };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
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
};

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
     */            

exports.login = function(req, res)
{
	console.log("BEFORE AUTH", req.body.username);

  authenticate(req.body.username, req.body.password, function(err, user)
  	{       
	    if (user != null) 
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
	    	generateResponse(req, res, 0, err.message);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
	    }
	});
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
     
exports.signup = function(req,res)
{
	console.log(req.body.username);
	console.log(req.body.password);
	User.find({ username: req.body.username }, function(err, userFromDatabase) 
	{
		console.log(req.body);
		var jsonResult;
		
		if (err) 
		{
			generateResponse(req, res, 0, err.message);
		}
		else if (userFromDatabase[0] == null)
		{
			if ((req.body.password.toString().length < 11) && (req.body.password.toString().length > 4 ))
			{
				console.log("Got user: ", userFromDatabase);
				var randomSalt = Math.floor(Math.random() * 9000) + 1000;

			  	hash(req.body.password, randomSalt.toString() ,function(err, hash)
			  	{
				    var newUser =  new User({
											 _id : GLOBAL.DB.Types.ObjectId(),
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
					  		generateResponse(req, res, 0, err.message);
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
 };

exports.checkIfUserExist = function(req,res)
{
	var name = req.params.username;
	
 	User.find({ username: name }, function(err, userFromDatabase)
	 	{
	 		// If error occured
	 		if (err) 
			{
				generateResponse(req, res, 0, err.message);
			}
			// If the user exist in database
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        