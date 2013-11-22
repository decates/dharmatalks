angular.module('dharmaTalksApp', ['dharmaTalksServices', 'dharmaTalksDirectives', 'dharmaTalksFilters'])
    .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            }).
            when('/recent', {
                templateUrl: 'views/recent-talks.html',
                controller: 'RecentTalksCtrl'
            }).
            when('/teachers/:teacherId', {
                templateUrl: 'views/teacher-talks.html',
                controller: 'TeacherCtrl'
            }).
            when('/teachers/:teacherId/talks', {
                templateUrl: 'views/teacher-talks.html',
                controller: 'TeacherCtrl'
            }).
            when('/teachers/:teacherId/talk/:talkId', {
                templateUrl: 'views/talk.html',
                controller: 'TalkCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
      }]);