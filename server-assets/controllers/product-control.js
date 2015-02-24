var Product = require('./../models/product');
var productService = require('./../services/product-service');

module.exports = {
	post: function(req, res){
		productService.post(req.body)
			.then(function(results){
				res.status(200).json(results);
			}, function(err){
				res.status(500).json(err);
			})
	},
	getAll: function(req, res){
		Product.find(function(err, response){
			if(err){
				console.log(err);
				res.status(500).json(err);
			} else {
				res.status(200).json(response);
			}
		})
	}
}

