<?php
error_reporting(0); // removes all PHP errors (localhost: no access to database)

$servername = "localhost";
$database = "u440028312_users";
$username = "u440028312_kimji";
$password = "Rlawldnr7!";

$tb_count = "user_count"; // tables in the database
$tb_day = "day_record";
$tb_month = "month_record";
$tb_year = "year_record";

$conn = new mysqli($servername, $username, $password, $database);

if (!$conn->connect_error) { // only when database is connected
    $sql_count = "SELECT * FROM $tb_count";
    $find_counts = $conn->query($sql_count);
    
    while($row = mysqli_fetch_assoc($find_counts)) {
        $past_date = $row['last_date'];
        $present_date = date("Y-m-d"); // ex. '2019-07-04' = July 4, 2019
        
        $past_year = substr($past_date, 0, 4); // type: string
        $present_year = substr($present_date, 0, 4);
        $past_month = substr($past_date, 5, -3);
        $present_month = substr($present_date, 5, -3);
        $past_day = substr($past_date, 8, 10);
        $present_day = substr($present_date, 8, 10);

        if ($present_date != $past_date) { // only when present and past dates are different
            $day_count_store = $row['day_count'];
            $day_id_store = $conn->query("SELECT max(id) FROM $tb_day") + 1;
            $month_count_store = $row['month_count'];
            $month_id_store = $conn->query("SELECT max(id) FROM $tb_month") + 1;
            $year_count_store = $row['year_count'];
            $year_id_store = $conn->query("SELECT max(id) FROM $tb_year") + 1;

            if ($past_year != $present_year) {
                $conn->query("INSERT INTO $tb_day(`id`, `date`, `count`) VALUES ($day_id_store,'{$past_date}',$day_count_store)");
                $conn->query("INSERT INTO $tb_month(`id`, `date`, `count`) VALUES ($month_id_store,'{$past_date}',$month_count_store)");
                $conn->query("INSERT INTO $tb_year(`id`, `date`, `count`) VALUES ($year_id_store,'{$past_date}',$year_count_store)");
                $row['day_count'] = 0;
                $row['month_count'] = 0;
                $row['year_count'] = 0;
            } else if ($past_month != $present_month) {
                $conn->query("INSERT INTO $tb_day(`id`, `date`, `count`) VALUES ($day_id_store,'{$past_date}',$day_count_store)");
                $conn->query("INSERT INTO $tb_month(`id`, `date`, `count`) VALUES ($month_id_store,'{$past_date}',$month_count_store)");
                $row['day_count'] = 0;
                $row['month_count'] = 0;
            } else if ($past_day != $present_day) {
                $conn->query("INSERT INTO $tb_day(`id`, `date`, `count`) VALUES ($day_id_store,'{$past_date}',$day_count_store)");
                $row['day_count'] = 0;
            }

            $conn->query("UPDATE $database . $tb_count SET `last_date` = '{$present_date}'");
        }
        
        $counts = array($row['day_count'], $row['month_count'], $row['year_count'],$row['total_count']);
        for ($x = 0; $x < 4; $x++) $counts[$x] += 1; // $counts contains updated values

        // Updating counts in the last row of each record for day, month, year
        $conn->query("UPDATE (SELECT row FROM $tb_day WHERE id=(SELECT max(id) FROM $tb_day)) SET `count` = $counts[0]");
        $conn->query("UPDATE (SELECT row FROM $tb_month WHERE id=(SELECT max(id) FROM $tb_month)) SET `count`=$counts[1]");
        $conn->query("UPDATE (SELECT row FROM $tb_year WHERE id=(SELECT max(id) FROM $tb_year)) SET `count`=$counts[2]");

        // Updating the realtime values for day, month, year, total
        $conn->query("UPDATE $database . $tb_count SET `day_count` = $counts[0]");
        $conn->query("UPDATE $database . $tb_count SET `month_count` = $counts[1]");
        $conn->query("UPDATE $database . $tb_count SET `year_count` = $counts[2]");
        $conn->query("UPDATE $database . $tb_count SET `total_count` = $counts[3]");
    }
    $day = $counts[0];
    $month = $counts[1];
    $year = $counts[2];
    $total = $counts[3];
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Edward Jiwook Kim</title>
        <meta charset="UTF-8">
        <meta http-equiv="Cache-control" content="no-cache">
		<meta name="description" content="Personal Website">
		<meta name="keywords" content="HTML,CSS,JavaScript">
		<meta name="author" content="Edward Jiwook Kim">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/common.css">
        <link rel="stylesheet" href="css/index.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js"></script>
        <script src="https://d3js.org/d3.v5.min.js"></script>
    </head>
    <body>
        <div class="page-container">
            <div class="navbar-blank" style="height:50px"></div>
            <nav class="navbar navbar-fixed-top" id="navbar"></nav>
            <div class="below-nav-container">
                <div class="jumbotron-blank">
                </div>
                <div class="jumbotron" style="padding:0; margin-top: 50px; margin-bottom:0px; top: 0;">
                    <div class="jumbotron-content">
                        <img class="my-face" src="./images/face.png" alt="Edward's face" height="90" width="90">
                        <div class="jumbotron-below">
                            <button id="click-me" onclick="infoUp()"type="button" class="btn btn-default"><h4>Click Me!</h4></button>
                        </div>
                    </div>
                    <div class="particles-container">
                        <canvas class="background">
                        </canvas>
                        <script src="index.js"></script>
                    </div>
                </div>
                <script>
                    function infoUp() {
                        $("#click-me").remove();
                        $(".jumbotron-content").css("width","260px");
                        $(".jumbotron-content").css("margin-left","-130px");
                        $(".jumbotron-below").css("height","80px");
                        setTimeout(function() {
                            $(".jumbotron-below").append("<h3>Edward Jiwook Kim</h3>");
                            $(".jumbotron-below").append("<h4>Welcome to my website,</h4>");
                            $(".jumbotron-below").append("<h4>You'll find more about me here!</h4>");
                        }, 100); // millisecond
                    }
                </script>
                <div class="main-contents">
                    <div class="quote-box">
                        <div class="quote-container">
                            <h4 id="quote-generate"></h4>
                        </div>
                    </div>
                    <script>   
                        fetch('json/quotes.json').then((response) => {
                            return response.json();
                            }).then((data) => {
                                function getRandomInt(max) {
                                    return Math.floor(Math.random() * max);
                                }
                                var ran_index = getRandomInt(data.quotes.length);
                                $("#quote-generate").text("\"" + data.quotes[ran_index].quote + "\" -" + data.quotes[ran_index].by).fadeIn();
                                window.setInterval(function() {
                                    ran_index = getRandomInt(data.quotes.length);
                                    $("#quote-generate").fadeOut(function() {
                                        $(this).text("\"" + data.quotes[ran_index].quote + "\" -" + data.quotes[ran_index].by).fadeIn();
                                    });
                                }, 7000);
                            }).catch(function (error) {
                                console.log(error);
                            });
                    </script>
                    
                    <div class="container" style="margin-top: 10px;">
                        <div class="row">
                            <div class="col-sm-6" id="outer-box-holder" style="display: flex;">
                                <div id="inner-box-holder">
                                    <p style="margin-bottom: 0;"><b>Visits Today</b></p>
                                    <p id="visits-today">0</p>
                                </div>
                                <div id="inner-box-holder">
                                    <p style="margin-bottom: 0;"><b>Visits this Month</b></p>
                                    <p id="visits-month">0</p>
                                </div>
                            </div>
                            <div class="col-sm-6" id="outer-box-holder" style="display: flex;">
                                <div id="inner-box-holder">
                                    <p style="margin-bottom: 0;"><b>Visits this Year</b></p>
                                    <p id="visits-year">0</p>
                                </div>
                                <div id="inner-box-holder">
                                    <p style="margin-bottom: 0;"><b>Visits Total</b></p>
                                    <p id="visits-total">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <script>
                        $("#visits-today").text(<?php echo "{$day}"?>);
                        $("#visits-month").text(<?php echo "{$month}"?>);
                        $("#visits-year").text(<?php echo "{$year}"?>);
                        $("#visits-total").text(<?php echo "{$total}"?>);
                    </script>
                    <div class="container" style="margin-top: 10px;">
                        <div class="users-chart-container">
                            visits chart
                        </div>
                        <div class="users-chart-buttons">
                            visits chart buttons (by Day/Month/Year)
                        </div>
                    </div>
                    <div class="container" style="margin-top: 10px;">
                        <div class="skill-chart">
                            skill: languages
                        </div>
                    </div>
                    <div class="container" style="margin-top: 10px;">
                        <div class="skill-chart">
                            skill: tools
                        </div>
                    </div>
                </div>
                <br>
                <footer class="footer-container"></footer>
                <script src="./common.js"></script>
            </div>
        </div>
    </body>
</html>

