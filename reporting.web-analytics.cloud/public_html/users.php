<?php
session_start();
 
if((!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) || $_SESSION["is_admin"] == false){
    header("location: login.php");
    exit;
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://cdn.zinggrid.com/zinggrid.min.js" defer></script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/main_style.css">
    <title>User Management</title>
</head>

<body>
    <h1>User Management</h1>

    <div class="nav">
        <p><a href="/logout.php">Logout</a></p>
        <p><a href="/index.php">Dashboard</a></p>
    </div>
    <hr>
    <br>

    <zing-grid theme="black" editor-controls pager page-size="10" caption="Create, Update or Delete Users"
        src="https://reporting.web-analytics.cloud/api"></zing-grid>


</body>

</html>