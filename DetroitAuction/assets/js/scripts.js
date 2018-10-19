
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {

    /*   Count up */
    //var el = document.getElementById("count");

    //var start = 00;
    //var end = @ViewBag.Count;

    //function update() {
    //    if (start == end) {
    //        clearInterval(interval);
    //    } else {
    //        el.innerText = start++
    //    }
    //}

    //var interval = setInterval(update, 10);

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});	
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/home.jpg");
    $('.how-it-works-container').backstretch("assets/img/backgrounds/1.jpg");
    $('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Countdown initializer
	*/
	//var now = new Date();
	//var countTo = 25 * 24 * 60 * 60 * 1000 + now.valueOf();    
	//$('.timer').countdown(countTo, function(event) {
	//	$(this).find('.days').text(event.offset.totalDays);
	//	$(this).find('.hours').text(event.offset.hours);
	//	$(this).find('.minutes').text(event.offset.minutes);
	//	$(this).find('.seconds').text(event.offset.seconds);
 //   });


    $("#countdown").countdown({
        date: "18 november 2018 12:00:00",
        format: "on"
    },
        

        function () {
            // callback function
        });

    
	/*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
	
	/*
	    Subscription form
	*/	
	//$('.subscribe form').submit(function(e) {
	//	e.preventDefault();
	//    var postdata = $('.subscribe form').serialize();
	//    $.ajax({
	//        type: 'POST',
	//        url: 'assets/subscribe.php',
	//        data: postdata,
	//        dataType: 'json',
	//        success: function(json) {
	//            if(json.valid == 0) {
	//                $('.success-message').hide();
	//                $('.error-message').hide();
	//                $('.error-message').html(json.message);
	//                $('.error-message').fadeIn('fast', function(){
	//                	$('.subscribe form').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	//            			$(this).removeClass('animated shake');
	//            		});
	//                });
	//            }
	//            else {
	//                $('.error-message').hide();
	//                $('.success-message').hide();
	//                $('.subscribe form').hide();
	//                $('.success-message').html(json.message);
	//                $('.success-message').fadeIn('fast', function(){
	//                	$('.top-content').backstretch("resize");
	//                });
	//            }
	//        }
	//    });
	//});

});


$(window).on('load', function () {
	
	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	
});

/*---------------------------
Countdown Timer Script
----------------------------*/
(function ($) {
    $.fn.countdown = function (options, callback) {

        //custom 'this' selector
        thisEl = $(this);

        //array of custom settings
        var settings = {
            'date': null,
            'format': null
        };

        //append the settings array to options
        if (options) {
            $.extend(settings, options);
        }

        //main countdown function
        function countdown_proc() {

            eventDate = Date.parse(settings['date']) / 1000;
            currentDate = Math.floor($.now() / 1000);

            if (eventDate <= currentDate) {
                callback.call(this);
                clearInterval(interval);
            }

            seconds = eventDate - currentDate;

            days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
            seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed

            hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed

            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60; //update the seconds variable with no. of minutes removed

            //conditional Ss
            if (days == 1) { thisEl.find(".timeRefDays").text("day"); } else { thisEl.find(".timeRefDays").text("days"); }
            if (hours == 1) { thisEl.find(".timeRefHours").text("hour"); } else { thisEl.find(".timeRefHours").text("hours"); }
            if (minutes == 1) { thisEl.find(".timeRefMinutes").text("minute"); } else { thisEl.find(".timeRefMinutes").text("minutes"); }
            if (seconds == 1) { thisEl.find(".timeRefSeconds").text("second"); } else { thisEl.find(".timeRefSeconds").text("seconds"); }

            //logic for the two_digits ON setting
            if (settings['format'] == "on") {
                days = (String(days).length >= 2) ? days : "0" + days;
                hours = (String(hours).length >= 2) ? hours : "0" + hours;
                minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
            }

            //update the countdown's html values.
            if (!isNaN(eventDate)) {
                thisEl.find(".days").text(days);
                thisEl.find(".hours").text(hours);
                thisEl.find(".minutes").text(minutes);
                thisEl.find(".seconds").text(seconds);
            } else {
                alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
                clearInterval(interval);
            }
        }

        //run the function
        countdown_proc();

        //loop the function
        interval = setInterval(countdown_proc, 1000);

    }
})(jQuery);

