myApp.controller('NavCtrl', function ($scope, $ionicSideMenuDelegate, News, Community, AudioFactory) {
	$scope.DOMAIN = DOMAIN;
	$scope.imageDir = DOMAIN+'/img/thumb/';
	$scope.articles = News.articles();
	$scope.posts = Community.posts();
	$scope.audio = {
		MessageMessage: {
			filename: null
		}
	};
	$scope.audioStats = {
		current: 0,
		duration: 0
	};
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
		AudioFactory.set(DOMAIN+'/play/mp3/'+audio.MediaAudio.id+'/play.mp3');
		AudioFactory.play();
		AudioFactory.timer(function(duration,current) {
			$scope.audioStats.duration = moment.unix(duration).format('mm:ss');
			$scope.audioStats.current = moment.unix(current).format('mm:ss');
			$scope.$apply();
		});
//		setTimeout(function(){
//			$scope.audioPlayer = document.getElementById('message_audio_player');
//			$scope.audioPlayer.src = DOMAIN+'/play/mp3/'+audio.MediaAudio.id+'/play.mp3';
//			$scope.play();
//		},0);
	}
	
	$scope.playAudio = function() {
		AudioFactory.play();
	}
	
	$scope.pauseAudio = function() {
		AudioFactory.play();
		AudioFactory.pause();
	}
	
	$scope.stopAudio = function() {
		AudioFactory.stop();
	}
	
	$scope.fwdAudio = function() {
		AudioFactory.fwd();
	}
	
	$scope.rwdAudio = function() {
		AudioFactory.rwd();
	}
	
	$scope.playVideo = function() {
		$scope.videoPlayer.play();
	};
	
});

myApp.controller('ArticleCtrl', function($scope, $stateParams, News) {
	$scope.article = News.get({articleId: $stateParams.articleId});
});

myApp.controller('PostCtrl', function($scope, $stateParams, $timeout, Community) {
	$scope.post = Community.get({postId: $stateParams.postId});
	
	$timeout(function() {
		if($scope.post.MediaVideo.filename) {
			$scope.videoPlayer = document.getElementById('post_video_player');
			$scope.playVideo = function() {
				$scope.videoPlayer.play();
			};
		}
	});
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
		$scope.videoPlayer = document.getElementById('sermon_video_player');
		$scope.playVideo = function() {
			$scope.videoPlayer.play();
		};
	}
});

myApp.controller('EventsController', function($scope, $stateParams, Events) {
	$scope.events = Events.events();
});