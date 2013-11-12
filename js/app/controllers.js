function TestOneCtrl($scope) {
    $scope.play = function() {
        
    };

    $scope.stop = function() {

    };
}

function NowPlayingCtrl($scope, NowPlayingModel) {
    NowPlayingModel.bindTo(function(model) {
        $scope.url = model.url;
        $scope.isPlaying = model.isPlaying;
    });
}

function HomeCtrl($scope) {
    
}

function RecentTalksCtrl($scope, RecentTalks) {
    RecentTalks.then(function(result) {
        $scope.talks = result;
    });
}

function TalkCtrl($scope, $routeParams, TalkService) {

    // Get the talk details
    var talk = TalkService.getTalk($routeParams.teacherId, $routeParams.talkId);
    $scope.talk = talk;
    $scope.isMediaLoaded = false;

    // Load the audio file into the player, ready to play
    $scope.loadMedia = function() {
        $scope.audioPlayer.load({ src: talk.mediaUrl, type: 'audio/mp3' }, true);
        $scope.isMediaLoaded = true;
        //$scope.audioPlayer.play();
    };
}