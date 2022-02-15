<?php

session_start();
$_SESSION = array();
session_destroy();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/main_style.css">
    <title>Logged Out</title>
</head>

<body>
    <h1>You have been logged about successfully</h1>
    <p><a href="/login.php">Log in</a></p>
</body>

</html>