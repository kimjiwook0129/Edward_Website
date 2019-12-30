<?php
function generateJsonContents($_conn, $_maxDayID, $_maxMonthID, $_maxYearID, $_tbDay, $_tbMonth, $_tbYear) {

    $_tables = [$_tbDay, $_tbMonth, $_tbYear];

    $_json = "{\"counts_day\": {";

    foreach($_tables as $table) {
        $_len = $_maxDayID;
        if ($table == $_tbMonth) {
            $_json .= "}, \"counts_month\": {";
            $_len = $_maxMonthID;
        } else if ($table == $_tbYear) {
            $_json .= "}, \"counts_year\": {";
            $_len = $_maxYearID;
        }
        for ($x = 1; $x <= $_len; $x++) {
            $_sql = "SELECT * FROM $table WHERE `id` = $x";
            $_row = $_conn->query($_sql);
            $_assoc = mysqli_fetch_assoc($_row);
            $_json .= "\"{$_assoc['date']}\": {$_assoc['count']}";
            if ($x < $_len) $_json .= ",";
        }
    }
    $_json .= "}}";
    return $_json;
}
?>