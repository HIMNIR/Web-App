<?php

/**
 * Retrieves the movies currently playing in the specified theatre.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @param int $movie_id The ID of the theatre.
 * @return array An array containing the details of the movies playing in the theatre.
 */
function get_movies($data_base, $movie_id) {
    $query = <<<QUERY
    SELECT m.title, m.release_date, m.id
    FROM movie m 
    JOIN now_playing n ON n.movie_id = m.id
    WHERE n.theatre_id = :movie_id 
    QUERY;
    return $data_base->run($query, [":movie_id" => $movie_id])->fetchAll();
}

/**
 * Deletes the specified movie from the specified theatre.
 *
 * @param int $theatre_id The ID of the theatre.
 * @param int $movie_id The ID of the movie.
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 */
function delete_movies($theatre_id, $movie_id, $data_base) {
    $query = <<<QUERY
    DELETE FROM now_playing
    WHERE theatre_id = :theatre_id 
    AND movie_id = :movie_id
    QUERY;
    $data_base->run($query, [":theatre_id" => $theatre_id, ":movie_id" => $movie_id]);
}

/**
 * Adds the specified movie to the specified theatre.
 *
 * @param int $theatre_id The ID of the theatre.
 * @param int $movie_id The ID of the movie.
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 */
function add_movies($theatre_id, $movie_id, $data_base) {
    $query = <<<QUERY
    INSERT INTO now_playing(theatre_id,movie_id)
    VALUES(:theatre_id,:movie_id);
    QUERY;
    $data_base->run($query, [":theatre_id" => $theatre_id, ":movie_id" => $movie_id]);
}

/**
 * Retrieves all available movies.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @return array An array containing details of all available movies.
 */
function available_movies($data_base) {
    $query = <<<QUERY
    SELECT *
    FROM movie 
    QUERY;
    return $data_base->run($query)->fetchAll();
}

/**
 * Retrieves the count of theatres where the specified movie is playing along with their details.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @param int $movie_id The ID of the movie.
 * @return object An object containing the count of theatres and their details.
 */
function movie_count($data_base, $movie_id) {
    // this query was a real pain in the ass for me but praise zues for this website - https://dba.stackexchange.com/questions/192208/mysql-return-json-from-a-standard-sql-query
    $query = <<<QUERY
    SELECT 
    COUNT(*) AS count,
    GROUP_CONCAT(
        JSON_OBJECT(
            'name', t.name,
            'address', t.address,
            'lat', t.lat,
            'long', t.long
        )
    ) AS theatres
FROM 
    theatre t
JOIN 
    now_playing n ON n.theatre_id = t.id
WHERE 
    n.movie_id = :movie_id
GROUP BY 
    n.movie_id
QUERY;
    $statement = $data_base->run($query, [":movie_id" => $movie_id]);
    $result = $statement->fetchObject();

    $result->theatres = json_decode('[' . $result->theatres . ']');

    return $result;
}

/**
 * Checks if the provided movie ID is valid.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @param int $movie_id The ID of the movie.
 * @return array|false An array containing details of the movie if it's valid, or false otherwise.
 */
function valid_movie($data_base, $movie_id) {
    $query = <<<QUERY
        SELECT * 
        FROM movie
        WHERE id =:movie_id

    QUERY;

    return $data_base->run($query, [":movie_id" => $movie_id])->fetchall();
}
