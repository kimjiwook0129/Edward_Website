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
    $find_counts = $conn->query($sql_count);
    $count_row = mysqli_fetch_assoc($find_counts);

    $counts = array($count_row['day_count'], $count_row['month_count'], $count_row['year_count'],$count_row['total_count']);
    for ($x = 0; $x < 4; $x++) ++$counts[$x]; // $counts contains updated values

    $sql_recent_day = "SELECT * FROM $tb_day WHERE `id` = (SELECT max(id) FROM $tb_day)"; // last row only (most recent)
    $sql_recent_month = "SELECT * FROM $tb_month WHERE `id` = (SELECT max(id) FROM $tb_month)";
    $sql_recent_year = "SELECT * FROM $tb_year WHERE `id` = (SELECT max(id) FROM $tb_year)";

    $find_day = $conn->query($sql_recent_day);
    $find_month = $conn->query($sql_recent_month);
    $find_year = $conn->query($sql_recent_year);

    $day_row = mysqli_fetch_assoc($find_day);
    $month_row = mysqli_fetch_assoc($find_month);
    $year_row = mysqli_fetch_assoc($find_year);

    $day_id_store = $day_row['id'];
    $month_id_store = $month_row['id'];
    $year_id_store = $year_row['id'];

    // Updating counts in the last row of each record for day, month, year
    $conn->query("UPDATE $tb_day SET `count` = $counts[0] WHERE `id` = $day_id_store");
    $conn->query("UPDATE $tb_month SET `count` = $counts[1] WHERE `id` = $month_id_store");
    $conn->query("UPDATE $tb_year SET `count` = $counts[2] WHERE `id` = $year_id_store");

    // Updating the realtime values for day, month, year, total
    $conn->query("UPDATE $tb_count SET `total_count` = $counts[3], `day_count` = $counts[0], `month_count` = $counts[1], `year_count` = $counts[2]");
}
echo "{$counts[0]}.{$counts[1]}.{$counts[2]}.{$counts[3]}";
?>