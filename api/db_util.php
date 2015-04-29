<?php

require_once("db_credential.php");

function dbUtil_table_exists($tableName) {
    $db = dbUtil_connect();
    if (is_null($db)) return false;
    $q = "SHOW TABLES LIKE '$tableName'";
    $r = mysqli_query($db,$q);
    return mysqli_num_rows($r) > 0;
}

// function dbUtil_drop_table($tableName) {
//     $db = dbUtil_connect();
//     if (is_null($db)) return false;
//     $q = "DROP TABLE $tableName";
//     return mysqli_query($db,$q);
// }

function _getInputFromTable($table, $challengeId, $testnum) {
    $db = dbUtil_connect();
    if (is_null($db)) return false;
    $q = "SELECT input FROM $table
            WHERE challenge_id=$challengeId and testnum=$testnum";

    $input = null;
    if ($result = mysqli_query($db, $q)) {
        while($row = $result->fetch_assoc()) {
            $input = $row["input"];
            break;
        }
    }
    return $input;
}

function dbUtilGetExampleInput($challengeId, $testNum) {
    return _getInputFromTable("compute_example_testcases", $challengeId, $testNum);
}

function dbUtilGetInput($challengeId, $testNum) {
    return _getInputFromTable("compute_testcases", $challengeId, $testNum);
}

function _getExpectedFromTable($table, $challengeId, $testnum) {
    $db = dbUtil_connect();
    if (is_null($db)) return false;
    $q = "SELECT expected FROM $table
            WHERE challenge_id=$challengeId and testnum=$testnum";

    $expected = null;
    if ($result = mysqli_query($db, $q)) {
        while($row = $result->fetch_assoc()) {
            $expected = $row["expected"];
            break;
        }
    }
    return $expected;
}

function dbUtilGetExampleExpected($challengeId, $testNum) {
    return _getExpectedFromTable("compute_example_testcases", $challengeId, $testNum);
}

function dbUtilGetExpected($challengeId, $testNum) {
    return _getExpectedFromTable("compute_testcases", $challengeId, $testNum);
}

function dbUtilGetOutputType($challengeId) {
    $db = dbUtil_connect();
    if (is_null($db)) return false;
    $q = "SELECT output FROM compute_challenges
            WHERE id=$challengeId";

    $output = null;
    if ($result = mysqli_query($db, $q)) {
        while($row = $result->fetch_assoc()) {
            $output = $row["output"];
            break;
        }
    }
    return $output;
}

function dbUtilGetCountTestcases($challengeId) {
    $db = dbUtil_connect();
    if (is_null($db)) return false;
    $q = "SELECT count(expected) FROM compute_testcases
            WHERE challenge_id=$challengeId";

    $count = null;
    if ($result = mysqli_query($db, $q)) {
        while($row = $result->fetch_assoc()) {
            $count = $row["count(expected)"];
            break;
        }
    }
    return $count;
}

?>