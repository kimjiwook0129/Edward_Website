<?php
include("php/config.php");
include("php/globals.php");

if (!$CONN->connect_error) { // when database is connected
    $_PAST_DATE = $COUNT_ROW['last_date'];
    $_PRESENT_DATE = date("Y-m-d"); // ex. '2019-07-04' = July 4, 2019
    $_PAST_YEAR = substr($_PAST_DATE, 0, 4); // type: string
    $_PRESENT_YEAR = substr($_PRESENT_DATE, 0, 4);
    $_PAST_MONTH = substr($_PAST_DATE, 5, -3);
    $_PRESENT_MONTH = substr($_PRESENT_DATE, 5, -3);
    
    $day_id_store = $DAY_ROW['id'];
    $month_id_store = $MONTH_ROW['id'];
    $year_id_store = $YEAR_ROW['id'];

    if ($_PRESENT_DATE != $_PAST_DATE) { // only when present and past dates are different
        ++$day_id_store;
        $CONN->query("INSERT INTO $TB_DAY(`id`, `date`, `count`) VALUES ($day_id_store,'{$_PRESENT_DATE}',0)");
        $COUNT_ROW['day_count'] = 0;
        $CONN->query("UPDATE $TB_COUNT SET `day_count` = 0");
        if ($past_year != $_PRESENT_YEAR) {
            ++$year_id_store;
            $date_modifier = $_PRESENT_YEAR."-01-01";
            $CONN->query("INSERT INTO $TB_YEAR(`id`, `date`, `count`) VALUES ($year_id_store,'{$date_modifier}',0)");
            $COUNT_ROW['year_count'] = 0;
            $CONN->query("UPDATE $TB_COUNT SET `year_count` = 0");
        } 
        if ($_PAST_MONTH != $_PRESENT_MONTH || $past_year != $_PRESENT_YEAR) {
            ++$month_id_store;
            $date_modifier = $_PRESENT_YEAR."-".$_PRESENT_MONTH."-01";
            $CONN->query("INSERT INTO $TB_MONTH(`id`, `date`, `count`) VALUES ($month_id_store,'{$date_modifier}',0)");
            $COUNT_ROW['month_count'] = 0;
            $CONN->query("UPDATE $TB_COUNT SET `month_count` = 0");
        }
        $CONN->query("UPDATE $TB_COUNT SET `last_date` = '{$_PRESENT_DATE}'");
    }
        
    $counts = array($COUNT_ROW['day_count'], $COUNT_ROW['month_count'], $COUNT_ROW['year_count'],$COUNT_ROW['total_count']);

    include("php/functions/generateChartJson.php");
    $jsonContents = generateJsonContents($CONN, $day_id_store,$month_id_store, $year_id_store, $TB_DAY, $TB_MONTH, $TB_YEAR);
    file_put_contents('json/counts.json', $jsonContents); // sql database to json
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
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="icon" href="images/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="css/common.css">
        <link rel="stylesheet" href="css/index.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js"></script>
        <script src="https://d3js.org/d3.v5.min.js"></script>
    </head>
    <body id="particle_background">
        <div class="page-container">
            <div class="navbar-blank" style="height:50px"></div>
            <nav class="navbar navbar-fixed-top" id="navbar"></nav>
            <div class="below-nav-container">
                <div class="main-contents" style="margin-top:20px; z-index:100">
                    <div id="profile" class="row container" style="margin: 0 auto">
                        <div class="col-sm-4">
                            <div class="image-container">
                                <img id="my-face" class="image-itself" src="./images/faces/face_1.jpg" alt="Edward Jiwook Kim" style="width:100%">
                            </div>
                            <div class="image-credit">
                                <p id="reference">© 2019 Edward Jiwook Kim</p>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <h4 id="myName"></h4>
                            <ul id="summary"></ul>
                        </div>
                    </div>
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
                                        <div class="credit-box" style="display:none; font-size:12px">Icons made by
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
                                        <div class="credit-box" style="display:none; font-size:12px">Icons made by
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
                                        <div class="credit-box" style="display:none; font-size:12px">Icons made by
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
                                        <div class="credit-box" style="display:none; font-size:12px">Icons made by
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
                    <script src="js/functions/labelnum.js"></script>
                    <script src="js/functions/path.js"></script>
                    <script>
                        var array_visits = [<?php echo "{$counts[0]}"?>,
                                            <?php echo "{$counts[1]}"?>,
                                            <?php echo "{$counts[2]}"?>,
                                            <?php echo "{$counts[3]}"?>];
                    
                        array_visits = array_visits.map(function(n) {
                            return labelNum(n);
                        });
                        
                        $("#visits-today").text(array_visits[0]);
                        $("#visits-month").text(array_visits[1]);
                        $("#visits-year").text(array_visits[2]);
                        $("#visits-total").text(array_visits[3]);

                        const t0 = performance.now();
                        var t1;
                        var loopPointer = setInterval(function() {
                            t1 = performance.now();
                            if (t1 - t0 >= 3000) { // Updates the count when user online for at least 3 seconds
                                $.ajax({
                                    url: 'index_count_update.php',
                                    success: function(data) {
                                        var dataArray = data.split(".");
                                        dataArray = dataArray.map(function(n) {
                                            return labelNum(n);
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
                <script src="./profile.js"></script>
                <script src="./index_quotes.js"></script>
                <script src="./index_visit_charts.js"></script>
                <script src="./index_charts.js"></script>
                <script src="./common_lang.js"></script>
                <script src="./index-translate.js"></script>
            </div>
        </div>
    </body>
</html>
