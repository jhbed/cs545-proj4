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
my $database = "proj4";
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
my $cat = $cgi->param('category');
my $sth = $dbh->prepare("SELECT sku, category, title, short_description, long_description, cost, retail FROM products WHERE category='$cat'");
$sth->execute();
#end jake code


$str = "";
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str .= $item."|";
        }       
    $str .= ";";    
    }
 
print "Content-type:  text/html\n\n";
$sth->finish();
$dbh->disconnect();

   	
print $str;
