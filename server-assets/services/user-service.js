var User = require('./../models/user');
var Q = require('q');


module.exports = {
	getOne: function(id){
		var deferred = Q.defer();
		User.findOne({ _id: id }, function(err, res){
			if(err) deferred.reject(err);
			else deferred.resolve(res);
		})
		return deferred.promise;
	}
}