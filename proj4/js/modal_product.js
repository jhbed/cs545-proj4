var product_sku;
$(document).ready(function() {
	
    $("#ui-dialog").dialog({
            height: 'auto',
            width: 900,
            modal: true,
            autoOpen: false,
            buttons: [{text: "Close Product", click: function() 
               {$(this).dialog('close');}
                      }]
                    });
    $('#srv-cont').on('click', '.prod-img', function() {	
    	product_sku=$(this).attr('name');
		$.get('/perl/jadrn007/proj4/products.cgi', handler);
		


		//we need to parse the response in a formatted report
		function handler(response){	
			store(response);
		}
       
    });
    
    $('.ui-dialog-content').on( "click", "a", function( event ) {
		var el = $(this);
		cart.add(el.attr('name'), 1);
		el.html('Added!');
		$('#counter').text(cart.size());
		setTimeout(function(){replaceText(el)}, 1000);
	});
            
    
});  

function store(response) {
    var tmpArray = response.split(';');
    for(var i=0; i < tmpArray.length; i++) {
        var innerArray = tmpArray[i].split('|');
        proj4_data[i] = innerArray;
    }
	for(var j=0; j<proj4_data.length; j++){
		if(product_sku == proj4_data[j][0]){
			var img = '<div class="col-4"><img src="/~jadrn000/PROJ4_IMAGES/' + product_sku + '" /></div>';
			var title = '<div class="col-8 center"><h2 class="cart-item-name">'+proj4_data[j][2] + '</h2>';
			var desc = '<p class="">' + proj4_data[j][4] + '</p>';
			var price = '<h1>$' + proj4_data[j][6] + '</h1>';
			var atc = '<a name="' + proj4_data[j][0] + '"  class="atc btn btn-success btn-sm" href="#">Add to Cart</a></div>'; 
			$('.ui-dialog-content').html('<div class="row">' + img+title + desc + price + atc+'</div>');
			$('#ui-dialog a').css('color', 'white');
			$("#ui-dialog").dialog('open');
			$('#ui-dialog a').blur();
			
		}	
	}
	proj4_data = [[],[]];
} 

function replaceText(obj){
	console.log('in');
	obj.html('Add to Cart');
}
