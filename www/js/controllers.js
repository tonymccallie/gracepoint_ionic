var myCtrl = angular.module('starter.controllers', ['starter.services'])

myCtrl.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate) {
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.showRightMenu = function () {
		$ionicSideMenuDelegate.toggleRight();
	};
});

myCtrl.controller('HomeCtrl', function($scope, $stateParams, $http, $ionicSlideBoxDelegate) {
	$scope.articles = [];
	$scope.imageDir = DOMAIN+'/img/thumb/';
	
	$http.get(DOMAIN+'/ajax/plugin/news/news_articles/json/limit:4/category:2')
	.success(function(response, status, headers, config) {
		if(response.status === 'SUCCESS') {
			angular.forEach(response.data, function(item) {
				$scope.articles.push(item);
			});
			$ionicSlideBoxDelegate.update();
		} else {
			alert('there was a server error for NEWS');
			console.log(response);
		}
	})
	.error(function(response, status, headers, config) {
		console.log(['error',data, status, headers, config]);
	});
	
	
	$scope.posts = [];
	$http.get(DOMAIN+'/ajax/plugin/community/community_posts/json')
	.success(function(response, status, headers, config) {
		if(response.status === 'SUCCESS') {
			angular.forEach(response.data, function(item) {
				$scope.posts.push(item);
			});
		} else {
			alert('there was a server error for COMMUNITY');
			console.log(response);
		}
	})
	.error(function(response, status, headers, config) {
		console.log(['error',data, status, headers, config]);
	});
});

myCtrl.controller('NewsCtrl', function($scope, $stateParams) {
	//$scope.article = News.get($stateParams.articleId);
});