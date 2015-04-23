<?php

class TransitionsTest extends PHPUnit_Framework_TestCase {

    public function testAddTransition() {
        $transitions = new Transitions();
        $transitions->addTransition(1, '0', 2, '', 'R');
        $transitions->addTransition(2, '1', 3, '', 'R');
        $transitions->addTransition(1, '1', 4, '', 'R');

        $this->assertEquals(3, $transitions->getNumberOfTransitions());
    }

    public function testFind() {
        $transitions = new Transitions();
        $transitions->addTransition(1, '0', 2, '', 'R');
        $transitions->addTransition(2, '1', 3, '', 'R');
        $transitions->addTransition(1, '1', 4, '', 'R');

        $transition = $transitions->find(2, '1');
        if (is_null($transition)) {
            $this->fail('No transition');
        }
        else {
            $this->assertEquals(2, $transition["from"]);
            $this->assertEquals("1", $transition["input"]);
            $this->assertEquals(3, $transition["to"]);
            $this->assertEquals("", $transition["write"]);
            $this->assertEquals("R", $transition["direction"]);
        }

        $transition = $transitions->find(1, '0');
        if (is_null($transition)) {
            $this->fail('No transition');
        }
        else {
            $this->assertEquals(1, $transition["from"]);
            $this->assertEquals("0", $transition["input"]);
            $this->assertEquals(2, $transition["to"]);
            $this->assertEquals("", $transition["write"]);
            $this->assertEquals("R", $transition["direction"]);
        }
    }
}
