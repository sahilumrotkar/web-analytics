<?php
session_start();
 
if(!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true){
    header("location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
    <script src="https://cdn.zinggrid.com/zinggrid.min.js" defer></script>
    <script src="/dashboard_viz.js"></script>
    <script src="ua-parser.min.js"></script>
    <link rel="stylesheet" href="/styles/main_style.css">
    <title>Web Analytics Reporting</title>
</head>

<body>
    <h1>Reporting Dashboard</h1>
    
    

    <div class="nav">
        <p><a href="/logout.php">Logout</a></p>
        <p><a href="/screen_resolution.php">Generate Report</a></p>
        <?php if($_SESSION["is_admin"] == true) : ?>
            <p><a href="/users.php">User Management</a></p>
        <?php endif; ?>
    </div>
    <hr>
    <br>

    <h2>Browser Data</h2>
    <div style="height:600px; width:600px" id="barChart"></div>

    <h2>Language Data</h2>
    <div style="height:600px; width:600px" id="pieChart"></div>

    <h2>Screen Dimension Data</h2>
    <zing-grid theme="ios" pager page-size="10"</zing-grid>

</body>

</html>