<?
require "../database/database-helper.php";
$config = require "../database/config.php";
require "../helpers/now-playing-helper.php";
session_start();


$data_base = new DatabaseHelper($config);

$available_movies = available_movies($data_base);


$data_base->close_connection();

require "views/add_movie_view.php";
