<?php

	include 'conn.php';

	$value = $_POST['email'] ?? '';

	$valuep = $_POST['password'] ?? '';

	$sel = $connection ->query("SELECT * FROM users WHERE Email= '$value' ");

	$contador = mysqli_num_rows($sel);

	if($contador == 0)
	{
		echo json_encode('error1');
	}else {

		$fila = $sel -> fetch_assoc();

		if($fila['Password'] != $valuep){
				echo json_encode('error2');
			}else{
				echo json_encode($fila);
			}

	}

?>