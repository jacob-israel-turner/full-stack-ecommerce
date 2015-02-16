var Product = require('./../models/product');

module.exports = {
	post: function(req, res){
		Product.create(req.body, function(err, results){
			if(err) {
				console.log(err);
				res.status(500).json(err);
			} else {
				res.status(200).json(results);
			}
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

