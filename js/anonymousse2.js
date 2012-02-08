(function($) {
	
	var resizeCenterImage = function(image, containerheight, containerwidth) {
		var theImage = new Image();
		theImage.src = image.attr("src");
		var imgwidth = theImage.width, imgheight = theImage.height;
		if (imgwidth > containerwidth) {
			var newwidth = containerwidth, ratio = imgwidth / containerwidth, newheight = imgheight / ratio;
			if (newheight > containerheight) {
				var newnewheight = containerheight, newratio = newheight / containerheight, newnewwidth = newwidth / newratio;
				theImage.width = newnewwidth;
				theImage.height = newnewheight;
			} else {
				theImage.width = newwidth;
				theImage.height = newheight;
			}
		} 
		if (imgheight > containerheight) {
			var newheight = containerheight, ratio = imgheight / containerheight, newwidth = imgwidth / ratio;
			if (newwidth > containerwidth) {
				var newnewwidth = containerwidth, newratio = newwidth / containerwidth, newnewheight = newheight / newratio;
				theImage.height = newnewheight;
				theImage.width = newnewwidth;
			} else {
				theImage.width = newwidth;
				theImage.height = newheight;
			}
		}
		image.css(
				{
					'width' : theImage.width,
					'height' : theImage.height,
					'margin-top' : -(theImage.height / 2) - 10 + 'px',
					'margin-left' : -(theImage.width / 2) - 10 + 'px'
				});
	};
	
	$.fn.mousse = function(options) {
		var items = options.items,
			items_count = items.length,
			stackContainer = this,
			previousPhoto = function(stackContainer) {
				if (stackContainer.controlTimer > 0) {return;}
				stackContainer.controlTimer = 1;
				var r = Math.floor(Math.random() * 41) - 20;
				var current = stackContainer.find('img:first'), currentPositions =
				{
					marginLeft : current.css('margin-left'),
					marginTop : current.css('margin-top')
				}, new_current = stackContainer.find('img:last');
				current.animate(
						{
							'marginLeft' : '250px',
							'marginTop' : '-385px'
						}, 300, function() {
							$(this).insertAfter(stackContainer.find('img:last')).css(
									{
										'-moz-transform' : 'rotate(0deg)',
										'-webkit-transform' : 'rotate(0deg)',
										'transform' : 'rotate(0deg)'
									}).animate(
											{
												'marginLeft' : currentPositions.marginLeft,
												'marginTop' : currentPositions.marginTop
											}, 250, function() {
												new_current.css(
														{
															'-moz-transform' : 'rotate(' + r + 'deg)',
															'-webkit-transform' : 'rotate(' + r + 'deg)',
															'transform' : 'rotate(' + r + 'deg)'
														});
												stackContainer.controlTimer = 0;
											});
						});
			},
			nextPhoto = function(stackContainer) {
				if (stackContainer.controlTimer > 0) {return;}
				stackContainer.controlTimer = 1;
				var r = Math.floor(Math.random() * 41) - 20;
				var current = stackContainer.find('img:last'), currentPositions =
				{
					marginLeft : current.css('margin-left'),
					marginTop : current.css('margin-top')
				}, new_current = current.prev();
				current.animate(
						{
							'marginLeft' : '250px',
							'marginTop' : '-385px'
						}, 300, function() {
							$(this).insertBefore(stackContainer.find('img:first')).css(
									{
										'-moz-transform' : 'rotate(' + r + 'deg)',
										'-webkit-transform' : 'rotate(' + r + 'deg)',
										'transform' : 'rotate(' + r + 'deg)'
									}).animate(
											{
												'marginLeft' : currentPositions.marginLeft,
												'marginTop' : currentPositions.marginTop
											}, 300, function() {
												new_current.css(
														{
															'-moz-transform' : 'rotate(0deg)',
															'-webkit-transform' : 'rotate(0deg)',
															'transform' : 'rotate(0deg)'
														});
												stackContainer.controlTimer = 0;
											});
						});
				
			}; // end of var declaration section
		
		options = $.extend({}, {
			ratioTaille: 0.6
		},options); // Merge given options with default options
		
		this.css(
				{
					'width':'480px',
					'height':'350px',
					'margin-top':'-175px',
					'margin-left':'-240px',
					'position':'absolute',
					'top':'50%',
					'left':'50%',
					'z-index':'100'
				});
		for ( var i = 0; i < items_count; ++i) {
			var item_source = items[i], cnt = 0;
			$('<img />').load(function() {
				var image = $(this),
					r = Math.floor(Math.random() * 41) - 20;
				++cnt;
				resizeCenterImage(image, screen.height * 0.8 * options.ratioTaille, screen.width * 0.8 * options.ratioTaille);
				stackContainer.append(image);
				if (cnt < items_count) {
					image.css(
							{
								'-moz-transform' : 'rotate(' + r + 'deg)',
								'-webkit-transform' : 'rotate(' + r + 'deg)',
								'transform' : 'rotate(' + r + 'deg)'
							});
				} else if (cnt == items_count) {
					stackContainer.show();
				}
			}).attr('src', item_source).css({
				'position':'absolute',
				'top':'50%',
				'left':'50%',
			});
		}
		$(document).bind('keydown', 'left', function(e) {
			e.preventDefault();
			previousPhoto(stackContainer);
		});
		
		$(document).bind('keydown', 'right', function(e) {
			e.preventDefault();
			nextPhoto(stackContainer);
		});
		
		$(document).bind('keydown', 'esc',function(e){
			e.preventDefault();
			stackContainer.hide();
		});
		if (options.mouseWheel) {
			stackContainer.bind('mousewheel',this,function(event, delta) {					 
					 if (delta < 0) {
						 previousPhoto(stackContainer);
					 } else {
						 nextPhoto(stackContainer);
					 }
					 return false;
				 });
		}
		return this;
	};
})(jQuery);