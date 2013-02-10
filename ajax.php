<?php
function doIt($callback) { $callback(); }
	doIt(function() {
	     $stringData = $_POST['className']; 
	     $stringData = strtoupper($stringData);
	     echo $stringData;
	});
?>
