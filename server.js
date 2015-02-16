var Express = require('express');
var App = Express();
var Passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BodyParser = require('body-parser');
var Session  = require('express-session');

var port = 9001;

App.use(BodyParser.json());
App.use(Session({ secret: 'EcommerceSIKRIT' }));
App.use(Passport.initialize());
App.use(Passport.session());


Passport.use(new GoogleStrategy({
	clientID: '905997708468-grobrc8ocd5a9fd23c025da5kk3l1t95.apps.googleusercontent.com',
	clientSecret: '7zabuthLvTJ9Pmh4gEGLrt72',
	callbackURL: 'http://localhost:9001/auth/google/callback'
}, function(token, tokenSecret, profile, done){
	done(null, profile);
}));

App.get('/auth/google', Passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

App.get('/auth/google/callback', Passport.authenticate('google', {
	failureRedirect: '/auth/failure'
}), function(req, res){
	res.redirect('/api/me');
})


App.listen(port, function(){
	console.log('Now listening on port: ' + port);
})