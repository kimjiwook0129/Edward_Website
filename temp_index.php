<?php

$json_file = 'json/counts.json';

    function json_build($contents, $scale) {
        $contents = "{\"counts_day\": {";
        $last_row = $conn->query($sql_recent_day);
        if ($scale == "month") {
            $contents .= "}, \"counts_month\": {";
            $last_row = $conn->query($sql_recent_month);
        } else if ($scale == "year") {
            $contents .= "}, \"counts_year\": {";
            $last_row = $conn->query($sql_recent_year);
        }
        $rows_length = mysqli_fetch_assoc($last_row);
        $_length = $rows_length['id'];
        for ($x = 1; $x <= $_length; $x++) {
            $sql_ = "SELECT * FROM $tb_day WHERE `id` = $x";
            if ($scale == "month") {
                $sql_ = "SELECT * FROM $tb_month WHERE `id` = $x";
            } else if ($scale == "year") {
                $sql_ = "SELECT * FROM $tb_year WHERE `id` = $x";
            }
            $find_ = $conn->query($sql_);
            $_row = mysqli_fetch_assoc($find_);
            $contents .= "\"{$_row['date']}\": {$_row['count']}";
            if ($x < $_length) $contents .= ",";
        }
        return $contents;
    }

    $json_contents = json_build($json_contents, "day");
    $json_contents = json_build($json_contents, "month");
    $json_contents = json_build($json_contents, "year");
    
    $json_contents .= "}}";
    
?>