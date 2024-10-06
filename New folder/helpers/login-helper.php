<?php

/**
 * Checks if the provided username and password belong to an admin user.
 *
 * @param DatabaseHelper $data_base The DatabaseHelper object for database operations.
 * @param string $username The username of the admin user.
 * @param string $password The password of the admin user.
 * @return bool True if the username and password match those of an admin user, false otherwise.
 */
function is_admin($data_base, $username, $password) {
    $query = <<<QUERY
    SELECT * 
    FROM administrator;
    QUERY;
    $containers = $data_base->run($query)->fetchAll();

    foreach ($containers as $container) {
        if ($container['username'] === $username && password_verify($password, $container['password'])) {
            return true;
        }
    }
    return false;
}
