<?php

require_once('autoload.php');

$id = $_POST['id'];
$turing_decode = $_POST['turing'];

// $turing_decode = json_decode($turing_json, true);

// Create State and transition
$states = new StateCollection();
if (array_key_exists('states', $turing_decode)) {
    foreach($turing_decode["states"] as $state) {
        $states->addState($state["id"], $state["type"]);
    }
}

$transitions = new TransitionCollection();
if (array_key_exists('transitions', $turing_decode)) {
    foreach($turing_decode["transitions"] as $t) {    
        $transitions->addTransition($t["from"], $t["input"], $t["to"], $t["write"], $t["direction"]);
    }
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

    if ($OutputType == "yesno") {
        if ($turing_obj->getResult() != $expected) { // accepted or rejected
            $return = array('id' => $id,
                            'input' => $input,
                            'expected' => $expected,
                            'actual' => $turing_obj->getActualState(),
                            'status' => 'wrong'
                            );
            echo json_encode($return); 
            $passAll = false;
            break;
        }
    }
    else {      // OutputType - tape
        $actual = trim($turing_obj->getTape()->toString());
        $message = null;
        if ($turing_obj->getTape()->getPosition() != -1) {
            $message = "Tape pointer must be before the leftmost of content";
        }
        if ($actual != $expected) {
            $message = "Wrong answer";
        }
        if (!is_null($message)) {
            $return = array('id' => $id,
                            'input' => $input,
                            'expected' => $expected,
                            'actual' => $actual,
                            'status' => 'wrong',
                            'message' => $message
                            );
            echo json_encode($return); 
            $passAll = false;
            break;
        }
    }

}

if ($passAll) {
    $return = array('status' => 'right');
    echo json_encode($return); 
}

// $turing_obj = new Turing($states, $transitions, new Tape("xxx"));
// print_r($turing_obj);

