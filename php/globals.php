<?php
$TB_COUNT = "user_count";
$TB_DAY = "day_record";
$TB_MONTH = "month_record";
$TB_YEAR = "year_record";

$SQL_COUNT = "SELECT * FROM $TB_COUNT";
$SQL_RECENT_DAY = "SELECT * FROM $TB_DAY WHERE `id` = (SELECT max(id) FROM $TB_DAY)";
$SQL_RECENT_MONTH = "SELECT * FROM $TB_MONTH WHERE `id` = (SELECT max(id) FROM $TB_MONTH)";
$SQL_RECENT_YEAR = "SELECT * FROM $TB_YEAR WHERE `id` = (SELECT max(id) FROM $TB_YEAR)";

$USER_COUNTS = $CONN->query($SQL_COUNT);
$FIND_DAY = $CONN->query($SQL_RECENT_DAY);
$FIND_MONTH = $CONN->query($SQL_RECENT_MONTH);
$FIND_YEAR = $CONN->query($SQL_RECENT_YEAR);

$COUNT_ROW = mysqli_fetch_assoc($USER_COUNTS);
$DAY_ROW = mysqli_fetch_assoc($FIND_DAY);
$MONTH_ROW = mysqli_fetch_assoc($FIND_MONTH);
$YEAR_ROW = mysqli_fetch_assoc($FIND_YEAR);
?>