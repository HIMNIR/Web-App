<?php

/**
 * Retrieves all theatres from the database.
 *
 * @param DatabaseHelper $db_helper The DatabaseHelper object for executing database queries.
 * @return array An array containing all theatres retrieved from the database.
 */
function get_theatres($db_helper) {
    $query = <<<QUERY
    SELECT * FROM theatre
    QUERY;
    return $db_helper->run($query)->fetchAll();
}

/**
 * Retrieves all theatres from the database in ascending order of their names.
 *
 * @param DatabaseHelper $db_helper The DatabaseHelper object for executing database queries.
 * @return array An array containing all theatres retrieved from the database in ascending order of their names.
 */
function get_theatres_asc($db_helper) {
    $query = <<<QUERY
    SELECT * FROM theatre
    ORDER BY name ASC
    QUERY;
    return $db_helper->run($query)->fetchAll();
}

/**
 * Retrieves all theatres from the database in descending order of their names.
 *
 * @param DatabaseHelper $db_helper The DatabaseHelper object for executing database queries.
 * @return array An array containing all theatres retrieved from the database in descending order of their names.
 */
function get_theatres_desc($db_helper) {
    $query = <<<QUERY
    SELECT * FROM theatre
    ORDER BY name DESC
    QUERY;
    return $db_helper->run($query)->fetchAll();
}
