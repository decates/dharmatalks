angular.module('dharmaTalksDirectives', ['dharmaTalksServices'])
    .directive('dharmaJplayer', function (NowPlayingModel) {

        function link(scope, element, attrs) {
            // TODO: Ensure we're only added to a div

            // Get the ID for jPlayer
            var el = $("#" + attrs.id);

            // Initialize jPlayer on the scope
            el.jPlayer({
                ready: function () {
                    //$(this).jPlayer("setMedia", {
                    //    m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                    //    oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                    //});
                },
                swfPath: "../jplayer"
            });

            // Clean up after ourselves
            //element.on('$destroy', function () {
            //    el.jPlayer("destroy");
            //});

            // Put the jPlayer function on the shared service model
            NowPlayingModel.player = el;
        }

        return {
            link: link
        };
    });