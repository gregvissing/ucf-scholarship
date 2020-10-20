// FIXED HEADER
ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  toggleClass: {className: 'reduced', targets: '.site-header'}
});

// ANIMATION

var pourcentage = 66;
var total = 158;

$(document).ready(function () {
	var result = (pourcentage * total) / 100;

	$(".pie").css("strokeDasharray", result);
});

var counter = { var: 0 };
var tal = document.getElementById("cx1");

TweenMax.to(counter, 3, {
	var: 500000,
	onUpdate: function () {
		tal.innerHTML = numberWithCommas(Math.ceil(counter.var));
	},
	ease: Circ.easeOut
});

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Close and Reset the Video Modal
function close_video_modal() {
	event.preventDefault();

	// re-hide the video modal
	$("body").removeClass("show-video-modal noscroll");

	// reset the source attribute for the iframe template, kills the video
	$("iframe").attr("src", "");
}

// if the 'close' button/element, or the overlay are clicked
$("body").on("click", ".close-video-modal, .video-modal .overlay", function (
	event
) {
	// call the close and reset function
	close_video_modal();
});

// if the ESC key is tapped
$("body").keyup(function (e) {
	// ESC key maps to keycode `27`
	if (e.keyCode == 27) {
		// call the close and reset function
		close_video_modal();
	}
});

function headerHeight(element) {
	var headerHeightValue = element.outerHeight();
	console.log("checked height");
	return headerHeightValue;
}

$("#content").css("margin-top", headerHeight($("header")) + "px");

if ($(document).scrollTop() > 300) {
	$("header").addClass("reduced");
	$(".scrollToTop").fadeIn();
}

$(document).on("scroll", function () {
	if ($(document).scrollTop() > 200) {
		$(".scrollToTop").fadeIn("slow");
		$("header").addClass("reduced");
		// $("button.hamburger").addClass("reduced");
		//$("#content").css("margin-top", headerHeight($("header")) + "px");
	} else {
		$(".scrollToTop").fadeOut("slow");
		$("header").removeClass("reduced");
		// $("button.hamburger").removeClass("reduced");
		//$("#content").css("margin-top", headerHeight($("header")) + "px");
	}
});

$(document).ready(function () {
	var trigger = $(".hamburger"),
		overlay = $(".overlay"),
		nav = $("ul.nav.menu-nav"),
		expandToggle = $("ul.nav > li > a > span"),
		isClosed = false;

	trigger.click(function () {
		hamburger_cross();
	});

	expandToggle.click(function (event) {
		event.preventDefault();
		$(this).find("i").toggleClass("rotate");
		$(this).parent().toggleClass("open");

		$(this).parent("a").next(".nccUlMenuSub1").slideToggle();
	});

	function hamburger_cross() {
		if (isClosed == true) {
			overlay.hide();
			trigger.removeClass("is-open");
			trigger.addClass("is-closed");
			isClosed = false;
			nav.removeClass("slideOut");
			$("body").toggleClass("no-scroll");
		} else {
			overlay.show();
			trigger.removeClass("is-closed");
			trigger.addClass("is-open");
			isClosed = true;
			nav.addClass("slideOut");
			$("body").toggleClass("no-scroll");
		}
	}

	$('[data-toggle="offcanvas"]').click(function () {
		$("#wrapper").toggleClass("toggled");
	});
});

$("input.SearchTextBox").attr("placeholder", "Search");

var $div1 = $("#search");
$(".search > a").on("click", function (e) {
	e.preventDefault();
	/*
			$(this).parent().addClass("open");
			console.log("search me");
			$("#wrapper #search").delay(100).animate({
				"margin-top": "0px"
			});
			$(".QuickSearchTextbox").focus(); */

	$div1.toggleClass("isOpen").slideToggle();
	var isOut = $div1.hasClass("isOpen");
	$div1.animate(
		{
			marginTop: isOut ? "" : "-55px"
		},
		300
	);
});

$(document).ready(function () {
	$("a[href^='#']").click(function (e) {
		e.preventDefault();
		var position = $($(this).attr("href")).offset().top;
		$("body, html").animate(
			{
				scrollTop: position - 60
			},
			700
		);
	});
});

function initRandomHero(data) {
	$("#hero .button-primary .skew-fix").text(data.settings.primaryCTAtext);
	$("#hero .button-primary").attr("href", data.settings.selectedPrimaryCtaUrl);
	$("#hero .button-secondary .skew-fix").text(data.settings.secondaryCTAtext);

	var youTubeId = data.settings.selectedSecondaryCtaUrl.split("/").pop();

	new Vue({
		el: "#hero",
		data: {
			showModal: false,
			modal_video: "https://www.youtube.com/embed/" + youTubeId
		}
	});

	//only do this if there are images
	if (data.settings.items.length) {
		// console.log(data.settings.items);
		//loop through images
		var quantityHeroImages = data.settings.items.length;
		var newIndex = myFunction(quantityHeroImages);

		function myFunction(value) {
			var heroIndex = Math.floor(Math.random() * value);
			var $item = $('<div class="item hero">');
			var $card = $(
				'<div class="card"><img class="hero-bg" loading="eager" src="' +
					data.settings.items[heroIndex].image +
					'" alt="' +
					data.settings.items[heroIndex].image +
					'" style="max-width: 100%; height: auto" /></div>'
			);
			var $image = $(
				'<img src="' +
					data.settings.items[heroIndex].image +
					'" alt="' +
					data.settings.items[heroIndex].image +
					'" style="max-width: 100%; height: auto" />'
			);
			// $('#hero').append($item.append($card));
			$("#hero").css(
				"background-image",
				"url(" + data.settings.items[heroIndex].image + ")"
			);

			setTimeout(function () {
				var sectionHeight = $(".item.hero img.hero-bg").height();
				//console.log(sectionHeight);
				$("#hero").height(sectionHeight + "px");
			}, 350);
		}
	} else {
		alert("Error: No images selected.");
	}
}
