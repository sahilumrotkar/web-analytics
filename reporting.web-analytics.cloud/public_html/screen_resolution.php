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
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
    <script src="https://cdn.zinggrid.com/zinggrid.min.js" defer></script>
    <script type="module" src="/report_viz.js"></script>
    <link rel="stylesheet" href="/styles/main_style.css">
    <title>Metric Report</title>
</head>
<body>

    <h1>Correlation between Screen Resolution and Performance?</h1>

    <div class="nav">
        <p><a href="/logout.php">Logout</a></p>
        <p><a href="/index.php">Dashboard</a></p>
    </div>
    <hr>
    <br>

    <p>For my report, I will be providing further insight on screen resolutions. 

The goal of this report is to investigate the hypothesis that users with a low screen resolution
likely have a poor internet connection resulting slow page loads, while the opposite is true for
users with high resolution screens. <br><br>

Developers often create, design and test websites on high end machines with a fast 
internet connection. This often leads to the expectation that all users have access
to the same environment that was used to develop an application. Due to this, there exists a 
gap in the resources required to run most apps and the resoures available to users of such apps. The impact of this gap is amplified in cases of websites and apps
that are designed to aid people from lower socio-economic backgrounds, such a financial aid portals for students.<br><br>

Hence, I will be comparing the screen resolution of each user when they visit the main page to their connection type and page load time
and try and visualize any correlations that exist between these features.</p>


    
</body>
</html>