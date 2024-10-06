<?php
// all comments here from chat gpt, code it self is mine + what i stole from labs and class activities
/**
 * Requires necessary files and starts session.
 */
require "../database/database-helper.php";
require '../helpers/login-helper.php';
session_start();

/**
 * Class LoginController
 * Controls the login functionality.
 */
class LoginController {

  /**
   * LoginController constructor.
   * Handles GET and POST requests.
   * Shows login form for GET requests.
   * Processes login for POST requests.
   */
  public function __construct() {

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
      $this->show_login();
    } else {
      if (isset($_POST['form_token'])) {
        if ($_POST['form_token'] === "logout") {
          $_SESSION = array();
          session_destroy();
          $this->show_login();
        }
      } else {
        $this->process_login();
      }
    }
  }

  /**
   * Displays the login form.
   * @param string|null $message Optional message to display.
   */
  function show_login($message = null) {
    require('views/admin.view.php');
  }

  /**
   * Processes the login attempt.
   * Authenticates the user with provided credentials.
   * Sets session user if login is successful.
   * Redirects to theatres.php if user is an admin.
   * Redirects back to login page with error message if login fails.
   */
  function process_login() {
    $config = require "../database/config.php";
    $data_base = new DatabaseHelper($config);
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $message = 'Username/password is wrong';
    $_SESSION['user'] = $username;
    if (is_admin($data_base, $username, $password)) {

      $currentDateTime = new DateTime();
      setcookie('date_time', $currentDateTime->format('Y-m-d H:i:s'));
      header('Location: theatres.php');
      exit();
    } else {

      $this->show_login($message);
      exit();
    }
  }
}

// Instantiate the LoginController to handle the login functionality
$loginController = new LoginController();
