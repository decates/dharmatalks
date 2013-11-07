function NowPlayingCtrl($scope, NowPlayingModel) {
    NowPlayingModel.bindTo(function(model) {
        $scope.url = model.url;
        $scope.isPlaying = model.isPlaying;
    });
}

function TestOneCtrl($scope, NowPlayingModel) {
    $scope.play = function() {
        NowPlayingModel.play();
    };

    $scope.stop = function() {
        NowPlayingModel.stop();
    };
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

    //$scope.initializePlayer = function() {
    //    var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
    //        {
    //            mp3: $scope.talk.mediaUrl
    //        }, {
    //            cssSelectorAncestor: "#cp_container_1",
    //            swfPath: "jplayer/",
    //            supplied: "mp3"
    //        });
    //};
    
    $scope.player = new CirclePlayer("#jquery_jplayer_1",
            {
                mp3: $scope.talk.mediaUrl
            }, {
                cssSelectorAncestor: "#cp_container_1",
                swfPath: "jplayer/",
                supplied: "mp3"
            });
    //$scope.player.clearMedia();
    $scope.player.setMedia({
        mp3: $scope.talk.mediaUrl
    });
}