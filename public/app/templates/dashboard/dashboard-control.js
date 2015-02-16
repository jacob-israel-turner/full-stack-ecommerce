var app = angular.module('fsApp');

app.controller('dashboardCtrl', function($scope, user){
	$scope.test = 'Testing Dashboard CTRL';

	$scope.user = user;
})