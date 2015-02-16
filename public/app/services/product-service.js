var app = angular.module('fsApp');

app.service('productService', function($http, authService){
	this.getAll = function(){
		return $http({
			method: 'GET',
			url: '/api/products'
		}).then(function(res){
			return res.data;
		})
	}
	this.addToCart = function(item){
		var user = authService.getUser();
		var cart = user.cart.slice(0);
		cart.push(item);
		return $http({
			method: 'PUT',
			url: '/api/users/' + user._id,
			data: { cart: cart }
		}).then(function(res){
			return authService.updateUser()
				.then(function(res){
					return 'Cart updated Successfully!';
				})
		})
	}
})