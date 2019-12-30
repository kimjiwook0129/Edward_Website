<?php
$_DBACCESS_FILE = file_get_contents("dbaccess.json");
$_DB_JSON = json_decode($_DBACCESS_FILE, true);
define('_DB_HOSTNAME', $_DB_JSON['hostname']); // Hostname
define('_DB_USERNAME', $_DB_JSON['username']); // Username
define('_DB_PASSWORD', $_DB_JSON['password']); // Password
define('_DB_DATABASE', $_DB_JSON['database']); // Database

// GLOBALS
$CONN = new mysqli(_DB_HOSTNAME,_DB_USERNAME,_DB_PASSWORD,_DB_DATABASE); // CONNECTION

$TB_COUNT = "user_count"; // tables in the database
$TB_DAY = "day_record";
$TB_MONTH = "month_record";
$TB_YEAR = "year_record";
?>