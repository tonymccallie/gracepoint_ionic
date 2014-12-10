myApp.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate) {
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.showRightMenu = function () {
		$ionicSideMenuDelegate.toggleRight();
	};
});

myApp.controller('HomeCtrl', function($scope, $ionicSlideBoxDelegate, $location, News, Community) {
	$scope.imageDir = DOMAIN+'/img/thumb/';
	
	$scope.doRefresh = function() {
		Community.update();
		$scope.$broadcast('scroll.refreshComplete');
	}
});

myApp.controller('NewsCtrl', function($scope, $ionicSlideBoxDelegate, News) {
	$scope.articles = News.articles;
});

myApp.controller('ArticleCtrl', function($scope, $stateParams, News) {
	$scope.article = News.get({articleId: $stateParams.articleId});
});

myApp.controller('CommunityCtrl', function($scope, Community) {
	$scope.posts = Community.posts;
});

myApp.controller('PostCtrl', function($scope, $stateParams, Community) {
	$scope.post = Community.get({postId: $stateParams.postId});
});

myApp.controller('SeriesCtrl', function($scope, Series) {
	$scope.series = Series.series;
});