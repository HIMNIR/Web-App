<div class="container">


    <?php foreach ($theatres as $halls) : ?>
        <div class="box">
            <div class="one"> <img src="../images/b2.png" alt="No HTML 5 ??"></div>
            <div class="two">
                <li>
                    <strong>Name :</strong>
                    <h1> <?php echo $halls['name'] ?></h1>
                    <hr>
                    <br>
                    <strong>Address :</strong><?php echo $halls['address'] ?>
                    <br>
                    <strong>Latitude :</strong> <?php echo $halls['lat'] ?>
                    <br>
                    <strong>Longitude :</strong><?php echo $halls['long'] ?>
                </li>
                <hr>
                <a href="now-playing.php?id=<?php echo $halls['id']; ?>"> Check now playing </a>



            </div>
        </div>
    <?php endforeach ?>


</div>