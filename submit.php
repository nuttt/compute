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
for($i = 1 ; $i <= 10 ; $i++) {
    $input = dbUtilGetInput($id, $i);
    $expected = dbUtilGetexpected($id, $i);
    if ( is_null($input) || is_null($expected) ) continue;

    $turing_obj = new Turing($states, $transitions, new Tape($input));
    $turing_obj->end();

    if ($turing_obj->getResult() == $expected) {
        // echo "$i Pass\n";
    }
    else {
        $result = array('id' => $id,
                        'input' => $input,
                        'expected' => $expected,
                        'actual' => $turing_obj->getActual(),
                        'status' => 'wrong'
                        );
        echo json_encode($result); 
        $passAll = false;
        break;
    }
}

if ($passAll) {
    $result = array('status' => 'right');
    echo json_encode($result); 
}

// $turing_obj = new Turing($states, $transitions, new Tape("xxx"));
// print_r($turing_obj);

