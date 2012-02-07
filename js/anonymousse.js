function resizeCenterImage($image) {
	var theImage = new Image();
	theImage.src = $image.attr("src");
	var imgwidth = theImage.width;
	var imgheight = theImage.height;

	var containerwidth = 460;
	var containerheight = 330;

	if (imgwidth > containerwidth) {
		var newwidth = containerwidth;
		var ratio = imgwidth / containerwidth;
		var newheight = imgheight / ratio;
		if (newheight > containerheight) {
			var newnewheight = containerheight;
			var newratio = newheight / containerheight;
			var newnewwidth = newwidth / newratio;
			theImage.width = newnewwidth;
			theImage.height = newnewheight;
		} else {
			theImage.width = newwidth;
			theImage.height = newheight;
		}
	} else if (imgheight > containerheight) {
		var newheight = containerheight;
		var ratio = imgheight / containerheight;
		var newwidth = imgwidth / ratio;
		if (newwidth > containerwidth) {
			var newnewwidth = containerwidth;
			var newratio = newwidth / containerwidth;
			var newnewheight = newheight / newratio;
			theImage.height = newnewheight;
			theImage.width = newnewwidth;
		} else {
			theImage.width = newwidth;
			theImage.height = newheight;
		}
	}
	$image.css(
	{
		'width' : theImage.width,
		'height' : theImage.height,
		'margin-top' : -(theImage.height / 2) - 10 + 'px',
		'margin-left' : -(theImage.width / 2) - 10 + 'px'
	});
}