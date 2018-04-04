//Jake Bedard
//jadrn007
//Red ID 818121974


var order = [[],[]];
var msg = ['Please enter your first name',
		   'Please enter your last name',
		   'Please enter your address',
		   'Please enter your city',
		   'Please enter your state',
		   'Please enter your zip',
		   'Please enter your full phone number',
		   'Please enter your full phone number',
		   'Please enter your full phone number',
		   'Please enter your first name for shipping',
		   'Please enter your last name for shipping',
		   'Please enter your address for shipping',
		   'Please enter your city for shipping',
		   'Please enter your state for shipping',
		   'Please enter your zip for shipping',
		   'Please enter your full phone number for shipping',
		   'Please enter your full phone number for shipping',
		   'Please enter your full phone number for shipping',
		   'Please enter a 16 digit card number',
		   'Please enter the expiration date for your card',];

function isValidState(state) {                                
    var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
    "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
    "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
    "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
    "UT","VA","VT","WA","WI","WV","WY");
    for(var i=0; i < stateList.length; i++)
        if(stateList[i] == $.trim(state))
            return true;
    
    return false;
} 

function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
} 

$(document).ready(function(){

	var handle = new Array();
	handle[0] = $('input[name="fname"]');	   
	handle[1] = $('input[name="lname"]');
	handle[2] = $('input[name="address1"]');
	handle[3] = $('input[name="city"]');			   
	handle[4] = $('input[name="state"]');
	handle[5] = $('input[name="zip"]');
	handle[6] = $('input[name="phone1"]');
	handle[7] = $('input[name="phone2"]');
	handle[8] = $('input[name="phone3"]');
	handle[9] = $('input[name="xfname"]');	   
	handle[10] = $('input[name="xlname"]');
	handle[11] = $('input[name="xaddress1"]');
	handle[12] = $('input[name="xcity"]');			   
	handle[13] = $('input[name="xstate"]');
	handle[14] = $('input[name="xzip"]');
	handle[15] = $('input[name="xphone1"]');
	handle[16] = $('input[name="xphone2"]');
	handle[17] = $('input[name="xphone3"]');
	handle[18] = $('input[name="card"]');
	handle[19] = $('input[name="exp"]');


	//validate
	$(':submit').on('click', function(e){
		e.preventDefault();
		if(validate()){
			
			order = cart.getCartArray();
			for(var i=0; i<order.length; i++){
				var sku = order[i][0];
				var qty = order[i][1];			
				$.post('/perl/jadrn007/proj4/process_data.cgi', {sku,qty}, orderHandle);
				$('#signup-form').submit();
			}
			
			
		}
	});

	function orderHandle(response){
		var thanks = "thanks";
		$('body').html("JS Cart: " + order[0][0] + " CGI Response: " + response);
	}

	handle[4].on('keyup', function(){
		handle[4].val(handle[4].val().toUpperCase());
	});

	handle[13].on('keyup', function(){
		handle[13].val(handle[13].val().toUpperCase());
	});

	function validate(){

		//check all text categories
		for(var i=0; i<handle.length; i++) {
			if($.trim(handle[i].val()) == ""){
			    $('#error').text(msg[i]);
			    handle[i].focus();
			    return false;
			}
		}
		
		//check states
		if(isValidState(handle[4].val()) == "") { 
            $('#error').text("Please make sure you are using the correct 2 letter state abreviation");
            handle[4].focus();           
            return false;
        }

		//check states
		if(isValidState(handle[13].val()) == "") { 
            $('#error').text("Please make sure you are using the correct 2 letter shipping state abreviation");
            handle[13].focus();           
            return false;
        }

        //check numbers
        if(!$.isNumeric(handle[5].val()) || handle[5].val().length != 5){
        	$('#error').text("Zip code must be a 5 digit number");
        	handle[5].focus();
        	return false;
        }

        if(!$.isNumeric(handle[14].val()) || handle[14].val().length != 5){
        	$('#error').text("Shipping zip code must be a 5 digit number");
        	handle[14].focus();
        	return false;
        }
	//card number
        if(!$.isNumeric(handle[18].val()) || handle[18].val().length != 16){
        	$('#error').text("Please enter a valid card number");
        	handle[18].focus();
        	return false;
        }

        if(!$.isNumeric(handle[6].val())){
        	$('#error').text("Phone number must only use digits 0-9");
        	handle[8].focus();
        	return false;
        }

        if(!$.isNumeric(handle[7].val())){
        	$('#error').text("Phone number must only use digits 0-9");
        	handle[9].focus();
        	return false;
        }

        if(!$.isNumeric(handle[8].val())){
        	$('#error').text("Phone number must only use digits 0-9");
        	handle[10].focus();
        	return false;
        }
//shipping
        if(!$.isNumeric(handle[14].val()) || handle[14].val().length != 5){
        	$('#error').text("Shipping zip code must be a 5 digit number");
        	handle[5].focus();
        	return false;
        }

        if(!$.isNumeric(handle[15].val())){
        	$('#error').text("Shipping phone number must only use digits 0-9");
        	handle[15].focus();
        	return false;
        }

        if(!$.isNumeric(handle[16].val())){
        	$('#error').text("Shipping phone number must only use digits 0-9");
        	handle[16].focus();
        	return false;
        }

        if(!$.isNumeric(handle[17].val())){
        	$('#error').text("Shipping phone number must only use digits 0-9");
        	handle[17].focus();
        	return false;
        }
        //end check numbers numbers

        //check date
        var month = Number(handle[19].val().substring(0,2)) - 1;
        var year = Number(handle[19].val().substring(3));
	var now = Date.now();
        var userDob = new Date(year, month, 01);

        if(userDob.getFullYear() != year){
        	
        	$('#error').text("Please enter a valid expiration date.");
        	handle[19].focus();
        	return false;
        }

        else if(userDob.getMonth() != month){
        	
        	$('#error').text("Please enter a valid expiration date.");
        	handle[19].focus();
        	return false;
        }else if(userDob < now){
        	$('#error').text("You entered a date in the past. Please enter a valid expiration date.");
        	handle[19].focus();
        	return false;		
	}


        //end check date

        

		//check exp level
		var choiceExp = $('input[name="pmt-type"]');
		var selectedExp;
		$.each(choiceExp, function(k,v){
			if(this.checked)
				selectedExp = v.value;
		});
		if(!selectedExp){
			$('#error').text("Please check a box for your payment type");
			return false;
		}
		//end check exp level

		$('#error').text("");
		return true;
	}
	handle[0].focus();


	//on blur, remove error message if it pertains to a fixed thing
	//tried to make this into one clean function and I can't figure it out!!!
	handle[0].on('blur', function(){
		if($('#error').text() == msg[0] && handle[0].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[1].on('blur', function(){
		if($('#error').text() == msg[1] && handle[1].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[2].on('blur', function(){
		if($('#error').text() == msg[2] && handle[2].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[3].on('blur', function(){
		if($('#error').text() == msg[3] && handle[3].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[4].on('blur', function(){
		if($('#error').text() == msg[4] && handle[4].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[5].on('blur', function(){
		if($('#error').text() == msg[5] && handle[5].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[6].on('blur', function(){
		if($('#error').text() == msg[6] && handle[6].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[7].on('blur', function(){
		if($('#error').text() == msg[7] && handle[7].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[8].on('blur', function(){
		if($('#error').text() == msg[8] && handle[8].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[9].on('blur', function(){
		if($('#error').text() == msg[9] && handle[9].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[10].on('blur', function(){
		if($('#error').text() == msg[10] && handle[10].val() != "" ){
			$('#error').text('');
			$('#error').html('&nbsp;');

		}
	});

	handle[6].on('keyup', function() {
		if(handle[6].val().length == 3)
			handle[7].focus();
	});

	handle[7].on('keyup', function() {
		if(handle[7].val().length == 3)
			handle[8].focus();
	});

	handle[15].on('keyup', function() {
		if(handle[15].val().length == 3)
			handle[16].focus();
	});

	handle[16].on('keyup', function() {
		if(handle[16].val().length == 3)
			handle[17].focus();
	});

	handle[19].on('keyup', function(e){
		if(e.keyCode != 8){
			if(handle[19].val().length == 2){
				handle[19].val(handle[19].val() + "/");
			}
		}
		
	});



});

