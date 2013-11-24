/// <reference path="controllers.js"/>
/// <reference path="services.js"/>
/// <reference path="../lib/sinon-1.7.3.js"/>
/// <reference path="../lib/jasmine.js"/>
/// <reference path="../lib/angular-mocks.js"/>

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
            var testModel = { isPlaying: true };
            var model = { bindTo: sinon.spy() };
            var ctrl = $controller('NowPlayingCtrl', { $scope: scope, NowPlayingModel: model });

            // Call the callback, passing in a model
            model.bindTo.firstCall.args[0](testModel);
            
            // Check that the scope has been updated
            expect(scope.isPlaying).toBe(testModel.isPlaying);
        }));
    });

    describe("RecentTalksCtrl", function () {
        it("should bind recent talks to the scope", inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();
            var recentTalks = { then: sinon.spy() };
            var someResults = {};
            var ctrl = $controller('RecentTalksCtrl', { $scope: scope, RecentTalks: recentTalks });

            // Call the 'then' method to simulate promise satisfied
            recentTalks.then.firstCall.args[0](someResults);

            // Check that the scope is bound to the results
            expect(scope.talks).toBe(someResults);
        }));
    });
    
    describe("TalkCtrl", function () {
        it("should fail", inject(function ($rootScope, $controller) {
            var scope = $rootScope.$new();
            expect(false).toBeTruthy();
        }));
    });
});