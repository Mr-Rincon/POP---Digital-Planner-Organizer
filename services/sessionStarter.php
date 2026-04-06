<?php

    $input = json_decode(file_get_contents('php://input'), true);
    // $input['key'] would equal "value"

    
    session_start();
    $dumb = $input['key'];
    $_SESSION["usuario"] = $input['key'];
    
echo $dumb;

