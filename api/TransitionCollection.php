<?php

class TransitionCollection {
    private $transitions;

    public function __construct() {
        $this->transitions = [];
    }

    public function addTransition($from, $input, $to, $write, $direction) {
        $this->transitions[] = [
                                "from" => $from,
                                "input" => $input,
                                "to" => $to,
                                "write" => $write,
                                "direction" => $direction
                            ];
    }

    public function getTransitions() {
        return $this->transitions;
    }

    public function find($from, $input) {
        foreach($this->transitions as $transition) {
            if ($transition["from"] == $from && 
                $transition["input"] == $input) {
                return $transition;
            }
        }
        return NULL;
    }

    public function getNumberOfTransitions() {
        return count($this->transitions);
    }

}
