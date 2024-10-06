<div class="container">

    <?php foreach ($playing_movies as $items) : ?>
        <div class="box">
            <div class="one"> <img src="../../images/b2.png" alt=""> </div>
            <div class="two">
                <form action="now-playing.php?id=<?php echo $_GET['id'] ?? 0; ?>&removed=<?php echo $items['id'] ?>" method="post">
                    <li>
                        <h3> Name : <?php echo $items['title'] ?>
                            <h3> Release Date : <?php echo $items['release_date'] ?>
                    </li>
                    </h3>
            </div>
            <div class="del_button"></div>
            <input type="hidden" name="form_token" value="delete">
            <button type="submit">
                <h3>Delete</h3>
            </button>
            </form>
        </div>
    <?php endforeach ?>
    <div class="box">
        <div class="three">

            <form action="../add_movie.php?from=<?php echo $_GET['id'] ?? 0; ?>" method="post">
                <input type="hidden">
                <button type="submit">
                    <h1> ADD Movie</h1>
                </button>
            </form>
        </div>
    </div>




</div>



</div>