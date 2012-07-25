/**
 * jquery.maximizeHeight.js
 * 
 * @author mpetitdant
 *
 * Dependencies :
 * 
 * jQuery
 * 
 * Jquery plugin thats forces the given element (and its parents) to take 
 * the remaining height of the given parent container.
 * 
 * parentContainer : the parent container jQuery element
 * elementToResize : the jQuery element to resize (its parents will also be resized)
 * 
 * Usage : $("elementToStretchSelector").maximizeHeightIn($("containerElement"));
 * 
 */

define(['jquery'], function ($) {
	
	(function($) {
	    $.fn.maximizeHeightIn = function($parentContainer) {
	    	var $elementToResize = this;
	    	//console.log("in maximizeHeightIn parent:"+$elementToResize.parent()[0]+" container:"+$parentContainer[0])
	    	
	    	if ( !$elementToResize.parent().is($parentContainer)) {
				//go reccursive !
	    		$elementToResize.parent().maximizeHeightIn($parentContainer);
			}
			var parentContainerHeight = $elementToResize.parent().height();
			var siblingsHeight = 0;
			
			$elementToResize.siblings(":visible").each(function() {
				//detects the footer to ignore it 
				if ($(this).offset().top < ( $elementToResize.parent().offset().top + $elementToResize.parent().outerHeight(true) ) ){
					//console.log("sibling "+$(this)[0]+" outerHeight = "+$(this).outerHeight(true));
					siblingsHeight += $(this).outerHeight(true);
				} else {
					console.log("ignoring footer");
				}
			});
			
			var elementMarginAndPadding = $elementToResize.outerHeight(true) - $elementToResize.height();
			var srtHeight = (parentContainerHeight - siblingsHeight - elementMarginAndPadding)+"px";
			//console.log("resizing "+$elementToResize[0]+" height = "+srtHeight+ "(parent:"+parentContainerHeight+") ");
			$elementToResize.height(srtHeight);
	    	
	    	
	    };
	})( jQuery );

});