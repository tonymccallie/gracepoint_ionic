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
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

myApp.run(function ($ionicPlatform) {
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

myApp.config(function ($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js


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
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			}
		}
	});
	
	$stateProvider.state('tab.article', {
		url: '/article/:articleId',
		views: {
			'tab-home': {
				templateUrl: 'templates/article.html',
				controller: 'NewsCtrl'
			}
		}
	});

	$stateProvider.state('tab.series', {
		url: '/series',
		views: {
			'tab-series': {
				templateUrl: 'templates/series.html'
			}
		}
	});

	$stateProvider.state('tab.sermons', {
		url: '/sermons/:seriesId',
		views: {
			'tab-sermons': {
				templateUrl: 'templates/sermons.html'
			}
		}
	});

	$stateProvider.state('tab.sermon', {
		url: '/sermon/:sermonId',
		views: {
			'tab-series': {
				templateUrl: 'templates/sermon.html'
			}
		}
	});

	$stateProvider.state('tab.groups', {
		url: '/groups',
		views: {
			'tab-groups': {
				templateUrl: 'templates/groups.html'
			}
		}
	});

	$stateProvider.state('tab.events', {
		url: '/events',
		views: {
			'tab-events': {
				templateUrl: 'templates/events.html'
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