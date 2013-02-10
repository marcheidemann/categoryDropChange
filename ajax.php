<?php
function doIt($callback) { $callback(); }
	doIt(function() {
	     $stringData = $_POST['className']; 
	     $stringData = strtoupper($stringData);
	     echo 'Hello from PHP Serverside: ';
	     echo ' Your Selected ChangeClass, Uppercased inside PHP  was: ';
	     echo $stringData;
	});
?>
