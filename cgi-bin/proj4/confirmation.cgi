#!/usr/bin/perl  

use CGI;
use CGI::Cookie;
use DBI;

$q = new CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "proj4";
my $username = "jadrn007";
my $password = "floor";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';


#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.

my $cookie = $q->cookie(-name=>'jadrn007',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);
print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Confirmation</title>
        	<meta http-equiv="content-type"
                		content="text/html;charset=utf-8" />
            	<meta http-equiv="Content-Style-Type" content="text/css" />
    <link rel="stylesheet" href="/~jadrn007/proj4/styles.css">
    <link rel="stylesheet" type="text/css" href="/~jadrn007/proj4/images/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/~jadrn007/proj4/conf-styles.css">
</head>

<body>
	<nav class="navbar navbar-dark">
		<a class="navbar-brand" href="/~jadrn007/proj4/index.html">Bertha's Deluxe Chocolates</a>

		<div id='cart-ui'>
			<h5 id="counter">
			</h5>
			<i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
			<a class="btn btn-secondary btn-sm" href="checkout.html">Check out</a>
		</div>	
	</nav> 
	
	<div class=container>
END_CONTENT

my $name = $q->param('fname');
my $address1 = $q->param('xaddress1');
my $address2 = $q->param('xaddress2');
my $city = $q->param('xcity');
my $state = $q->param('xstate');
my $zip = $q->param('xzip');
my $sth;
print "<table>\n";
my ($key, $value);

    
print "<div class='row'><h1>Thank you for your order!</h1></div>";
my $v = $q->cookie('jadrn007');
my $str = "";
print "<div class='row'><h3>Your Order:</h3></div><hr />";   
@rows = split('\|\|',$v);
foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
	$sth = $dbh->prepare("SELECT title FROM products WHERE sku='$sku'");
	$sth->execute();
	while(my @dbrow=$sth->fetchrow_array()) {
		foreach $item (@dbrow) { 
		    $str .= $item;
		    }          
    }
    print "<div class='row'>";
    print "<p>$str, Quantity: $qty</p>";
    print "</div><hr />";
    $str="";
} 

print "<div class='row'><h5>Is being shipped to $address1, $address2, $city $state, $zip</h5></div>";
my $total = $q->param('total');
my $ftotal = sprintf("%.2f", $total);
print "<div class='row no-height'><h3>Total is: \$$ftotal</h3></div><div class='row'><p>(Tax is 8%, Shipping & Handling is \$3.00)</p></div>";     

print "</div>\n";
print "</body>\n";
print "</html>\n";

