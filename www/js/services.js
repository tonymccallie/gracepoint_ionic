var mySvcs = angular.module('starter.services', []);

mySvcs.factory('News', function ($scope, $http) {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var articles = [];
	
	$http.jsonp('http://office.threeleaf.net:8080/greyback_shiny/ajax/plugin/news/news_articles/json/limit:4/category:2').
	success(function(data, status, headers, config) {
		console.log([data, status, headers, config]);
	}).
	error(function(data, status, headers, config) {
		console.log([data, status, headers, config]);
	});

	return {
		all: function () {
			return articles;
		},
		get: function (articleId) {
			// Simple index lookup
			return articles[articleId];
		}
	}
});