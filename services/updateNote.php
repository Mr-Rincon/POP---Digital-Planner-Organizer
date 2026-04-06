<?php

    include 'conn.php';

    include_once 'sessionCheck.php';

    $noteID = $_POST['noteID'] ?? '';
	$noteTitle =  addslashes($_POST['Title'] ?? '');
	$noteText =  addslashes($_POST['Note'] ?? '');
    $noteCategory =  addslashes($_POST['Category'] ?? '');

    if ($noteTitle == "") {

        echo json_encode("Empty title");

    }else if ($noteText == "") {

        echo json_encode("Empty note");

    }else if($noteCategory == ""){
        
        $noteCategory = "Uncategorised";

        $updateQuery = $connection ->query("UPDATE `notes` SET `Title` = '$noteTitle', `Category` = '$noteCategory', `Note` = '$noteText' WHERE `notes`.`NoteID` = '$noteID'");

        echo json_encode("Note edited, it was Uncategorised");

    }else{

        $updateQuery = $connection ->query("UPDATE `notes` SET `Title` = '$noteTitle', `Category` = '$noteCategory', `Note` = '$noteText' WHERE `notes`.`NoteID` = '$noteID'");

        echo json_encode("Note edited {$noteID}");
    }
    
?>