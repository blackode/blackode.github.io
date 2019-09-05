$(document).ready(function() {
	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	// Waypoints
	$('.work').waypoint(function() {
		$('.work').addClass('animated fadeIn');
	}, {
		offset: '75%'
	});
	$('.download').waypoint(function() {
		$('.download .btn').addClass('animated tada');
	}, {
		offset: '75%'
	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
});

$('[data-fancybox^="quick-view"]').fancybox({
  animationEffect   : "fade",
  animationDuration : 300,
  margin : 0,
  gutter : 0,
  touch  : {
    vertical: false
  },
  baseTpl	:
  '<div class="fancybox-container" role="dialog" tabindex="-1">' +
  '<div class="fancybox-bg"></div>' +
  '<div class="fancybox-inner">' +
  '<div class="fancybox-stage"></div>' +
  '<div class="fancybox-form-wrap">' +
  '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
  '<svg viewBox="0 0 40 40">' +
  '<path d="M10,10 L30,30 M30,10 L10,30" />' +
  '</svg>' +
  '</button></div>' +
  '</div>' +
  '</div>',
  onInit: function(instance) {

    /*

        #1 Add product form
        ===================

    */

    // Find current form element ..
    var current = instance.group[instance.currIndex];
    instance.$refs.form = current.opts.$orig.parent().find('.product-form');

    // .. and move to the container
    instance.$refs.form.appendTo( instance.$refs.container.find('.fancybox-form-wrap') );

    /*

        #2 Create bullet navigation links
        =================================

    */
    var list = '',
        $bullets;

    for ( var i = 0; i < instance.group.length; i++ ) {
      list += '<li><a data-index="' + i + '" href="javascript:;"><span>' + ( i + 1 ) + '</span></a></li>';
    }

    $bullets = $( '<ul class="product-bullets">' + list + '</ul>' ).on('click touchstart', 'a', function() {
      var index = $(this).data('index');

      $.fancybox.getInstance(function() {
        this.jumpTo( index );
      });

    });

    instance.$refs.bullets = $bullets.appendTo( instance.$refs.stage );

  },
  beforeShow : function( instance ) {

    // Mark current bullet navigation link as active
    instance.$refs.stage.find('ul:first')
      .children()
      .removeClass('active')
      .eq( instance.currIndex )
      .addClass('active');

  },
  afterClose: function(instance, current) {

    // Move form back to the place
    instance.$refs.form.appendTo( current.opts.$orig.parent() );

  }
});
