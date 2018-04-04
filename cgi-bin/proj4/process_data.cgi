#!/usr/bin/perl 
#	Sample perl cgi script.  This script prints a list of the 
#	products in the opatija proj4.products table.
#       For use with AJAX
#	Code by Alan Riggins, Fall 2017
#
#	For use with ajax only
#
   
use DBI;
use CGI::Carp; # send errors to the browser, not to the logfile
use CGI;
my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn007";
my $username = "jadrn007";
my $password = "floor";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

#RIGGINS QUERY COMMENTED OUT
#my $sth = $dbh->prepare("SELECT sku, category, title, short_description, long_description, cost, retail FROM products order by category");
#$sth->execute();
#################

#start jake code
my $cgi = CGI->new();
my $sku = $cgi->param('sku');
my $qty = $cgi->param('qty');
# taken from proj3
#    "VALUES(0,'$params[0]','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]','$params[6]','$params[7]','$phoneNum','$age', '$params[11]', 
#'$params[13]', '$params[14]', '$params[15]', '$params[17]', '$params[16]');";
#end taken from proj3
#my $sth = $dbh->prepare("SELECT sku, category, title, short_description, long_description, cost, retail FROM products WHERE category='$cat'");
my $sth = $dbh->prepare("INSERT INTO orders VALUES(NOW(), '$sku', '$qty')");
$sth->execute();
#end jake code
print "Content-type:  text/html\n\n";
$sth->finish();
$dbh->disconnect();

   	
#print $str;
print $sku;
