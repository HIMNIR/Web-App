<!DOCTYPE html>
<html lang="en">

<head>
    <?php require "views/partials/head.php" ?>
    <title>Now Playing Movies</title>
    <link rel="stylesheet" href="Styles/now-playingstyles.css">
</head>

<body>
    <nav>
        <div class="logout">
            <form action="admin.php" method="post">
                <input type="hidden" name="logout" value="bofa">
                <button type="submit" class="button2">
                    <h1> LogOut</h1>
                </button>
            </form>
        </div>
    </nav>

    <?php require "partials/now-playing-loop.php"; ?>
    <footer>


        <strong> Last Log in : </strong><?= $_COOKIE['date_time'] ?? ''; ?>
    </footer>
</body>

</html>