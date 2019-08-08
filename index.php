<?php
error_reporting(0); // removes all PHP errors (localhost: no access to database)

$servernameFile = fopen("servername.txt", "r");
$servername = fread($servernameFile, filesize("servername.txt"));
fclose($servernameFile);

$databaseFile = fopen("database.txt", "r");
$database = fread($databaseFile, filesize("database.txt"));
fclose($databaseFile);

$usernameFile = fopen("username.txt", "r");
$username = fread($usernameFile, filesize("username.txt"));
fclose($usernameFile);

$passwordFile = fopen("password.txt", "r");
$password = fread($passwordFile,filesize("password.txt"));
fclose($passwordFile);

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

    // Data from record tables -> JSON
    $json_file = 'json/counts.json';
    $json_contents = "{\"counts_day\": {";
    $last_row = $conn->query($sql_recent_day);
    $day_rows_length = mysqli_fetch_assoc($last_row);
    $day_length = $day_rows_length['id'];
    for ($x = 1; $x <= $day_length; $x++) {
        $sql_day = "SELECT * FROM $tb_day WHERE `id` = $x";
        $find_day = $conn->query($sql_day);
        $day_row = mysqli_fetch_assoc($find_day);
        $json_contents .= "\"{$day_row['date']}\": {$day_row['count']}";
        if ($x < $day_length) $json_contents .= ",";
    }

    $json_contents .= "}, \"counts_month\": {";
    $last_row = $conn->query($sql_recent_month);
    $month_rows_length = mysqli_fetch_assoc($last_row);
    $month_length = $month_rows_length['id'];
    for ($x = 1; $x <= $month_length; $x++) {
        $sql_month = "SELECT * FROM $tb_month WHERE `id` = $x";
        $find_month = $conn->query($sql_month);
        $month_row = mysqli_fetch_assoc($find_month);
        $json_contents .= "\"{$month_row['date']}\": {$month_row['count']}";
        if ($x < $month_length) $json_contents .= ",";
    }

    $json_contents .= "}, \"counts_year\": {";
    $last_row = $conn->query($sql_recent_year);
    $year_rows_length = mysqli_fetch_assoc($last_row);
    $year_length = $year_rows_length['id'];
    for ($x = 1; $x <= $year_length; $x++) {
        $sql_year = "SELECT * FROM $tb_year WHERE `id` = $x";
        $find_year = $conn->query($sql_year);
        $year_row = mysqli_fetch_assoc($find_year);
        $json_contents .= "\"{$year_row['date']}\": {$year_row['count']}";
        if ($x < $year_length) $json_contents .= ",";
    }
    $json_contents .= "}}";
    file_put_contents($json_file, $json_contents); // sql database to json
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
                            <button id="click-me" onclick="infoUp()"type="button" class="btn btn-default"><h4 id="clickMeText">Click Me!</h4></button>
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
                            if ($("#lang-setting").is(':checked')) {
                                $text1 = $("<h3></h3>").attr("id", "clickText1").text("에드워드, 김지욱");
                                $text2 = $("<h4></h4>").attr("id", "clickText2").text("안녕하세요? 이곳에선 저에 대해서");
                                $text3 = $("<h4></h4>").attr("id", "clickText3").text("더 자세히 아실 수 있어요!");
                                $(".jumbotron-below").append($text1);
                                $(".jumbotron-below").append($text2);
                                $(".jumbotron-below").append($text3);
                            } else {
                                $text1 = $("<h3></h3>").attr("id", "clickText1").text("Edward Jiwook Kim");
                                $text2 = $("<h4></h4>").attr("id", "clickText2").text("Welcome to my website,");
                                $text3 = $("<h4></h4>").attr("id", "clickText3").text("You'll find more about me here!");
                                $(".jumbotron-below").append($text1);
                                $(".jumbotron-below").append($text2);
                                $(".jumbotron-below").append($text3);
                            }
                        }, 100); // millisecond
                    }
                </script>
                <div class="main-contents">
                    <div class="quote-box">
                        <div class="quote-container">
                            <h4 id="quote-generate"></h4>
                        </div>
                    </div>
                    <div class="container" style="margin-top: 10px;">
                        <div class="row">
                            <div class="col-xs-6 col-sm-3" id="outer-box-holder">
                                <div id="inner-box-holder" class="theBox">
                                    <div class="box-icon-holder">
                                        <img style="margin: 0 auto; margin-top: 15%; width:70%; height: 70%;"src='images/today.png'>
                                    </div>
                                    <div class="box-text">
                                    <b><p id="visit-today" style="margin-bottom: 0;">Visits Today</p></b>
                                    <b><p id="visits-today">0</p></b>
                                        <div class="credit-box" style="display:none;">Icons made by
                                            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                                                Freepik
                                            </a><br>from
                                            <a href="https://www.flaticon.com/" title="Flaticon">
                                                www.flaticon.com
                                            </a><br>is licensed by
                                            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
                                                CC 3.0 BY
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div class="col-xs-6 col-sm-3" id="outer-box-holder">
                                <div id="inner-box-holder" class="theBox">
                                    <div class="box-icon-holder">
                                        <img style="margin: 0 auto; margin-top: 15%; width:70%; height: 70%;" src='images/month.png'>
                                    </div>
                                    <div class="box-text">
                                    <b><p id="visit-month" style="margin-bottom: 0;">Visits this Month</p></b>
                                    <b><p id="visits-month">0</p></b>
                                        <div class="credit-box" style="display:none;">Icons made by
                                            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                                                Freepik
                                            </a><br>from
                                            <a href="https://www.flaticon.com/" title="Flaticon">
                                                www.flaticon.com
                                            </a><br>is licensed by
                                            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
                                                CC 3.0 BY
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-3" id="outer-box-holder">
                                <div id="inner-box-holder" class="theBox">
                                    <div class="box-icon-holder">
                                        <img style="margin: 0 auto; margin-top: 15%; width:70%; height: 70%;"src='images/year.png'>
                                    </div>
                                    <div class="box-text">
                                        <b><p id="visit-year" style="margin-bottom: 0;">Visits this Year</p></b>
                                        <b><p id="visits-year">0</p></b>
                                        <div class="credit-box" style="display:none;">Icons made by
                                            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                                                Freepik
                                            </a><br>from
                                            <a href="https://www.flaticon.com/" title="Flaticon">
                                                www.flaticon.com
                                            </a><br>is licensed by
                                            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
                                                CC 3.0 BY
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-3" id="outer-box-holder">
                                <div id="inner-box-holder" class="theBox">
                                    <div class="box-icon-holder">
                                        <img style="margin: 0 auto; margin-top: 15%; width:70%; height: 70%;"src='images/total.png'>
                                    </div>
                                    <div class="box-text" style="overflow: hidden;">
                                    <b><p id="visit-total" style="margin-bottom: 0;">Visits Total</p></b>
                                    <b><p id="visits-total">0</p></b>
                                        <div class="credit-box" style="display:none;">Icons made by
                                            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                                                Freepik
                                            </a><br>from
                                            <a href="https://www.flaticon.com/" title="Flaticon">
                                                www.flaticon.com
                                            </a><br>is licensed by
                                            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
                                                CC 3.0 BY
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <script>
                        $(".box-icon-holder").hover(function(obj, i) {
                            $(".theBox").css('transition-delay','0s');
                            $(".theBox").css('-webkit-transition-delay','0s');
                            $(".theBox").css('height',200);
                            $(".box-text").css('height',180);
                            $(".credit-box").css("display", "");
                            $(".box-text").css('transition-delay','0s');
                            $(".box-text").css('-webkit-transition-delay','0s');
                        }, function() {
                            $(".theBox").css('height',130);
                            $(".box-text").css('height',120);
                            $(".box-text").css('transition-delay','1.2s');
                            $(".box-text").css('-webkit-transition-delay','1.2s');
                            $(".credit-box").css("display", "none");
                        });
                    </script>
                    <script>
                        var array_visits = [<?php echo "{$counts[0]}"?>,
                                            <?php echo "{$counts[1]}"?>,
                                            <?php echo "{$counts[2]}"?>,
                                            <?php echo "{$counts[3]}"?>];
                        const kilo = 1000,
                            mil = kilo * kilo,
                            bil = kilo * mil;
                        
                        array_visits = array_visits.map(function(n) {
                            if (n >= bil) return (n / bil).toFixed(2).toString().concat(" B");
                            else if (n >= mil) return (n / mil).toFixed(2).toString().concat(" M");
                            else if (n >= kilo) return (n / kilo).toFixed(2).toString().concat(" K");
                            return n;
                        });
                        
                        $("#visits-today").text(array_visits[0]);
                        $("#visits-month").text(array_visits[1]);
                        $("#visits-year").text(array_visits[2]);
                        $("#visits-total").text(array_visits[3]);

                        const t0 = performance.now();
                        var t1;
                        var loopPointer = setInterval(function() {
                            t1 = performance.now();
                            if (t1 - t0 >= 3000) { // only update counts when online for at least 3 seconds
                                $.ajax({
                                    url: 'index_count_update.php',
                                    success: function(data) {
                                        var dataArray = data.split(".");
                                        dataArray = dataArray.map(function(n) {
                                            if (n >= bil) return (n / bil).toFixed(2).toString().concat(" B");
                                            else if (n >= mil) return (n / mil).toFixed(2).toString().concat(" M");
                                            else if (n >= kilo) return (n / kilo).toFixed(2).toString().concat(" K");
                                            return n;
                                        });
                                        if (dataArray[0] == "") {
                                            dataArray = dataArray.map(function(n) {
                                                return 0;
                                            });
                                        }
                                        $("#visits-today").text(dataArray[0]);
                                        $("#visits-month").text(dataArray[1]);
                                        $("#visits-year").text(dataArray[2]);
                                        $("#visits-total").text(dataArray[3]);
                                    }
                                });
                                clearInterval(loopPointer);
                            }
                        }, 1000);
                    </script>
                    <div class="container" style="margin-top: 10px;">
                        <div class="visit-chart">
                            <div>
                                <h4 id="visit-chart-text"><b>Daily Visiter Trend</b></h4>
                            </div>
                            <svg width="1100px" height="230px" id="visit-chart" class="visits-chart"></svg>
                        </div>
                        <!--<div class="users-chart-buttons" style="width: 218px; margin-top: 20px;">
                            <button id="dayButton" style="margin-top:2px"onclick="generateVisit(0)" type="button" class="btn btn-default"><h4>Day</h4></button>
                            <button id="monthButton" style="margin-top:2px"onclick="generateVisit(1)" type="button" class="btn btn-default"><h4>Month</h4></button>
                            <button id="yearButton" style="margin-top:2px"onclick="generateVisit(2)" type="button" class="btn btn-default"><h4>Year</h4></button>
                        </div>-->
                    </div>
                    <div class="container" style="margin-top: 10px;">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="skill-chart">
                                    <div>
                                        <h4 id="lang-prof-text"><b>Language Proficiency</b></h4>
                                    </div>
                                    <svg width="100%" height="100%" id="language-chart">
                                        <text id="langNum" x="0" y="0" font-family="sans-serif" font-size="12px" fill="blue"></text>
                                    </svg>
                                </div>  
                            </div>
                            <div class="col-sm-6">
                                <div class="skill-chart">
                                    <div>
                                        <h4 id="tool-prof-text"><b>Software/Tool Proficiency</b></h4>
                                    </div>
                                    <svg width="100%" height="100%" id="tool-chart">
                                        <text id="toolNum" x="0" y="0" font-family="sans-serif" font-size="12px" fill="red"></text>
                                    </svg>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <br>
                <footer class="footer-container"></footer>
                <script src="./common.js"></script>
                <script src="./index_quotes.js"></script>
                <script src="./index_visit_charts.js"></script>
                <script src="./index_charts.js"></script>
                <script src="./common_lang.js"></script>
                <script src="./index-translate.js"></script>
            </div>
        </div>
    </body>
</html>


