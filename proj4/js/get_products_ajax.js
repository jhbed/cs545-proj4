/*
	Jake Bedard
	818121974
	CS545
*/
// [product][productInfo]
var proj4_data = [[],[]];
var prod_name = 2;

$(document).ready(function() {

	$('#about').on('click', function(){
		$('.jumbotron').hide();
		$('#srv-cont').html('<h1>It all started with a dream...</h1><p>Bertha grew up living in dirt and shambles. She always cheered up her friends by making them delicious chocololates. As her little town started to become industrialized, so did her chocolate business. Today Bertha sells ten million chocolates a day. Bertha loves to share her delicious chocolates with the world.</p>');
	});
	$('#contact').on('click', function(){
		$('.jumbotron').hide();
		$('#srv-cont').html('<h1>Contact Us:</h1><p>Phone: 555-833-2121</p><p>Email: support@berthaschocolates.com</p><p>Address: 123 Chocolate Street, San Diego, CA, 92109</p>');
		
	});


	$('.dark').on('click', function(){
		var data = "category=Dark chocolate";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});
	$('.milk').on('click', function(){
		var data = "category=Milk chocolate";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});
	$('#brittles').on('click', function(){
		var data = "category=Brittles and toffies";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});
	$('#truffles').on('click', function(){
		var data = "category=Truffles";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});
	$('#nuts').on('click', function(){
		var data = "category=Nuts and chews";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});
	$('.holiday').on('click', function(){
		var data = "category=Holiday assortments";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});
	$('.gifts').on('click', function(){
		var data = "category=Gifts";
		$.post('/perl/jadrn007/proj4/test.cgi', data, handleData);
	});

	//$.get('/perl/jadrn007/proj4/test.cgi', storeData);
	function handleData(response) {
		storeData(response);
        //$('#srv-cont').html(response);
	}
});



function storeData(response) {
    var tmpArray = response.split(';');
    for(var i=0; i < tmpArray.length; i++) {
        var innerArray = tmpArray[i].split('|');
        proj4_data[i] = innerArray;
    }
    prepareProds();
}


function prepareProds(){
	$('.jumbotron').hide();
	$('#srv-cont').html("");
	var startRow = '<div class="row aligned-row">';
	var endDiv = "</div>";
	var prodCount = 0.00;
	var st = "<h1>" + proj4_data[1][1] + "</h1>";
	var tmp = "";
	var img = "";
	var atc = "";
	var filler = '<div class="col"></div>'
	for(var i=0; i < proj4_data.length-1; i++){
		img = "<img class='prod-img feature' name='" + proj4_data[i][0] + "' src=\"/~jadrn000/PROJ4_IMAGES/" + proj4_data[i][0] + ".jpg\" alt=\"" + proj4_data[i][2]+"\"" + " width=\"80%\"  /><br />"
		atc = '<a name="' + proj4_data[i][0] + '"  class="atc btn btn-success btn-sm" href="#">Add to Cart</a>';
		if(prodCount/4 == 1){
			st += endDiv; 
		}
		if(prodCount == 0 || prodCount/4==1){
			st += startRow;
		}
		tmp = '<div class="prod col-lg-3 col-md-6 col-sm-12  align-self-end"><h5>' + img + proj4_data[i][prod_name] + '</h5><p>$' + proj4_data[i][6] + atc + '</p></div>';
		st += tmp;
		

		prodCount += 1.00;
	}
	for(var j=0; j < (8-prodCount); j++){
		st += filler;
	}
	st+="</div>";
	$('#srv-cont').html(st);
	proj4_data = [[],[]];
}	
