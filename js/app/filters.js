angular.module('dharmaTalksFilters', [])
    .filter('secondsToSpan', function() {
        return function(inputSeconds) {
            if (typeof inputSeconds !== "number") {
                return "";
            }

            var date = new Date(inputSeconds * 1000);
            var hh = date.getUTCHours();
            var mm = date.getUTCMinutes();
            var ss = date.getSeconds();
            // This line gives you 12-hour (not 24) time
            if (hh > 12) { hh = hh - 12; }
            // These lines ensure you have two-digits
            if (hh < 10) { hh = "0" + hh; }
            if (mm < 10) { mm = "0" + mm; }
            if (ss < 10) { ss = "0" + ss; }
            // This formats your string to HH:MM:SS
            var t = hh + ":" + mm + ":" + ss;
            return t;
        };
    });