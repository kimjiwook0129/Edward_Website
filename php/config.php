<?php
error_reporting(0); // removes all PHP errors (localhost: no access to database)

$servernameFile = fopen("config_data/servername.txt", "r");
$SERVER = fread($servernameFile, filesize("config_data/servername.txt"));
fclose($servernameFile);

$databaseFile = fopen("config_data/database.txt", "r");
$DATABASE = fread($databaseFile, filesize("config_data/database.txt"));
fclose($databaseFile);

$usernameFile = fopen("config_data/username.txt", "r");
$USERNAME = fread($usernameFile, filesize("config_data/username.txt"));
fclose($usernameFile);

$passwordFile = fopen("config_data/password.txt", "r");
$PASSWORD = fread($passwordFile,filesize("config_data/password.txt"));
fclose($passwordFile);

$tb_count = "user_count"; // tables in the database
$tb_day = "day_record";
$tb_month = "month_record";
$tb_year = "year_record";
?>