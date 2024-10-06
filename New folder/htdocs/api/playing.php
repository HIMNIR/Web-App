<?php
require "../../database/database-helper.php";
$config = require "../../database/config.php";
require "../../helpers/now-playing-helper.php";
session_start();

/**
 * Checks if the required keys are present in the GET parameters.
 *
 * @return bool true if the 'movie-id' key is present, false otherwise.
 */
function proper_keys_present() {
    return isset($_GET['movie-id']);
}

/**
 * Delivers an error message with a 404 status code in JSON format.
 */
function deliver_error_message() {
    http_response_code(404);
    $payload = [
        "message" => "No! Wrong, you fool!"
    ];
    header("Content-Type: application/json");
    echo json_encode($payload);
}

/**
 * Delivers a message indicating that the movie ID is wrong, with a 404 status code in JSON format.
 */
function deliver_bofa_message() {
    http_response_code(404);
    $payload = [
        "message" => "wrong id!"
    ];
    header("Content-Type: application/json");
    echo json_encode($payload);
}

/**
 * Checks if the provided movie ID is valid.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @return bool true if the movie ID is valid, false otherwise.
 */
function is_valid_movie($data_base) {
    $result = valid_movie($data_base, (int)$_GET['movie-id']);
    return $result !== null && $result !== false;
}

/**
 * Delivers the desired results for the movie count in JSON format.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @param int $movie_id The ID of the movie.
 */
function deliver_desired_results($data_base, $movie_id) {
    http_response_code(200);
    $payload = movie_count($data_base, $movie_id);
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo json_encode($payload);
}

$data_base = new DatabaseHelper($config);

if (!proper_keys_present()) {
    deliver_error_message();
} else if (is_valid_movie($data_base) === false) {
    deliver_bofa_message();
} else {
    deliver_desired_results($data_base, (int)$_GET['movie-id']);
}
$data_base->close_connection();
