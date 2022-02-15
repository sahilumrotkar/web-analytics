<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

session_start();

if(isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true){
    header("location: index.php");
    exit;
}

// config
$host = "192.168.0.55";
$user = "sahil";
$db_password = "sak";
$database = "web_analytics_db";
$port = 3306;

$login_error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $db_connection = new mysqli($host, $user, $db_password, $database, $port);

    if ($db_connection->connect_error) {
        die("Connection failed: " . $db_connection->connect_error);
    }

    $username = htmlspecialchars($_POST["username"]) ?? NULL;
    $password = htmlspecialchars($_POST["password"]) ?? NULL;

    if ($username && $password) {

        $sql = $db_connection->prepare(
            "SELECT id, isAdmin FROM users WHERE username=? AND passcode=?"
        );
        $sql->bind_param("ss", $username, $password);
        $sql->execute();
        $sql->store_result();

        if ($sql->num_rows == 1) {
            
            $sql->bind_result($id, $is_admin);
            $sql->fetch();
                            
            $_SESSION["logged_in"] = true;
            $_SESSION["id"] = $id;
            $_SESSION["is_admin"] = $is_admin;                            
                            
            header("location: index.php");

        } else {
            // login error
            $login_error = "Invalid username or password.";
        }

        $sql->close();

    } else {
        // login error
        $login_error = "Invalid username or password.";
    }

    $db_connection->close();

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/main_style.css">
    <title>Login</title>
</head>

<body>
    <h1>Log in to view your Analytics Dashboard</h1>
    <hr>
    <br>

    <?php 
        if(!empty($login_error)){
            echo '<p style="color: rgb(213,55,51);">' . $login_error . '</p>';
        }        
    ?>

    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <p>
            <label>Username</label>
        </p>
        <p>
            <input type="text" name="username" />
        </p>
        
        <p>
            <label>Password</label>
        </p>
        <p>
            <input type="password" name="password" />
        </p>
        <div>
            <input type="submit" value="Log In" />
        </div>
    </form>
</body>

</html>