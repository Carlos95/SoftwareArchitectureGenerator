(function ($) {
    
    "use strict";

    /*==========  OWL ACTIVATOR SCRIPT  ==========*/
	$("#owl-demo").owlCarousel({
		      	itemsDesktop : 1,
		      	itemsDesktopSmall : 1,
		      	items : 1, //10 items above 1000px browser width
		      	itemsTablet : 1,
		        navigation : false,
				autoPlay : true,
				stopOnHover : true

		      });    
	/*You can modify it as you want .More - http://www.owlgraphic.com/owlcarousel/index.html#customizing */
 
	/*==========  WODRY TEXT SLIDING ACTIVATOR  ==========*/
	$('.wodry').wodry({

    //Set your settings
     animation:'rotateX'

	});
	/*You can modify effect and timing for text sliding.More - http://daynin.github.io/wodry/#settings*/


	/*==========  SMOOTH SCROLLING FOR INTERNAL PAGE  ==========*/
	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000); //Change the maximum value of animation with milisecond.
        return false;
      }
    }
  });



	/*==========  RESPONSIVE VIDEO ACTIVATOR  ==========*/
	$(".video-container").fitVids();


    /*==========  BOOTSTRAP FIXED FOR IE10 AND WINDOWS MOBILE  ==========*/
    

     if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
        document.createTextNode('@-ms-viewport{width:auto!important}'))
        document.querySelector('head').appendChild(msViewportStyle)
    }


 })(jQuery);   