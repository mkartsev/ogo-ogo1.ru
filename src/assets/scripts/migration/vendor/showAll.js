// HIDE MAX LIST ITEMS JQUERY PLUGIN
// Version: 1.36
// Author: Josh Winn
// Website: www.joshuawinn.com
// Usage: Free and Open Source. WTFPL: http://sam.zoy.org/wtfpl/
(function($){
$.fn.extend({ 
showTotalListItems: function(options) {
	// OPTIONS
	var defaults = {
		max: 3,
		speed: 1000,
		moreText:'Показать все [TOTAL]',
		lessText:'показать меньше',
		moreHTML:'<p class="maxlist-total"><a href="#"></a></p>', // requires class and child <a>
	};
	var options =  $.extend(defaults, options);
	
	// FOR EACH MATCHED ELEMENT
	return this.each(function() {
		var $thisList = $(this);
		var op = options;
		var totalListItems = $thisList.children().length;
		var speedPerLI;
		
		// Get animation speed per LI; Divide the total speed by num of LIs. 
		// Avoid dividing by 0 and make it at least 1 for small numbers.
		if ( totalListItems > 0 && op.speed > 0  ){ 
			speedPerLI = Math.round( op.speed / totalListItems );
			if ( speedPerLI < 1 ) { speedPerLI = 1; }
		} else { 
			speedPerLI = 0; 
		}
		
		// If list has more than the "max" option
		if ( (totalListItems > 0) && (totalListItems > op.max) )
		{
			// Initial Page Load: Hide each LI element over the max
			$thisList.children().each(function(index){
				if ( (index+1) > op.max ) {
					$(this).hide(0);
				} else {
					$(this).show(0);
				}
			});
			
			// Replace [TOTAL] in "moreText" or "lessText" with number of items beyond max
			var howManyMore = totalListItems - op.max;
			var newMoreText = op.moreText;
			var newLessText = op.lessText;
			
			if ( howManyMore > 0 ){
				newMoreText = newMoreText.replace("[TOTAL]", totalListItems);
				newLessText = newLessText.replace("[TOTAL]", totalListItems);
			}
			
			// Add "Show all" button, or unhide it if it already exists
			if ( $thisList.next(".maxlist-total").length > 0 ){
				$thisList.next(".maxlist-total").show();
			} else {
				$thisList.after(op.moreHTML);
			}
			
			// SHOW ALL - add text within button, register click event that slides the items up and down
			$thisList.next(".maxlist-total")
				.children("a")
					.html(newMoreText)
					.off('click')
					.on("click", function(e){
						var $theLink = $(this);
						
						// Get array of children past the maximum option 
						var listElements = $theLink.parent().prev().children(); 
						listElements = listElements.slice(op.max);
						
						// Sequentially slideToggle the list items
						// For more info on this awesome function: http://goo.gl/dW0nM
						if ( $theLink.html() == newMoreText ){
							$(this).addClass('_is-active').html(newLessText);
							var i = 0; 
							(function() { $(listElements[i++] || []).slideToggle(speedPerLI,arguments.callee); })();
						} 
						else {			
							$theLink.removeClass('_is-active').html(newMoreText);
							var i = listElements.length - 1; 
							(function() { $(listElements[i--] || []).slideToggle(speedPerLI,arguments.callee); })();
						}
						
						// Prevent Default Click Behavior (Scrolling)
						e.preventDefault();
					});
		} 
		else {
			// LIST HAS LESS THAN THE MAX
			// Hide "Read More" button if it's there
			if ( $thisList.next(".maxlist-total").length > 0 ){
				$thisList.next(".maxlist-total").hide();
			}
			// Show all list items that may have been hidden
			$thisList.children().each(function(index){
				$(this).show(0);
			});
		}
	});
}
});
})(jQuery); // End jQuery Plugin