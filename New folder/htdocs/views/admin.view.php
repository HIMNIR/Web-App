<!DOCTYPE html>
<html lang="en">

<head>
    <?php require "views/partials/head.php" ?>
    <title>Login form</title>
    <link rel="stylesheet" href="../Styles/admin-style.css">
</head>

<body>
    <main>
        <div class="container">

            <section class="contactForm">
                <h1> Log in</h1>
                <form id="formOne" method="post">

                    <header class="form-field">

                    </header>

                    <div class="form-field">
                        <input id="name" name="username" placeholder="👨🏻‍💻 User Name" required value=<?= $_SESSION['user'] ?? ''; ?>>
                    </div>

                    <div class="form-field">
                        <input id="password" name="password" type="password" placeholder="🔒  Enter Password" required>
                        <span class="error"><?php echo $message ?? ''; ?></span>
                    </div>

                    <button id="submit" type="submit">Submit</button>

                </form>
            </section>


        </div>

    </main>

</body>



</html>