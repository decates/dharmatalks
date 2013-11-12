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
            stop: function() {
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
    .service('RecentTalks', function ($http, TalkService, XmlParser) {
        var decodeFromXml = function(text) {
            return text.replace(/&amp;/g, '&')
                           .replace(/&lt;/g, '<')
                           .replace(/&gt;/g, '>')
                           .replace(/&quot;/g, '"');
            };

        var promise = $http.get('http://www.dharmaseed.org/feeds/recordings/?max-entries=30');
        promise = promise.then(function(result) {
            var xml = XmlParser.constructor()(result.data);
            var items = xml.documentElement.getElementsByTagName('item');

            var talks = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var title = decodeFromXml(item.getElementsByTagName('title')[0].textContent);
                var talk = {
                    id: decodeFromXml(item.getElementsByTagName('guid')[0].textContent),
                    teacherId: 1,
                    teacherName: decodeFromXml(item.getElementsByTagName('author')[0].textContent),
                    talkName: title.substr(title.indexOf(':') + 2),
                    talkDesc: decodeFromXml(item.getElementsByTagName('description')[0].textContent),
                    date: new Date(decodeFromXml(item.getElementsByTagName('pubDate')[0].textContent)),
                    mediaUrl: decodeFromXml(item.getElementsByTagName('link')[0].textContent),
                    duration: item.getElementsByTagName('duration')[0].textContent
                };

                talks.push(talk);
            }
            
            // Add the talks to the TalkService
            TalkService.addTalks(talks);
            
            return talks;
        });

        return promise;
    });
