<?php
require "../database/database-helper.php";
$config = require "../database/config.php";
require "../helpers/theatre-helpers.php";
session_start();

$_SESSION['return_token'] = 'bofa';  // https://stackoverflow.com/questions/9510703/token-based-authentication-in-php

$data_base = new DatabaseHelper($config);

// get the post name variable to see if ascending or descending was selected. 
if (isset($_POST['sort_asc'])) {
    $theatres = get_theatres_asc($data_base);
} elseif (isset($_POST['sort_desc'])) {
    $theatres = get_theatres_desc($data_base);
} else {
    $theatres = get_theatres($data_base);
}

$data_base->close_connection();
require "views/theatres-views.php";
