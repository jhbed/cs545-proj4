/*
Jake Bedard
818121974
cs545
*/
var cart = new shopping_cart("jadrn007");
$(document).ready(function() {
	
	
	updateQty();

    /*
	Add to cart button clicked!
	
	*/	
	$( "#srv-cont").on( "click", "a", function( event ) {
		var el = $(this);
		cart.add(el.attr('name'), 1);
		el.html('Added!');
		updateQty();
		setTimeout(function(){replaceText(el)}, 1000);
	});

	function updateQty(){
		$('#counter').text(cart.size());
	}
});

function replaceText(obj){
	console.log('in');
	obj.html('Add to Cart');
}


