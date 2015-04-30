<?php

require_once('autoload.php');

class Turing {
    private $states;
    private $transitions;
    private $tape;
    private $currentState;
    private $terminate;
    private $loop;
    const maxNumberIteration = 50000;

    public function __construct($states, $transitions, $tape) {
        $this->states = $states;
        $this->tape = $tape;
        $this->transitions = $transitions;

        $this->currentState = $this->states->findStartState();

        $this->terminate = FALSE;
        $this->loop = FALSE;
    }

    public function next() {
        if ($this->currentState === NULL) return;
        if ($this->currentState->getType() == "halt" ||
            $this->currentState->getType() == "accepted" ||
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
        if ($this->currentState === NULL) return;
        $cnt = 0;
        while($this->currentState->getType() != "halt" &&
              $this->currentState->getType() != "accepted" && 
              $this->currentState->getType() != "rejected" && 
              $this->terminate == FALSE &&
              $cnt < self::maxNumberIteration) {
            $this->next();
            $cnt += 1;
        }
        if ($cnt == self::maxNumberIteration) {
            $this->loop = true;
        }
    }

    public function checkValid() {

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

    public function getResult() {
        if ($this->currentState === null) return "rejected";
        if ($this->currentState->getType() == "accepted") {
            return "accepted";
        }
        else {
            return "rejected";
        }
    }

    public function getActualState() {
        if ($this->loop) {
            return "loop";
        }
        if ($this->currentState === null) return "No state";
        return $this->currentState->getType();
    }
}
