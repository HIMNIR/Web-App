<!DOCTYPE html>
<html lang="en">

<head>
    <?php require "views/partials/head.php" ?>
    <link rel="stylesheet" href="Styles/theatres-style.css">
    <title>Theatres List</title>
</head>

<body>
    <nav>
        <div class="logout">
            <form action="admin.php" method="post">
                <input type="hidden" name="logout" value="bofa">
                <button type="submit">
                    <h1> LogOut</h1>
                </button>
            </form>
        </div>
        <div class="sort">
            <form action="theatres.php" method="post">
                <input type="hidden" name="sort_asc" value="asc">
                <button type="submit" class="button2">
                    <h1>Sort Ascending</h1>
                </button>
            </form>
            <form action="theatres.php" method="post">
                <input type="hidden" name="sort_desc" value="desc">
                <button type="submit" class="button2">
                    <h1>Sort Descending</h1>
                </button>
            </form>
        </div>
    </nav>
    <?php require "partials/theatres-loop.php"; ?>
    <footer> <strong> Last Log in : </strong><?= $_COOKIE['date_time'] ?? ''; ?></footer>
</body>

</html>