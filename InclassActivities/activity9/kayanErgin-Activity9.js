$(document).ready(function() {
	// preload images
	$("#image_list a").each(function() {
		var swappedImage = new Image();
		swappedImage.src = $(this).attr("href");
	});
	  
	$("#image_list a").click(function(evt) {
		var imageURL = $(this).attr("href");
		var caption = $(this).attr("title");
	
		// Fade out current image and caption
		$("#image").fadeOut(1000, function() {
			// after fade out completes, update the image source
			$(this).attr("src", imageURL).fadeIn(1000);
		});
		$("#caption").fadeOut(1000, function() {
			// after fade out completes, update the caption text
			$(this).text(caption).fadeIn(1000);
		});
	
		evt.preventDefault();
	});
	
	// move focus to first thumbnail
	$("li:first-child a").focus();
}); 