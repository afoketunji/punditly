/**
 jQuery Sociacount 0.1
 http://zourbuth.com/plugins/sociacount
 Description: Display the media count for facebook, twitter, feedburner and much more.
 License: GPL
*/

(function ($) {
    $.fn.sociacount = function (options) {

        var defaults = {
            site: '',
            username: ''
        }, selector;

        options  = $.extend(defaults, options);
        selector  = this;

        return this.each(function () {

            if (options.site == "digg") {
                diggurl = "http://services.digg.com/2.0/user.getInfo?usernames="+options.username+"&type=javascript&callback=?";
                $.getJSON(diggurl, function (count) {				
                    $(selector).append('<a title="Digg" href="http://digg.com/'+options.username+'">Digg <span class="digg">'+count.users[options.username].followers+'</span></a>');
                });
            }			
			
			if (options.site == "facebook") {
                facebookurl = "https://graph.facebook.com/"+options.username;
                $.getJSON(facebookurl, function (count) {
                    $(selector).append('<a title="Facebook" href="http://www.facebook.com/'+options.username+'">Facebook <span class="facebook">'+count.likes+'</span></a>');
                });
            }

			if (options.site == "feedburner") {
				// http://feedburner.google.com/api/awareness/1.0/GetFeedData?uri=zourbuth
				feedburnerurl = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20xml%20WHERE%20url%3D'https%3A%2F%2Ffeedburner.google.com%2Fapi%2Fawareness%2F1.0%2FGetFeedData%3Furi%3D"+ options.username +"%26format%3Djson%26callback%3D'&format=json&callback=?";
				$.getJSON(feedburnerurl, function(count) {                        					
					$(selector).append('<a title="Feed" href="http://feedburner.google.com/fb/a/mailverify?uri='+options.username+'">Feed <span class="feed">'+count['query']['results']['rsp']['feed']['entry'].circulation+'</span></a>');
				});
            }
			
			if (options.site == "github") {
				githuburl = "https://api.github.com/users/"+options.username+"?type=javascript&callback=?";
				$.getJSON(githuburl, function(count) {
					$(selector).append('<a title="Github" href="http://github.com/'+options.username+'">Github <span class="github">'+count.data.followers+'</span></a>');					
				});
            }
			
			if (options.site == "youtube") {
				youtubeurl = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20xml%20WHERE%20url%3D'gdata.youtube.com%2Ffeeds%2Fapi%2Fusers%2F"+options.username+"'&format=json&callback=?";
				$.getJSON(youtubeurl, function(count) {
					//console.log(count['query']['results']['entry']['statictics']['subscriberCount']);
					$(selector).append('<a title="Youtube" href="http://www.youtube.com/user/'+options.username+'">Youtube <span class="youtube">'+count['query']['results']['entry']['statistics']['subscriberCount']+'</span></a>');					
				});
            }

            if (options.site == "twitter") {            
                twitterurl = "http://api.twitter.com/1/statuses/user_timeline/"+options.username+".json?callback=?";
                $.getJSON(twitterurl, function (count) {
                    $(selector).append('<a title="Twitter" href="http://twitter.com/'+options.username+'">Twitter <span class="twitter">'+count[0].user.followers_count+'</span></a>');
                });
            }
			
        });
    };
})(jQuery);