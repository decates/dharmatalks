/// <reference path="../angular.min.js"/>
/// <reference path="services.js"/>

describe("dharmaTalksServices", function () {
    beforeEach(module('dharmaTalksServices'));

    describe("NowPlayingModel", function () {
        var model;

        beforeEach(inject(function(NowPlayingModel) {
            model = NowPlayingModel;
        }));
        
        it("should default to not playing",function () {
            var testModel;

            model.bindTo(function (updatedModel) { testModel = updatedModel; });

            expect(testModel).not.toBe(null);
            expect(testModel.url).toBe(null);
            expect(testModel.isPlaying).toBe(false);
        });
    });
});