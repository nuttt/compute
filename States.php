<?php

class States {
    private $states;

    public function __construct() {
        $this->states = [];
    }

    public function addState($id, $type) {
        $this->states[] = new State($id, $type);
    }

    public function find($id) {
        foreach($this->states as $state) {
            if ($state->getID() == $id) {
                return $state;
            }
        }
        return NULL;
    }

    public function findStartState() {
        foreach($this->states as $state) {
            if ($state->getType() == "start") {
                return $state;
            }
        }
        return NULL;
    }

    public function getNumberOfStates() {
        return count($this->states);
    }
}

class State {
    private $id;
    private $type;

    public function __construct($id, $type) {
        $this->id = $id;
        $this->type = $type;
    }

    public function getID() {
        return $this->id;
    }

    public function getType() {
        return $this->type;
    }
}
