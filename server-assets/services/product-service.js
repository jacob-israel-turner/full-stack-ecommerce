var Product = require('./../models/product');
var Q = require('q');

module.exports = {
	post: function(obj){
		var deferred = Q.defer();
		Product.create(obj, function(err, res){
			if(err) deferred.reject(err);
			else deferred.resolve(res);
		});
		return deferred.promise;
	}
}