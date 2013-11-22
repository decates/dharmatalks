function TestOneCtrl($scope) {
    $scope.play = function() {
        
    };

    $scope.stop = function() {

    };
}

function NowPlayingCtrl($scope, $location, NowPlayingModel) {
    NowPlayingModel.bindTo(function(model) {
        $scope.url = model.url;
        $scope.isPlaying = model.isPlaying;
    });

    $scope.goTo = function() {
        $location.url(NowPlayingModel.getModel().url);
    };
}

function HomeCtrl($scope) {
    
}

function RecentTalksCtrl($scope, RecentTalks) {
    RecentTalks.then(function(result) {
        $scope.talks = result;
    });
}

function TalkCtrl($scope, $routeParams, $location, TalkService, NowPlayingModel) {
    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn($scope);
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.player = NowPlayingModel.player;

    // Get the talk details
    var talk = TalkService.getTalk($routeParams.teacherId, $routeParams.talkId);
    $scope.talk = talk;
    $scope.isMediaLoaded = false;

    // Load and play the audio
    $scope.loadMedia = function(reset) {
        $scope.player.unbind(".TalkCtrl"); // Unbind any previous event listener
        $scope.player.bind($.jPlayer.event.timeupdate + ".TalkCtrl", function (event) {
            $scope.safeApply(function (scope) {
                scope.playerData = event.jPlayer;
                scope.currentTime = event.jPlayer.status.currentTime;
            });
        });

        if (reset) {
            $scope.player.jPlayer('setMedia', { mp3: $scope.talk.mediaUrl });
            $scope.player.jPlayer('play');

            // Record the fact that we're playing with the shared service
            NowPlayingModel.play($location.url());
        }
        
        $scope.isMediaLoaded = true;
        $scope.isPlaying = true;
    };

    $scope.playPause = function() {
        if ($scope.isPlaying) {
            $scope.player.jPlayer('pause');
        } else {
            $scope.player.jPlayer('play');
            NowPlayingModel.play($location.url());
        }

        $scope.isPlaying = !$scope.isPlaying;
    };
    

    // Check if this talk is already being played
    if (NowPlayingModel.getModel().url == $location.url()) {
        // Already playing this one...
        $scope.loadMedia(false);
    }
}