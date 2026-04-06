<?php

	include 'conn.php';

	$username = $_POST['name'] ?? '';
	$email = $_POST['email'] ?? '';
    $pass = $_POST['password'] ?? '';
    $userType = "user";

	$emailQuery = $connection ->query("SELECT * FROM users WHERE Email= '$email' ");

	$counter = mysqli_num_rows($emailQuery);

	if($counter == 1) {

        echo json_encode('error1');

	}else {

        $addingQuery = $connection ->query("INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`, `JoinDate`, `Active`, `UserType`)
        VALUES (NULL, '$username', '$email', '$pass', current_timestamp(), '1', '$userType')");

		echo json_encode('success');

	}

?>