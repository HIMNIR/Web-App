<div class="tareas">
    <?
    ?>
    <form action="now-playing.php?id=<?php echo $_GET['from'] ?>" method="post">
        <ul>
            <?php foreach ($available_movies as $items) : ?>

                <li class="custom-checkbox">
                    <input type="hidden">
                    <input type="checkbox" id="movie_<?php echo $items['id']; ?>" name="selected_movies[]" value="<?php echo $items['id']; ?>">
                    <label for="movie_<?php echo $items['id']; ?>">
                        <div class="checkmark"></div>
                        <h2><?php echo $items['title']; ?></h2>
                    </label>
                </li>
                <?php
                ?>
            <?php endforeach; ?>

        </ul>

        <button type="submit" name="form_token" value="add">
            <h2> Add Movies</h2>
        </button>
    </form>

</div>