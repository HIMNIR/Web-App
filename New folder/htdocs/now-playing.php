<?php

/**
 * Requires necessary files and starts session.
 */
require "../database/database-helper.php";
$config = require "../database/config.php";
require "../helpers/now-playing-helper.php";
session_start();

$data_base = new DatabaseHelper($config);

$playing_movies = '';
$var = '';
/**
 * Checks if 'id' is set in the GET parameters and validates its value.
 * If the value is invalid, redirects to an error page.
 */
if (isset($_GET['id'])) {
    $var = (int)$_GET['id'];

    if ($var > 5 || $var < 1) {
        header("Location:error/error.php");
    }
}
/**
 * Handles POST requests.
 * If the form token is 'delete', calls the delete_movies function.
 * If the form token is 'add', calls the add_movies function.
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['form_token'] === "delete") {
        delete_movies($_GET['id'], $_GET['removed'], $data_base);
        echo "sofa!";
    } else if ($_POST['form_token'] === "add") {
        $toadd = $_POST['selected_movies'];
        foreach ($toadd as $movies) {
            add_movies((int)$_GET['id'], $movies, $data_base);
        }
    }
}

/**
 * Retrieves playing movies from the database based on the specified category ID.
 */
$playing_movies = get_movies($data_base, $var);

$data_base->close_connection();
require "views/now-playing-views.php";
