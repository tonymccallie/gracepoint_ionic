myApp.factory('News', function ($http, $location, $ionicSlideBoxDelegate) {
	var self = this;
	var articles = [];
	self.update = function() {
		$http.get(DOMAIN+'/ajax/plugin/news/news_articles/json/limit:4/category:2')
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					angular.forEach(response.data, function(item) {
						articles.push(item);
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
	}
	
	if(articles.length === 0) {
		self.update();
	}

	return {
		articles: articles,
		update: self.update,
		get: function(config, article) {
			if(articles.length === 0) {
				$location.path('/tab/home');
				$location.replace();
				return null;
			} else {
				return articles[config.articleId];
			}
		}
	};
});

myApp.factory('Community', function ($http, $location) {
	var self = this;
	var posts = [];
	self.update = function() {
		$http.get(DOMAIN+'/ajax/plugin/community/community_posts/json')
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					angular.forEach(response.data, function(item) {
						posts.push(item);
					});
				} else {
					alert('there was a server error for COMMUNITY');
					console.log(response);
				}
			})
			.error(function(response, status, headers, config) {
				console.log(['error',data, status, headers, config]);
			});
	}
	
	if(posts.length === 0) {
		self.update();
	}
	
	return {
		posts: posts,
		update: self.update,
		get: function(config, post) {
			if(posts.length === 0) {
				$location.path('/tab/home');
				$location.replace();
				return null;
			} else {
				return posts[config.postId];
			}
		}
	};
});

myApp.factory('Series', function($http, $location) {
	var self = this;
	var series = [];
	self.update = function() {
		$http.get(DOMAIN+'/ajax/plugin/message/message_series/json/category:1')
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					angular.forEach(response.data, function(item) {
						series.push(item);
					});
				} else {
					alert('there was a server error for SERIES');
					console.log(response);
				}
			})
			.error(function(response, status, headers, config) {
				console.log(['error',data, status, headers, config]);
			});
	}
	
	if(series.length === 0) {
		self.update();
	}
	
	return {
		series: series,
		update: self.update
	};
});

myApp.factory('Messages', function ($http, $location) {
	var self = this;
	
	return {
		latest: function() {
			return $http.get(DOMAIN+'/ajax/plugin/community/community_posts/json');
		}
	};
});