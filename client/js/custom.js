/*
 * Theme Name: Invention
 * Theme URI: http://www.jozoor.com
 * Description: Invention Theme for corporate and creative sites, responsive and clean layout, more than color skins
 * Author: Jozoor team
 * Author URI: http://www.jozoor.com
 * Version: 1.0
 */

/*
 = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 =     00   00 00 00   00 00 00   00 00 00   00 00 00   00 00    =
 =     00   00    00        00    00    00   00    00   00       =
 =     00   00    00      00      00    00   00    00   00       =
 =     00   00    00    00        00    00   00    00   00       =
 =  00 00   00 00 00   00 00 00   00 00 00   00 00 00   00       =
 = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 */

jQuery (document).ready (function ($) {

	// Navigational Menu ddsmoothmenu
	ddsmoothmenu.init ({
		mainmenuid: "menu", //menu DIV id
		orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
		classname: 'navigation', //class added to menu's outer DIV
		contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
	})

	// Carousel slider
	$ ('.slidewrap').carousel ({
		slider: '.slider',
		slide: '.slide',
		slideHed: '.slidehed',
		nextSlide: '.next-slide',
		prevSlide: '.prev-slide',
		addPagination: false,
		addNav: false,
		speed: 700 // ms.
	});

	$ ('.slidewrap1').carousel ({
		namespace: "carousel1", // Defaults to �carousel�.
		speed: 600 // ms.
	})

	$ ('.slidewrap2').carousel ({
		namespace: "carousel2", // Defaults to �carousel�.
		speed: 600 // ms.
	})

	$ ('.slidewrap3').carousel ({
		namespace: "carousel3", // Defaults to �carousel�.
		speed: 600 // ms.
	})

	$ ('.slidewrap4').carousel ({
		namespace: "carousel4", // Defaults to �carousel�.
		speed: 600 // ms.
	})

	// works hover effect
	$ ('.recent-work .item').hover (function () {
		$ (".img-caption", this).stop ().animate ({top: '0'}, {queue: false, duration: 400});
	}, function () {
		$ (".img-caption", this).stop ().animate ({top: '100%'}, {queue: false, duration: 400});
	});

	$ ('.portfolio .item').hover (function () {
		$ (".img-caption", this).stop ().animate ({top: '0'}, {queue: false, duration: 400});
	}, function () {
		$ (".img-caption", this).stop ().animate ({top: '100%'}, {queue: false, duration: 400});
	});

	$ ('.gallery .item').hover (function () {
		$ (".img-caption", this).stop ().animate ({top: '0'}, {queue: false, duration: 400});
	}, function () {
		$ (".img-caption", this).stop ().animate ({top: '100%'}, {queue: false, duration: 400});
	});

	// Tooltips
	/* Adding a colortip to any tag with a data attribute: */
	$ ('[data]').colorTip ({color: 'yellow'});

	// UItoTop plugin
	$ ().UItoTop ({ easingType: 'easeOutQuart' });

	// reponsive menu
	$ ("#menu > a").click (function () {
		$ ("#menu > ul").slideToggle ("fast");
	});

	(function ($) {
		$ ('#menu > a').bind ('click', function () {
			if ($ (this).hasClass ('current')) {
				$ (this).removeClass ('current');
				$ (this).parent ().parent ().find ('#menu > ul').slideUp ('fast');

				return false;
			} else {
				$ (this).addClass ('current');
				$ ('#menu').removeClass ('navigation');
				$ ('#menu').addClass ('responsive');
				$ (this).parent ().parent ().find ('#menu > ul').slideDown ('fast');

				return false;
			}
		});

		$ (window).bind ('resize', function () {
			if ($ (this).width () > 959) {
				$ ('#menu > a').removeClass ('current');
				$ ('#menu').removeClass ('responsive');
				$ ('#menu').addClass ('navigation');
				$ ('#menu > ul').removeAttr ('style');
			} else {
				$ ('#menu').removeClass ('navigation');
				$ ('#menu').addClass ('responsive');
			}
		});
	}) (jQuery);

	// Touch-friendly drop-down navigation
	$ ('#menu li:has(ul)').doubleTapToGo ();

	$ (function () {
		$ ('#menu a').each (function () {
			if ($ (this).parent ('li').children ('ul').size () > 0) {
				$ (this).append ('<i class="icon-angle-down responsive"></i>');
			}
		});
	});

	$ ("a.down-button").click (function () {
		$ (".slidedown").slideToggle ("slow");
	});

	// top bar show & hide
	(function ($) {
		$ ('a.down-button').bind ('click', function () {
			if ($ (this).hasClass ('current')) {
				$ (this).removeClass ('current');
				$ ('a.down-button > i').removeClass ('icon-angle-up');
				$ ('a.down-button > i').addClass ('icon-angle-down');
				$ (this).parent ().parent ().find ('.slidedown').slideUp ('slow');

				return false;
			} else {
				$ (this).addClass ('current');
				$ ('a.down-button > i').removeClass ('icon-angle-down');
				$ ('a.down-button > i').addClass ('icon-angle-up');
				$ (this).parent ().parent ().find ('.slidedown').slideDown ('slow');

				return false;
			}
		});

		$ (window).bind ('resize', function () {
			if ($ (this).width () > 768) {
				$ ('a.down-button').removeClass ('current');
				$ ('a.down-button > i').removeClass ('icon-angle-up');
				$ ('a.down-button > i').addClass ('icon-angle-down');
				$ ('.slidedown').removeAttr ('style');
			}
		});
	}) (jQuery);

	// Tabs
	$ ("#horizontal-tabs").tytabs ({
		tabinit: "1",
		fadespeed: "fast"
		//catchget:"tab2"
	});
	$ ("#horizontal-tabs.two").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_two",
		prefixcontent: "content_two",
		fadespeed: "fast"
	});
	$ ("#horizontal-tabs.three").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_three",
		prefixcontent: "content_three",
		fadespeed: "fast"
	});
	$ ("#horizontal-tabs.four").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_four",
		prefixcontent: "content_four",
		fadespeed: "fast"
	});
	$ ("#horizontal-tabs.five").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_five",
		prefixcontent: "content_five",
		fadespeed: "fast"
	});

	$ ("#vertical-tabs").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_v",
		prefixcontent: "content_v",
		fadespeed: "fast"
	});
	$ ("#vertical-tabs.two").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_v_two",
		prefixcontent: "content_v_two",
		fadespeed: "fast"
	});
	$ ("#vertical-tabs.three").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_v_three",
		prefixcontent: "content_v_three",
		fadespeed: "fast"
	});
	$ ("#vertical-tabs.four").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_v_four",
		prefixcontent: "content_v_four",
		fadespeed: "fast"
	});
	$ ("#vertical-tabs.five").tytabs ({
		tabinit: "1",
		prefixtabs: "tab_v_five",
		prefixcontent: "content_v_five",
		fadespeed: "fast"
	});

	// Alert Boxes
	$ (".hideit").click (function () {
		$ (this).fadeOut (600);
	});

	// Toggle
	$ ('#toggle-view li h4').click (function () {

		var text = $ (this).siblings ('div.panel');

		if (text.is (':hidden')) {
			text.slideDown ('200');
			$ (this).siblings ('span').html ('-');
		} else {
			text.slideUp ('200');
			$ (this).siblings ('span').html ('+');
		}
	});

	/* header fixed with sticky plugin */
	$ ("header.fixed .main-header").sticky ({ topSpacing: 0 });
	/* this for header 3 and 5
	 $("header.fixed .down-header").sticky({ topSpacing: 0 });
	 */
	$ ('.sticky-wrapper').removeAttr ('style');

});