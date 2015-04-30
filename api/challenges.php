<?php

require_once("autoload.php");

$return = null;
if (isset($_GET["id"])) {
    $return = getChallengeId(intval($_GET["id"]));
}
else {
    $return = getChallenges();
}

echo json_encode($return);
