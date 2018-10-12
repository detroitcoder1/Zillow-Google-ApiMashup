
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
    $('.top-content').backstretch("assets/img/backgrounds/1.jpg");
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
	var now = new Date();
	var countTo = 25 * 24 * 60 * 60 * 1000 + now.valueOf();    
	$('.timer').countdown(countTo, function(event) {
		$(this).find('.days').text(event.offset.totalDays);
		$(this).find('.hours').text(event.offset.hours);
		$(this).find('.minutes').text(event.offset.minutes);
		$(this).find('.seconds').text(event.offset.seconds);
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

