myApp.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate, News, Community, Media) {
	$scope.DOMAIN = DOMAIN;
	$scope.imageDir = DOMAIN+'/img/thumb/';
	$scope.articles = News.articles();
	$scope.posts = Community.posts();
	$scope.audio = Media.audio();
	$scope.audioPlayer = null;
	$scope.videoPlayer = null;
	
	$scope.test = 'test';
	
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
	
	$scope.setAudio = function(audio) {
		$scope.audio = audio;
		$scope.showRightMenu();
		setTimeout(function(){
			$scope.audioPlayer = document.getElementById('message_audio_player');
			$scope.audioPlayer.src = DOMAIN+'/play/mp3/'+audio.MediaAudio.id+'/play.mp3';
			$scope.play();
		},0);
	}
	
	$scope.play = function() {
		$scope.audioPlayer.play();
	}
	
	$scope.pause = function() {
		$scope.audioPlayer.play();
		$scope.audioPlayer.pause();
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
	if($scope.selectedSermon !== null) {
		setTimeout(function(){
			$scope.videoPlayer = document.getElementById('sermon_video_player');
			$scope.videoPlayer.src = DOMAIN+'/play/vid/'+$scope.selectedSermon.MediaVideo.id+'/play.mp4';
		},0);
	}
});