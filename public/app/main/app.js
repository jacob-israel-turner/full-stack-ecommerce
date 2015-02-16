var app = angular.module('fsApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/app/templates/home/home-view.html',
			controller: 'homeCtrl'
		})
		.when('/products', {
			templateUrl: '/app/templates/products/products-view.html',
			controller: 'productsCtrl',
			resolve: {
				products: function(productService){
					return productService.getAll();
				}
			}
		})
		// .when('/products/:id', {
		// 	templateUrl: '/app/templates/single-product/product-view.html',
		// 	controller: 'singlProdCtrl'
		// })
		.when('/dashboard', {
			templateUrl: '/app/templates/dashboard/dashboard-view.html',
			controller: 'dashboardCtrl',
			resolve: {
				user: function(authService){
					return authService.updateUser()
				}
			}
		})
		.otherwise('/');
})