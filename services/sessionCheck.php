<?php
$User = '';

session_start();
session_destroy();

if (isset($_SESSION['usuario'])){
    $User = $_SESSION['usuario'];
}else {
    $User = 0;
}
?>
