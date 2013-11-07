angular.module('dharmaTalksServices', [])
    .service('NowPlayingModel', function() {
        var self = this;
        self.callbacks = [];
        self.model = {
            url: null,
            isPlaying: false
        };

        self.fireCallbacks = function() {
            for (var i = 0; i < self.callbacks.length; i++) {
                self.callbacks[i](self.model);
            }
        };

        self.addCallback = function(callback) {
            self.callbacks.push(callback);
            callback(self.model);
        };

        return {
            play: function(url) {
                self.model.url = url;
                self.model.isPlaying = true;
                self.fireCallbacks();
            },
            stop: function(url) {
                self.model.url = null;
                self.model.isPlaying = false;
                self.fireCallbacks();
            },
            bindTo: function(callback) {
                self.addCallback(callback);
            }
        };
    })
    .service('XmlParser', function() {
        var parseXml;

        if (typeof window.DOMParser != "undefined") {
            parseXml = function (xmlStr) {
                return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
            };
        } else if (typeof window.ActiveXObject != "undefined" &&
               new window.ActiveXObject("Microsoft.XMLDOM")) {
            parseXml = function (xmlStr) {
                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(xmlStr);
                return xmlDoc;
            };
        } else {
            throw new Error("No XML parser found");
        }

        return parseXml;
    })
    .service('TalkService', function() {
        var talks = {};

        return {
            addTalks: function(newTalks) {
                for (var i = 0; i < newTalks.length; i++) {
                    talks[newTalks[i].id] = newTalks[i];
                }
            },

            // TODO: use real data
            getTalk: function(teacherId, talkId) {
                return talks[talkId];
            }
        };
    })
    .service('RecentTalks', function($http, TalkService, XmlParser) {
        var promise = $http.get('http://www.dharmaseed.org/feeds/recordings/?max-entries=30');
        promise = promise.then(function(result) {
            var xml = XmlParser.constructor()(result.data);
            var items = xml.documentElement.getElementsByTagName('item');

            var talks = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var title = item.getElementsByTagName('title')[0].textContent;
                var talk = {
                    id: item.getElementsByTagName('guid')[0].textContent,
                    teacherId: 1,
                    teacherName: item.getElementsByTagName('author')[0].textContent,
                    talkName: title.substr(title.indexOf(':') + 2),
                    talkDesc: item.getElementsByTagName('description')[0].textContent,
                    date: new Date(item.getElementsByTagName('pubDate')[0].textContent),
                    mediaUrl: item.getElementsByTagName('link')[0].textContent
                };

                talks.push(talk);
            }
            
            // Add the talks to the TalkService
            TalkService.addTalks(talks);
            
            return talks;
        });
        // TODO: Retrieve real talks via an Ajax call
        //var talks = [
        //    { id: 21051, teacherId: 55, teacherName: "Donald Rothberg", talkName: "The Anatomy of Ignorance - Transforming our Personal Ignorance", talkDesc: "After reviewing why and how we focus on transforming the different inter-related forms of ignorance - personal, social and spiritual - we focus on ten steps in transforming personal ignorance.", date: new Date(2013, 10, 23), mediaUrl: "http://www.dharmaseed.org/teacher/55/talk/17302/20120926-Donald_Rothberg-SR-a_new_beginning_guided_reflections.mp3" },
        //    { id: 2, teacherId: 55, teacherName: "Donald Rothberg", talkName: "Talk2", talkDesc: "Talk Number 2 Description...", date: new Date(2013, 3, 4) },
        //    { id: 3, teacherId: 191, teacherName: "Wes Nisker", talkName: "Talk3", talkDesc: "Talk Number 3 Description...", date: new Date(2012, 5, 6) },
        //    { id: 4, teacherId: 191, teacherName: "Wes Nisker", talkName: "Talk4", talkDesc: "Talk Number 4 Description...", date: new Date(2011, 7, 8) }
        //];


        return promise;
    });
