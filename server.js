var Express = require('express');
var App = Express();
var Passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BodyParser = require('body-parser');
var Session  = require('express-session');
var Mongoose = require('mongoose');


var port = 9001;
var mongoURI = 'localhost:27017/full-stack-ecommerce';


// Controllers =======================


var userCtrl = require('./server-assets/controllers/user-control');
var productCtrl = require('./server-assets/controllers/product-control');




// Middleware =========================

Passport.serializeUser(function(user, done){
	done(null, user);
});

Passport.deserializeUser(function(obj, done){
	userCtrl.getUser(obj.id).then(function(results){
		done(null, results);
	}, function(err){
		done(err, null);
	})
});


App.use(Express.static(__dirname + '/public'));
App.use(BodyParser.json());
App.use(Session({ secret: 'EcommerceSIKRIT' }));
App.use(Passport.initialize());
App.use(Passport.session());


Passport.use(new GoogleStrategy({
	clientID: '905997708468-grobrc8ocd5a9fd23c025da5kk3l1t95.apps.googleusercontent.com',
	clientSecret: '7zabuthLvTJ9Pmh4gEGLrt72',
	callbackURL: 'http://localhost:9001/auth/google/callback'
}, function(token, tokenSecret, profile, done){
	userCtrl.updateOrCreate(profile).then(function(results){
		done(null, profile);
	}, function(err){
		done(err, profile);
	})
}));



// Authentication ========================

App.get('/auth/google', Passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

App.get('/auth/google/callback', Passport.authenticate('google', {
	failureRedirect: '/auth/failure', successRedirect: '/'
}));

App.get('/auth/logout', function(req, res){
	req.logout();
	res.status(200).json(req.user);
})

App.get('/auth/me', function(req, res){
	return res.json(req.user);
});

// Endpoints ===============================


App.post('/api/products', productCtrl.post);
App.get('/api/products', productCtrl.getAll);
App.put('/api/users/:id', userCtrl.put);


// Connections ==============================

Mongoose.connect(mongoURI, function(){
	console.log('Connected to MongoDB at: ' + mongoURI);
})

App.listen(port, function(){
	console.log('Now listening on port: ' + port);
});