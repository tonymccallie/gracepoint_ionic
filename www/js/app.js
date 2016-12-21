var DOMAIN = 'http://www.gracepointcoppell.org'
//DEVELOPMENT
var devtest = /localhost/.test(window.location.hostname);
if(devtest) {
	DOMAIN = 'http://localhost/greyback_shiny';
	isMobile = false;
}
devtest = /threeleaf/.test(window.location.hostname);
if(devtest) {
	DOMAIN = 'http://office.threeleaf.net:8080/greyback_shiny';
	isMobile = false;
}

var USER = {};

var onclickFix = function(html) {
	html = html.replace(/href=\"\//ig,'href="http://www.gracepointcoppell.org/');
	html = html.replace(/src=\"\//ig,'src="http://www.gracepointcoppell.org/');
	return html.replace(/href=\"(.+?)\"/gi,'onclick="window.open(\'$1\',\'_system\',\'location=yes\');"');
}

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic','ionic.service.core','ionic.service.push'])

myApp.run(function ($ionicPlatform, Community) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
});

myApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

myApp.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
	});
});

myApp.factory('AudioFactory', function($document, $sce) {
	var audioElement = new Audio();
	
//	self.progbar.addEventListener('click', function(event) {
//		var percent = (event.pageX - self.progbar.offsetLeft - $('.uk-offcanvas-bar').get(0).offsetLeft) / $('#progress_bar').width();
//		self.audio.currentTime = self.audio.duration * percent;
//	});
	return {
		audioElement: audioElement,
		set: function(filename) {
			audioElement.src = $sce.trustAsResourceUrl(filename);
		},
		play: function(filename) {
			audioElement.play();     //  <-- Thats all you need
		},
		pause: function() {
			audioElement.pause();
		},
		stop: function() {
			audioElement.pause();
			audioElement.src = audioElement.currentSrc; /** http://stackoverflow.com/a/16978083/1015046 **/
		},
		fwd: function() {
			var current = audioElement.currentTime;
			var jump = current + 30;
			if(jump > audioElement.duration) {
				jump = audioElement.duration;
			}
			audioElement.currentTime = jump;
		},
		rwd: function() {
			var current = audioElement.currentTime;
			var jump = current - 30;
			if(jump <= 0) {
				jump = 0;
			}
			audioElement.currentTime = jump;
		},
		scrub: function(percent) {
			audioElement.currentTime = audioElement.duration * percent;
		},
		timer: function(callback) {
			audioElement.ontimeupdate = function() {
				callback(audioElement.duration, audioElement.currentTime)
			};
		}
	}
});

myApp.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,$ionicAppProvider) {
	$ionicAppProvider.identify({
		// The App ID (from apps.ionic.io) for the server
		app_id: '49c13670',
		// The public API key all services will use for this app
		api_key: '3ec5ce284444eb6c515bc5602c0f6a1a6fbb202c9d2ae535',
		dev_push: true
	});
	
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	
	$ionicConfigProvider.backButton.previousTitleText(false).text('<i class="threeleaf">5</i>').icon('');
	$ionicConfigProvider.tabs.position('bottom');

//	$stateProvider.state('app',{
//		url: '/app',
//		abstract: true,
//		templateUrl: "templates/sidemenu.html"
//	})
//	.state('app.tab',{
//		url: '/tab',
//		abstract: true,
//		templateUrl: "templates/tabs.html"
//	})
//	.state('app.tab.home',{
//		url: '/home',
//		views: {
//			'tab-home': {
//				templateUrl: 'templates/home.html'
//			}
//		}
//	});
	// setup an abstract state for the tabs directive
	$stateProvider.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: "templates/tabs.html"
	});

	// Each tab has its own nav history stack:

	$stateProvider.state('tab.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: 'templates/home.html'
			}
		}
	});
	
	$stateProvider.state('tab.article', {
		url: '/article/:articleId',
		views: {
			'tab-home': {
				templateUrl: 'templates/article.html'
			}
		}
	});
	
	$stateProvider.state('tab.post', {
		url: '/post/:postId',
		views: {
			'tab-home': {
				templateUrl: 'templates/post.html'
			}
		}
	});

	$stateProvider.state('tab.series', {
		url: '/series',
		views: {
			'tab-series': {
				templateUrl: 'templates/series.html',
				controller: 'SeriesCtrl'
			}
		}
	});

	$stateProvider.state('tab.sermons', {
		url: '/sermons/:seriesId',
		views: {
			'tab-series': {
				templateUrl: 'templates/sermons.html',
				controller: 'SeriesCtrl'
			}
		}
	});

	$stateProvider.state('tab.sermon', {
		url: '/sermon/:sermonId',
		views: {
			'tab-series': {
				templateUrl: 'templates/sermon.html',
				controller: 'SeriesCtrl'
			}
		}
	});

	$stateProvider.state('tab.groups', {
		url: '/groups',
		views: {
			'tab-groups': {
				templateUrl: 'templates/groups.html',
				controller: 'GroupsCtrl'
			}
		}
	});
	
	$stateProvider.state('tab.group', {
		url: '/group/:groupId',
		views: {
			'tab-groups': {
				templateUrl: 'templates/group.html',
				controller: 'GroupsCtrl'
			}
		}
	});

	$stateProvider.state('tab.events', {
		url: '/events',
		views: {
			'tab-events': {
				templateUrl: 'templates/events.html',
				controller: 'EventsController'
			}
		}
	});

	$stateProvider.state('tab.live', {
		url: '/live',
		views: {
			'tab-live': {
				templateUrl: 'templates/live.html'
			}
		}
	});

	$stateProvider.state('tab.about', {
		url: '/about',
		views: {
			'tab-static': {
				templateUrl: 'templates/about.html'
			}
		}
	});

	$stateProvider.state('tab.new', {
		url: '/new',
		views: {
			'tab-static': {
				templateUrl: 'templates/new.html'
			}
		}
	});

	$stateProvider.state('tab.giving', {
		url: '/giving',
		views: {
			'tab-static': {
				templateUrl: 'templates/giving.html'
			}
		}
	});

	$stateProvider.state('tab.contact', {
		url: '/contact',
		views: {
			'tab-static': {
				templateUrl: 'templates/contact.html'
			}
		}
	});

	$stateProvider.state('tab.developer', {
		url: '/developer',
		views: {
			'tab-static': {
				templateUrl: 'templates/developer.html'
			}
		}
	});

	$stateProvider.state('tab.jesus', {
		url: '/jesus',
		views: {
			'tab-static': {
				templateUrl: 'templates/jesus.html'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home');

});

myApp.directive('compile',['$compile',function($compile) {
	return function(scope, element, attrs) {
		scope.$watch(
		function(scope) {
			return scope.$eval(attrs.compile);
		},
		function(value) {
			element.html(value);
			$compile(element.contents())(scope);
		}
	)};
}]);