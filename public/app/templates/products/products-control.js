var app = angular.module('fsApp');

app.controller('productsCtrl', function($scope, products, productService){
	$scope.test = 'Testing Product CTRL';
	$scope.products = products;

	$scope.addToCart = function(item, quantity){
		var product = {
			product: item,
			quantity: quantity
		}
		productService.addToCart(product)
			.then(function(res){
				console.log(res);
			})
	}
})