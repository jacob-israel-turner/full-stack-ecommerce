var User = require('./../models/user');
var userService = require('./../services/user-service');
var Q = require('q');

module.exports = {
	updateOrCreate: function(user){
		var deferred = Q.defer();
		User.findOneAndUpdate(
			{ 
				googleId: user.id //Checking for this id
			}, 
			{
				googleId: user.id, //'update', or data to use to either update or create the user
				name: user.displayName,
				plusLink: user._json.link,
				picture: user._json.picture,
				gender: user._json.gender
			},
			{
				upsert: true //This means 'If the user doesn't exist'
			},
			function(err, results){
				if(err){
					return deferred.reject(err);
				} else {
					deferred.resolve(results);
				}
		})
		return deferred.promise;
	},
	getUser: function(id){
		var deferred = Q.defer();
		User.findOne({ googleId: id }, function(err, results){
			if(err){
				deferred.reject(err);
			} else {
				deferred.resolve(results);
			}
		})
		return deferred.promise;
	},
	put: function(req, res){
		delete req.body._id;
		console.log(req.body)
		User.update({ _id: req.params.id }, req.body, function(err, results){
			console.log(err, results);
			if(err){
				res.status(500).json(err);
			} else {
				res.status(200).json(results);
			}
		})
	},
	getOneAndRespond: function(req, res){
		userService.getOne(req.params.id)
			.then(function(response){
				res.status(200).json(response);
			}, function(err){
				res.status(500).json(err);
			})
	}
}