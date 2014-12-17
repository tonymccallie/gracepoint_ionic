myApp.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate, News, Community, Series) {
	$scope.imageDir = DOMAIN+'/img/thumb/';
	$scope.articles = News.articles;
	$scope.posts = Community.posts;
	
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.showRightMenu = function () {
		$ionicSideMenuDelegate.toggleRight();
	};
	$scope.doHomeRefresh = function() {
		Community.update();
		News.update().then(function(data) {
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
	$scope.doSeriesRefresh = function() {
		Series.update().then(function(data) {
			$scope.$broadcast('scroll.refreshComplete');
		});
	}
});

myApp.controller('ArticleCtrl', function($scope, $stateParams, News) {
	$scope.article = News.get({articleId: $stateParams.articleId});
});

myApp.controller('PostCtrl', function($scope, $stateParams, Community) {
	$scope.post = Community.get({postId: $stateParams.postId});
});

myApp.controller('SeriesCtrl', function($scope, $stateParams, $location, Series) {
	$scope.series = Series.series();
	$scope.latestMessage = Series.latestMessage();
	
	$scope.selectedSeries = null;
	$scope.sermons = [];
	if(typeof $stateParams.seriesId !== 'undefined') {
		$scope.selectedSeries = $scope.series[$stateParams.seriesId];
		$scope.sermons = Series.sermons($scope.selectedSeries.id);
	}
	
	$scope.selectedSermon = null;
	if(typeof $stateParams.sermonId !== 'undefined') {
		$scope.selectedSermon = Series.sermon($stateParams.sermonId);
	}
});