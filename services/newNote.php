<?php

	include 'conn.php';

	include_once 'sessionCheck.php';

	$noteTitle =  addslashes($_POST['Title'] ?? '');
	$noteText =  addslashes($_POST['Note'] ?? '');
    $noteCategory =  addslashes($_POST['Category'] ?? '');
    $UserID = $User;

	$codificacion = mb_detect_encoding($noteTitle, "UTF-8,ISO-8859-1");

	if ($noteTitle == "") {

		echo json_encode("Empty title");

	}else if ($noteText == "") {

		echo json_encode("Empty note");

	}else if($noteCategory == ""){
		
		$noteCategory = "Uncategorised";

	    $addingQuery = $connection ->query("INSERT INTO `notes` (`NoteID`, `Title`, `Category`, `Note`, `CreateDate`, `OwnerID`)
        VALUES (NULL, '$noteTitle', '$noteCategory', '$noteText', current_timestamp(), '$UserID')");

		echo json_encode("Job done");

	}else{

	    $addingQuery = $connection ->query("INSERT INTO `notes` (`NoteID`, `Title`, `Category`, `Note`, `CreateDate`, `OwnerID`)
        VALUES (NULL, '$noteTitle', '$noteCategory', '$noteText', current_timestamp(), '$UserID')");

		echo json_encode($noteText . " - " . $codificacion);

	}

?>