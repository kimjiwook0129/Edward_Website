<?php
include("php/config.php");
include("php/globals.php");

if (!$CONN->connect_error) { // when database is connected
    
    $counts = array($COUNT_ROW['day_count'], $COUNT_ROW['month_count'], $COUNT_ROW['year_count'],$COUNT_ROW['total_count']);
    for ($x = 0; $x < 4; $x++) ++$counts[$x]; // $counts contains updated values

    $_ids = array($DAY_ROW['id'],$MONTH_ROW['id'],$YEAR_ROW['id']);

    // Updating counts in the last row of each record for day, month, year
    $CONN->query("UPDATE $TB_DAY SET `count` = $counts[0] WHERE `id` = $_ids[0]");
    $CONN->query("UPDATE $TB_MONTH SET `count` = $counts[1] WHERE `id` = $_ids[1]");
    $CONN->query("UPDATE $TB_YEAR SET `count` = $counts[2] WHERE `id` = $_ids[2]");

    // Updating the realtime values for day, month, year, total
    $CONN->query("UPDATE $TB_COUNT SET `total_count` = $counts[3], `day_count` = $counts[0], `month_count` = $counts[1], `year_count` = $counts[2]");
    echo "{$counts[0]}.{$counts[1]}.{$counts[2]}.{$counts[3]}";
}

?>