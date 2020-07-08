<?php
session_start();
$error='';
$json = file_get_contents('http://flask/');
$obj = json_decode($json);
?>
<html>
    <head>
        <title>My Shop</title>
    </head>

    <body>
        <p>
        <?php
        $_SESSION['login_user']= $username;
        $user = $_SESSION['login_user'];
        echo "<p>$user</p>";
        ?>
        </p>
        <h1></h1>
        <ul>
            <?php

            $products = $obj->products;

            foreach ($products as $product) {
                echo "<li>$product</li>";
            }
            ?>
        </ul>
    </body>
</html>
