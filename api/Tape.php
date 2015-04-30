<?php

class Tape {
    private $tape;
    private $position;

    public function reset($inputTape = "") {
        $inputTapeLength = strlen( $inputTape );
        $this->tape = [];
        for( $i = 0; $i < $inputTapeLength; $i++ ) {
            $this->tape[] = substr( $inputTape, $i, 1 );
        }
        $this->position = -1;
    }

    public function __construct($inputTape) {
        $this->reset($inputTape);
    }

    public function fillBlankRight($until) {
        for($i = count($this->tape) ; $i < $until ; $i++) {
            $this->tape[$i] = ' ';
        }
    }

    public function fillBlankLeft($until) {
        $temp_array = [];
        for($i = -1; $i >= $until ; $i--) {
            $temp_array[] = ' ';
        }
        $teemp = array_merge($temp_array, $this->tape);
        $this->tape = $teemp;
        $this->position = 0;
    }

    public function replace($newStr) {
        if ($this->position >= count($this->tape)) {
            $this->fillBlankRight($this->position);
        }
        else if ($this->position < 0) {
            $this->fillBlankLeft($this->position);
        }
        $this->tape[$this->position] = $newStr;
    }

    public function goLeft() {
        $this->position -= 1;
    }

    public function goRight() {
        $this->position++;
    }

    public function getTapeContent() {
        return $this->tape;
    }

    public function getPosition() {
        $cnt = 0;
        for($i = 0 ; $i < count($this->tape) ; $i++) {
            if ($this->tape[$i] == ' ') {
                unset($this->tape[$i]);
                $cnt++;
            }
            else {
                break;
            }
        }
        $this->position -= $cnt;
        return $this->position;
    }

    public function getContent($pos = NULL) {
        if (is_null($pos)) {
            $pos = $this->position;
        }
        if ($pos < 0 || $pos >= count($this->tape)) {
            return ' ';
        }
        return $this->tape[$pos];
    }

    public function toString() {
        return join("", $this->tape);
    }
}

// $a = new Tape("001101010");
// $a->goLeft();
// $a->goRight();
// $a->goRight();
// $a->replace('y');

// print $a->getPosition();

