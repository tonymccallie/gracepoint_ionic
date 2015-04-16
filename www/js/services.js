myApp.service('Media', function() {
	var self = this;
	var audio = {
		MessageMessage: {
			filename: null
		}
	};
	
	self.audio = function() {
		return audio;
	}
});

myApp.service('News', function ($http, $location, $ionicSlideBoxDelegate) {
	var self = this;
	var articles = [];
	self.update = function() {
		var deferred = $http.get(DOMAIN+'/ajax/plugin/news/news_articles/json/limit:4/category:2')
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
		return deferred;
	}
	
	if(articles.length === 0) {
		self.update();
	}
	
	self.articles = function() {
		return articles;
	}
	
	self.get = function(config) {
		if(articles.length === 0) {
			$location.path('/tab/home');
			$location.replace();
			return null;
		} else {
			return articles[config.articleId];
		}
	}
});

myApp.service('Community', function ($http, $location) {
	var self = this;
	var posts = [];
	self.update = function() {
		var deferred = $http.get(DOMAIN+'/ajax/plugin/community/community_posts/json')
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
		return deferred;
	}
	
	if(posts.length === 0) {
		self.update();
	}
	
	self.posts = function() {
		return posts;
	}
	
	self.get = function(config) {
		if(posts.length === 0) {
			$location.path('/tab/home');
			$location.replace();
			return null;
		} else {
			return posts[config.postId];
		}
	}
});

myApp.service('Events', function($http, $location) {
	var self = this;
	var events = [];
	self.update = function() {
		var deferred = $http.get(DOMAIN + '/ajax/plugin/organization/organization_departments/json/bb4cad3b-01f6-4f56-a3f3-b2f425ba85fa')
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					angular.forEach(response.data, function(item) {
						events.push(item);
					});
				} else {
					alert('there was a server error for EVENTS');
					console.log(response);
				}
			})
			.error(function(response, status, headers, config) {
				console.log(['error',data, status, headers, config]);
			});
	}
	
	if(events.length === 0) {
		self.update();
	}
	
	self.events = function() {
		return events;
	}
	
	self.get = function(config) {
		if(events.length === 0) {
			$location.path('/tab/home');
			$location.replace();
			return null;
		} else {
			return events[config.eventId];
		}
	}
});

myApp.service('Series', function($http, $location) {
	var self = this;
	var series = [];
	var latestMessage = {
		message: null
	};
	var sermons = [];
	var sermon = {
		MessageMessage: {
			id: null
		}
	};
	
	self.update = function() {
		series = [];
		var deferred = $http.get(DOMAIN+'/ajax/plugin/message/message_series/json/category:1')
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
		return deferred;
	}
	
	self.series = function() {
		return series;
	}
	
	self.getSermons = function(seriesId) {
		sermons = [];
		var deferred = $http.get(DOMAIN+'/ajax/plugin/message/message_messages/json/series:'+seriesId)
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					angular.forEach(response.data, function(item) {
						sermons.push(item);
					});
				} else {
					alert('there was a server error for SERIES');
					console.log(response);
				}
			})
			.error(function(response, status, headers, config) {
				console.log(['error',data, status, headers, config]);
			});
		return deferred;
	}
	
	self.sermons = function(seriesId) {
		self.getSermons(seriesId);
		return sermons;
	}
	
	self.getSermon = function(sermonId) {
		angular.forEach(sermons, function(item) {
			if(item.MessageMessage.id == sermonId) {
				sermon = item;
			}
		});
		
		if(sermon.MessageMessage.id !== sermonId) {
			sermon = latestMessage.message;
		}
	}
	
	self.sermon = function(sermonId) {
		self.getSermon(sermonId);
		return sermon;
	}
	
	self.getLatest = function() {
		var deferred = $http.get(DOMAIN+'/ajax/plugin/message/message_messages/json/limit:1/category:1')
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					latestMessage.message = response.data[0];
				} else {
					alert('there was a server error for SERIES');
					console.log(response);
				}
			})
			.error(function(response, status, headers, config) {
				console.log(['error',data, status, headers, config]);
			});
		return deferred;
	}
	
	self.latestMessage = function() {
		return latestMessage;
	}
	
	if(series.length === 0) {
		$location.path('/tab/series');
		$location.replace();
		self.update();
	}
	
	if(latestMessage.message === null) {
		self.getLatest();
	}
});
