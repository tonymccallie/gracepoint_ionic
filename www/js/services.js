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
		var deferred = $http.get(DOMAIN+'/ajax/plugin/news/news_articles/json/limit:4/category:3')
			.success(function(response, status, headers, config) {
				if(response.status === 'SUCCESS') {
					angular.forEach(response.data, function(item) {
						item.NewsArticle.body = onclickFix(item.NewsArticle.body);
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
						item.CommunityPost.body = onclickFix(item.CommunityPost.body);
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

myApp.service('Groups', function($http, $location) {
	var self = this;
	var groups = [
		{
			name: 'Smith',
			day: 'Monday',
			time: '7:00pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Johnson',
			day: 'Monday',
			time: '8:00am',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Jones',
			day: 'Monday',
			time: '7:00pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Worhsip Team',
			day: 'Thursday',
			time: '6:30pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Mothers in Prayer',
			day: 'Tuesday',
			time: '10:00am',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Deacons',
			day: 'Sunday',
			time: '2:00pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Loaves and Fishes',
			day: 'Every 3rd Sunday',
			time: '4:00pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'McCready',
			day: 'Monday & Wednesday',
			time: '12:00pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		{
			name: 'Hospital Visitations',
			day: 'Wednesday',
			time: '3:00pm',
			descr: 'Wow while dipped dogged one far hey considering and after well darn out falteringly invoked more teasingly buoyantly that far jeez irrespective darn away after forcefully lighted close before built without jeepers that far.'
		},
		
	];
	
	self.groups = function() {
		return groups;
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
						item.displayDate = moment(item.OccurrenceStartTime).format("M/DD");
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
