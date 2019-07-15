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

$conn = new mysqli($servername, $username, $password, $database); // connection to database

if (!$conn->connect_error) { // when database is connected
    $sql_count = "SELECT * FROM $tb_count";
    $sql_recent_day = "SELECT * FROM $tb_day WHERE `id` = (SELECT max(id) FROM $tb_day)"; // last row only (most recent)
    $sql_recent_month = "SELECT * FROM $tb_month WHERE `id` = (SELECT max(id) FROM $tb_month)";
    $sql_recent_year = "SELECT * FROM $tb_year WHERE `id` = (SELECT max(id) FROM $tb_year)";
    $find_counts = $conn->query($sql_count);
    $find_day = $conn->query($sql_recent_day);
    $find_month = $conn->query($sql_recent_month);
    $find_year = $conn->query($sql_recent_year);
    
    $count_row = mysqli_fetch_assoc($find_counts);
    $day_row = mysqli_fetch_assoc($find_day);
    $month_row = mysqli_fetch_assoc($find_month);
    $year_row = mysqli_fetch_assoc($find_year);
    
    $past_date = $count_row['last_date'];
    $present_date = date("Y-m-d"); // ex. '2019-07-04' = July 4, 2019
        
    $past_year = substr($past_date, 0, 4); // type: string
    $present_year = substr($present_date, 0, 4);
    $past_month = substr($past_date, 5, -3);
    $present_month = substr($present_date, 5, -3);
    $past_day = substr($past_date, 8, 10);
    $present_day = substr($present_date, 8, 10);
    
    $day_id_store = $day_row['id'];
    $month_id_store = $month_row['id'];
    $year_id_store = $year_row['id'];

    if ($present_date != $past_date) { // only when present and past dates are different
        $day_count = $count_row['day_count'];
        ++$day_id_store;
        $month_count = $count_row['month_count'];
        ++$month_id_store;
        $year_count = $count_row['year_count'];
        ++$year_id_store;

        $conn->query("INSERT INTO $tb_day(`id`, `date`, `count`) VALUES ($day_id_store,'{$present_date}',$day_count)");
        $count_row['day_count'] = 0;

        if ($past_year != $present_year) {
            $conn->query("INSERT INTO $tb_year(`id`, `date`, `count`) VALUES ($year_id_store,'{$present_date}',$year_count)");
            $count_row['year_count'] = 0;
        } 
        if ($past_month != $present_month || $past_year != $present_year) {
            $conn->query("INSERT INTO $tb_month(`id`, `date`, `count`) VALUES ($month_id_store,'{$present_date}',$month_count)");
            $count_row['month_count'] = 0;
        }
        $conn->query("UPDATE $tb_count SET `last_date` = '{$present_date}'");
    }
        
    $counts = array($count_row['day_count'], $count_row['month_count'], $count_row['year_count'],$count_row['total_count']);
    for ($x = 0; $x < 4; $x++) ++$counts[$x]; // $counts contains updated values

    // Updating counts in the last row of each record for day, month, year
    $conn->query("UPDATE $tb_day SET `count` = $counts[0] WHERE `id` = $day_id_store");
    $conn->query("UPDATE $tb_month SET `count` = $counts[1] WHERE `id` = $month_id_store");
    $conn->query("UPDATE $tb_year SET `count` = $counts[2] WHERE `id` = $year_id_store");

    // Updating the realtime values for day, month, year, total
    $conn->query("UPDATE $tb_count SET `total_count` = $counts[3], `day_count` = $counts[0], `month_count` = $counts[1], `year_count` = $counts[2]");

    // Data from record tables -> JSON
    $json_file = 'json/counts.json';
    $json_contents = "{\"counts_day\": {";

    $last_row = $conn->query("SELECT * FROM $tb_day WHERE `id` = (SELECT max(id) FROM $tb_day)");
    
    $day_rows_length = mysqli_fetch_assoc($last_row);
    $day_length = $day_rows_length['id'];
    for ($x = 0; $x < $day_length; $x++) {
        
        $sql_day = "SELECT * FROM $tb_day WHERE `id` = $x + 1";
        $find_day = $conn->query($sql_day);
        $day_row = mysqli_fetch_assoc($find_day);
        
        if ($x == $day_length - 1) $json_contents = $json_contents . "\"" . "{$day_row['date']}" . "\": " . "{$day_row['count']}";
        else $json_contents = $json_contents . "\"" . "{$day_row['date']}" . "\": " . "{$day_row['count']}" . ",";
        
    }
    $json_contents = $json_contents . "}, \"counts_month\": {";

    $last_row = $conn->query("SELECT * FROM $tb_month WHERE `id` = (SELECT max(id) FROM $tb_month)");
    
    $month_rows_length = mysqli_fetch_assoc($last_row);
    $month_length = $month_rows_length['id'];
    for ($x = 0; $x < $month_length; $x++) {
            
        $sql_month = "SELECT * FROM $tb_month WHERE `id` = $x + 1";
        $find_month = $conn->query($sql_month);
        $month_row = mysqli_fetch_assoc($find_month);
            
        if ($x == $month_length - 1) $json_contents = $json_contents . "\"" . "{$month_row['date']}" . "\": " . "{$month_row['count']}";
        else $json_contents = $json_contents . "\"" . "{$month_row['date']}" . "\": " . "{$month_row['count']}" . ",";
            
    }
    $json_contents = $json_contents . "}, \"counts_year\": {";
    $last_row = $conn->query("SELECT * FROM $tb_year WHERE `id` = (SELECT max(id) FROM $tb_year)");
    
    $year_rows_length = mysqli_fetch_assoc($last_row);
    $year_length = $year_rows_length['id'];
    for ($x = 0; $x < $year_length; $x++) {
            
        $sql_year = "SELECT * FROM $tb_year WHERE `id` = $x + 1";
        $find_year = $conn->query($sql_year);
        $year_row = mysqli_fetch_assoc($find_year);
            
        if ($x == $year_length - 1) $json_contents = $json_contents . "\"" . "{$year_row['date']}" . "\": " . "{$year_row['count']}";
        else $json_contents = $json_contents . "\"" . "{$year_row['date']}" . "\": " . "{$year_row['count']}" . ",";
            
    }

    $json_contents = $json_contents . "}}";
    file_put_contents($json_file, $json_contents);
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
        <!--<link href="css/bootstrap.min.css" rel="stylesheet">-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
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
                                var quote_kr_index = getRandomInt(data.quotes_kor.length),
                                    quote_en_index = getRandomInt(data.quotes.length);

                                if ($("#lang-setting").is(':checked')) { // Shoot Korean quotes
                                    $("#quote-generate").text("\"" + data.quotes_kor[quote_kr_index].quote + "\" -" + data.quotes_kor[quote_en_index].by).fadeIn();
                                } else { // Shoot English quotes
                                    $("#quote-generate").text("\"" + data.quotes[quote_en_index].quote + "\" -" + data.quotes[quote_en_index].by).fadeIn();
                                }
                                window.setInterval(function() {
                                    if ($("#lang-setting").is(':checked')) { // Shoot Korean quotes
                                        quote_kr_index = getRandomInt(data.quotes_kor.length);
                                        $("#quote-generate").fadeOut(function() {
                                            $(this).text("\"" + data.quotes_kor[quote_kr_index].quote + "\" -" + data.quotes_kor[quote_kr_index].by).fadeIn();
                                        });
                                    } else { // Shoot English quotes
                                        quote_en_index = getRandomInt(data.quotes.length);
                                        $("#quote-generate").fadeOut(function() {
                                            $(this).text("\"" + data.quotes[quote_en_index].quote + "\" -" + data.quotes[quote_en_index].by).fadeIn();
                                        });
                                    }
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
                        var array_visits = [<?php echo "{$counts[0]}"?>,
                                            <?php echo "{$counts[1]}"?>,
                                            <?php echo "{$counts[2]}"?>,
                                            <?php echo "{$counts[3]}"?>];
                        const len = array_visits.length,
                            mil = 1000000,
                            kilo = 1000;
                        
                        for (var i = 0; i < len; i++) {
                            if (array_visits[i] >= mil) {
                                array_visits[i] = ((array_visits[i] / mil).toFixed(3)).toString().concat(" M");
                            } else if (array_visits[i] >= kilo) {
                                array_visits[i] = ((array_visits[i] / kilo).toFixed(3)).toString().concat(" K");
                            }
                        }
                        $("#visits-today").text(array_visits[0]);
                        $("#visits-month").text(array_visits[1]);
                        $("#visits-year").text(array_visits[2]);
                        $("#visits-total").text(array_visits[3]);
                    </script>
                    <div class="container" style="margin-top: 10px;">
                        <div class="skill-chart">
                            <svg class="visits-chart"></svg>
                        </div>
                        <div class="users-chart-buttons">
                            visits chart buttons (by Day/Month/Year)
                        </div>
                    </div>
                    <div class="container" style="margin-top: 10px;">
                        <div class="skill-chart">
                            <svg width="920" height="270" id="language-chart"></svg>
                        </div>        
                    </div>
                    <div class="container" style="margin-top: 10px;">
                        <div class="skill-chart">
                            <svg width="920" height="270" id="tool-chart"></svg>
                        </div>
                    </div>
                </div>
                <br>
                <footer class="footer-container"></footer>
                <script src="./common.js"></script>
                <script src="./index_visit_charts.js"></script>
                <script src="./index_lang_charts.js"></script>
                <script src="./index_tool_charts.js"></script>
                <script src="./common_lang.js"></script>
            </div>
        </div>
    </body>
</html>

