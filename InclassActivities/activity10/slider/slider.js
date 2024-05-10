$(document).ready(function() {
	$("#slider").bxSlider({
		auto: true,
		pause: 3000,
		captions:true,
		minSlides: 1,
		maxSlides: 1,
		slideWidth: 250,
		slideMargin: 10,
		randomStart:true,
		pager: true,
		pagerType: 'short',
		pagerShortSeparator: '/'
	});
});