/// <reference path="controllers.js"/>
/// <reference path="services.js"/>
/// <reference path="../sinon-1.7.3.js"/>
/// <reference path="../jasmine.js"/>

describe("Controllers", function () {
    describe("NowPlayingCtrl", function () {
        beforeEach(module('dharmaTalksServices'));

        it("should bind to the given model", inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var model = { bindTo: sinon.spy() };
            var ctrl = $controller('NowPlayingCtrl', { $scope: scope, NowPlayingModel: model });
            expect(model.bindTo.calledOnce).toBeTruthy();
        }));

        it("should set up the scope from the model", inject(function ($rootScope, $controller) {
            var scope = $rootScope.$new();
            var testModel = { isPlaying: true, url: "someUrl" };
            var model = { bindTo: sinon.spy() };
            var ctrl = $controller('NowPlayingCtrl', { $scope: scope, NowPlayingModel: model });

            // Call the callback, passing in a model
            model.bindTo.firstCall.args[0](testModel);
            
            // Check that the scope has been updated
            expect(scope.isPlaying).toBe(testModel.isPlaying);
            expect(scope.url).toBe(testModel.url);
        }));
    });

    describe("RecentTalksCtrl", function () {
        it("should bind recent talks to the scope", inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var recentTalks = {};
            var ctrl = $controller('RecentTalksCtrl', { $scope: scope, RecentTalks: recentTalks });

            expect(scope.talks).toBe(recentTalks);
        }));
    });
});