<?php

require_once('autoload.php');

class Turing {
    private $states;
    private $transitions;
    private $tape;
    private $currentState;
    private $terminate;
    const maxNumberIteration = 50000;

    public function __construct($states, $transitions, $tape) {
        $this->states = $states;
        $this->tape = $tape;
        $this->transitions = $transitions;

        $this->currentState = $this->states->findStartState();

        $this->terminate = FALSE;
    }

    public function next() {
        if ($this->currentState->getType() == "accepted" ||
            $this->currentState->getType() == "rejected" ||
            $this->terminate == TRUE) {
            return;
        }

        $transition = $this->transitions->find($this->currentState->getID(), 
            $this->tape->getContent());

        if (is_null($transition)) {
            // No transition -> Rejected (Halt)
            $this->terminate = TRUE;
        }
        else {
            // TODO: Is it necessary to check no state? It's impossible.
            $this->currentState = $this->states->find($transition["to"]);

            if ($transition["write"] != '') {
                $this->tape->replace($transition["write"]);
            }

            if ($transition["direction"] == "L") {
                $this->tape->goLeft();
            }
            else if ($transition["direction"] == "R") {
                $this->tape->goRight();
            }
        }
    }

    public function end() {
        $cnt = 0;
        while($this->currentState->getType() != "accepted" &&
              $this->currentState->getType() != "rejected" && 
              $this->terminate == FALSE &&
              $cnt < self::maxNumberIteration) {
            $this->next();
            $cnt += 1;
        }
    }

    public function checkDeterministic() {

    }

    public function getStates() {
        return $this->states;
    }

    public function getTransitions() {
        return $this->transitions;
    }

    public function getTape() {
        return $this->tape;
    }

    public function getCurrentState() {
        return $this->currentState;
    }
}
