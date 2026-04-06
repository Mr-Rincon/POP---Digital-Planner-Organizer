<?php

	include 'conn.php';

	include_once 'sessionCheck.php';

	$noteID = $_POST['noteIDDelete'] ?? '';

    //Check connection

    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // sql to delete a record
    $sql = "DELETE FROM notes WHERE NoteID=$noteID";

    if (mysqli_query($connection, $sql)) {
        echo json_encode( "Record deleted successfully");
    } else {
        echo json_encode("Error deleting record: " . mysqli_error($connection));
    }

    mysqli_close($connection);

?>