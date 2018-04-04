/*
Jake Bedard
818121974
cs545
*/
var all_data = [[],[]];
var customer_cart = cart.getCartArray();
var total=0;
$(document).ready(function() {

	$( "#order-form" ).on( "click", "#rmv", function(){
		cart.delete($(this).attr('name'));
		location.reload(true);
	});

	$( "#order-form" ).on( "change", "input", function(){
		if($(this).val()<0){
			$(this).val(0);
		}
		if($(this).val()==0){
			cart.delete($(this).attr('name'));
		}
		cart.setQuantity($(this).attr('name'), $(this).val());

		location.reload(true);
	});
	
	$.get('/perl/jadrn007/proj4/products.cgi', handler);
	


	//we need to parse the response in a formatted report
	function handler(response){	
		store(response);
	}

	//************MODAL SPECS & EVENT LISTENER
    $("#ui-dialog").dialog({
            height: 800,
            width: 900,
            modal: true,
            autoOpen: false,
            buttons: [{text: "Back to Order Form", click: function() 
               {$(this).dialog('close');}
            }]
    });
	$('#order-form').on('click','#btn-checkout', function(){
		//$('.ui-dialog-content').append($('#billing').html());

		$("#ui-dialog").dialog('open');
	});
	//**********END MODAL
});

function store(response) {
    var tmpArray = response.split(';');
    for(var i=0; i < tmpArray.length; i++) {
        var innerArray = tmpArray[i].split('|');
        proj4_data[i] = innerArray;
    }
	for(var i=0; i<customer_cart.length; i++){
		for(var j=0; j<proj4_data.length; j++){
			if(customer_cart[i][0] == proj4_data[j][0]){
				console.log("cart item: " + customer_cart[i][0] + " Quantity: " + customer_cart[i][1]);
				prepareItem(proj4_data[j][0], proj4_data[j][2], customer_cart[i][1], proj4_data[j][6]);
			}	
		}
	}
	var tax = total*0.08
	total=(total+tax) + 3;
	$('#form-tot').val(total);
	$('#order-form').append('<div class=row><div class=col></div><div class=col></div><div class=col><h2 name="total" class="inline left">Total: $'+total.toFixed(2)+'</h2><a id="btn-checkout" class="btn btn-success btn-lg right inline" href="#">Check Out</a><p class="left">(Tax: $' + tax.toFixed(2) + ', Shipping: $3.00)</p></div></div>');
}
function prepareItem(sku, name, quantity, price){
	
	var content = "";
	var title = '<h3 class="cart-item-name">' + name + '<br />$' + price + '</h3>';
	var image = "<img src=\"/~jadrn000/PROJ4_IMAGES/" + sku + ".jpg\" alt=\"" + name +"\"" + " width=\"250px\"  />";
	var stRow = '<div class="row border">';
	var stCol = '<div class="col">';
	var eDiv = '</div>';
	var subTotal = quantity*price;	
	var fsubTotal = (subTotal).toFixed(2);
	addTotal(subTotal);
	var qty = '<div class="form-group"><label for="qty">Quantity</label><input name="'+sku+'" type="number" class="form-control" id="qty" placeholder="' + 		quantity + '" value="' + quantity + '" min=0; step=1>';
	content = stRow + '<div class="col align-self-center">' + image + eDiv + stCol + title + eDiv + stCol+ qty +'<h2>$'+fsubTotal+'</h2>'+eDiv+ '<hr /><button name="' + sku + '" id="rmv" type="button" class="btn btn-danger">Remove from Cart</button>';
	$('#order-form').append(content);
		
}

function addTotal(subTotal){
	total+=subTotal;
}



