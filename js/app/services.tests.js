
/// <reference path="services.js"/>
/// <reference path="../lib/sinon-1.7.3.js"/>
/// <reference path="../lib/jasmine.js"/>
/// <reference path="../lib/angular-mocks.js"/>

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
            expect(testModel.item).toBe(null);
            expect(testModel.isPlaying).toBe(false);
            expect(model.player).toBe(null);
            expect(model.playerData).toBe(null);
        });

        describe("bindTo", function() {
            it("should call the given callback immediately with a non-playing model", function() {
                var callback = sinon.spy();
                model.bindTo(callback);
                expect(callback.calledOnce).toBeTruthy();
                expect(callback.firstCall.args[0].url).toBe(null);
                expect(callback.firstCall.args[0].item).toBe(null);
                expect(callback.firstCall.args[0].isPlaying).toBe(false);
            });
        });

        describe("play", function() {
            it("should call all bound callbacks with a playing model", function () {
                var callback1 = sinon.spy();
                var callback2 = sinon.spy();
                model.bindTo(callback1);
                model.bindTo(callback2);
                var myUrl = "SomeUrl";
                var myItem = { SomeItem: "something" };

                // Reset the spies (so they don't count calls made by 'bind')
                callback1.reset();
                callback2.reset();

                model.play(myUrl, myItem);
                
                expect(callback1.calledOnce).toBeTruthy();
                expect(callback1.calledOnce).toBeTruthy();
                expect(callback1.firstCall.args[0].url).toBe(myUrl);
                expect(callback1.firstCall.args[0].item).toBe(myItem);
                expect(callback1.firstCall.args[0].isPlaying).toBeTruthy();
            });
        });
        
        describe("stop", function () {
            it("should call all bound callbacks with a non-playing model", function () {
                var callback1 = sinon.spy();
                var callback2 = sinon.spy();
                model.bindTo(callback1);
                model.bindTo(callback2);

                model.play("someurl", { Some: "item"});

                // Reset the spies (so they don't count previous calls)
                callback1.reset();
                callback2.reset();

                model.stop();

                expect(callback1.calledOnce).toBeTruthy();
                expect(callback1.calledOnce).toBeTruthy();
                expect(callback1.firstCall.args[0].url).toBe(null);
                expect(callback1.firstCall.args[0].item).toBe(null);
                expect(callback1.firstCall.args[0].isPlaying).toBeFalsy();
            });
        });
    });
});