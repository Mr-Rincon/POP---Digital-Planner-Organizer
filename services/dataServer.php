<?php
//Serving all the notes

include_once 'conn.php';

include_once 'sessionCheck.php';

// FETCH DATA
$sql = mysqli_query($connection, "SELECT * FROM notes WHERE OwnerID='$User' ORDER BY CreateDate DESC");

// STORE DATA IN result VARIABLE
$result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

exit(json_encode($result));


?>