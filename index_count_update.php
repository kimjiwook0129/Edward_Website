<?php
include("php/config.php");

if (!$CONN->connect_error) { // when database is connected
    $sql_count = "SELECT * FROM $TB_COUNT";
    $find_counts = $CONN->query($sql_count);
    $count_row = mysqli_fetch_assoc($find_counts);

    $counts = array($count_row['day_count'], $count_row['month_count'], $count_row['year_count'],$count_row['total_count']);
    for ($x = 0; $x < 4; $x++) ++$counts[$x]; // $counts contains updated values

    $sql_recent_day = "SELECT * FROM $TB_DAY WHERE `id` = (SELECT max(id) FROM $TB_DAY)"; // last row only (most recent)
    $sql_recent_month = "SELECT * FROM $TB_MONTH WHERE `id` = (SELECT max(id) FROM $TB_MONTH)";
    $sql_recent_year = "SELECT * FROM $TB_YEAR WHERE `id` = (SELECT max(id) FROM $TB_YEAR)";

    $find_day = $CONN->query($sql_recent_day);
    $find_month = $CONN->query($sql_recent_month);
    $find_year = $CONN->query($sql_recent_year);

    $day_row = mysqli_fetch_assoc($find_day);
    $month_row = mysqli_fetch_assoc($find_month);
    $year_row = mysqli_fetch_assoc($find_year);

    $day_id = $day_row['id'];
    $month_id = $month_row['id'];
    $year_id = $year_row['id'];

    // Updating counts in the last row of each record for day, month, year
    $CONN->query("UPDATE $TB_DAY SET `count` = $counts[0] WHERE `id` = $day_id");
    $CONN->query("UPDATE $TB_MONTH SET `count` = $counts[1] WHERE `id` = $month_id");
    $CONN->query("UPDATE $TB_YEAR SET `count` = $counts[2] WHERE `id` = $year_id");

    // Updating the realtime values for day, month, year, total
    $CONN->query("UPDATE $TB_COUNT SET `total_count` = $counts[3], `day_count` = $counts[0], `month_count` = $counts[1], `year_count` = $counts[2]");
}
echo "{$counts[0]}.{$counts[1]}.{$counts[2]}.{$counts[3]}";
?>