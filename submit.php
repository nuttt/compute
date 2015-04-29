<?php

require_once('api/autoload.php');

$id = $_POST['id'];
$turing_json = $_POST['turing'];

$turing_decode = json_decode($turing_json, true);

// Create State and transition
$states = new StateCollection();
foreach($turing_decode["states"] as $state) {
    $states->addState($state["id"], $state["type"]);
}

$transitions = new TransitionCollection();
foreach($turing_decode["transitions"] as $t) {    
    $transitions->addTransition($t["from"], $t["input"], $t["to"], $t["write"], $t["direction"]);
}

$passAll = true;
$OutputType = dbUtilGetOutputType($id);
$totalTestcases = dbUtilGetCountTestcases($id);
for($i = 1 ; $i <= $totalTestcases ; $i++) {
    $input = dbUtilGetInput($id, $i);
    $expected = dbUtilGetExpected($id, $i);
    if ( is_null($input) || is_null($expected) ) continue;

    $turing_obj = new Turing($states, $transitions, new Tape($input));
    $turing_obj->end();

    $result = null;
    $actual = null;
    if ($OutputType == "yesno") {
        $result = $turing_obj->getResult();     // accepted or rejected
        $actual = $turing_obj->getActual();     // get really state
    }
    else {      // OutputType - tape
        $result = trim($turing_obj->getTape()->toString());
        $actual = trim($turing_obj->getTape()->toString());
    }

    if ($result != $expected) {
        $return = array('id' => $id,
                        'input' => $input,
                        'expected' => $expected,
                        'actual' => $actual,
                        'status' => 'wrong'
                        );
        echo json_encode($return); 
        $passAll = false;
        break;
    }
}

if ($passAll) {
    $return = array('status' => 'right');
    echo json_encode($return); 
}

// $turing_obj = new Turing($states, $transitions, new Tape("xxx"));
// print_r($turing_obj);

