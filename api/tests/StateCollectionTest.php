<?php

class StateCollectionTest extends PHPUnit_Framework_TestCase {

    public function testAddState() {
        $states = new StateCollection();
        $states->addState(1, "start");
        $states->addState(2, "state");
        $states->addState(3, "accepted");
        $states->addState(4, "rejected");

        $this->assertEquals(4, $states->getNumberOfStates());
    }

    public function testFind() {
        $states = new StateCollection();
        $states->addState(2, "state");
        $states->addState(3, "accepted");
        $states->addState(11, "start");
        $states->addState(4, "rejected");

        $startState = $states->find(3);

        if (is_null($startState)) {
            $this->fail('No state');
        }
        else {
            $this->assertEquals("accepted", $startState->getType());
            $this->assertEquals(3, $startState->getID());
        }
    }

    public function testFindStartState() {
        $states = new StateCollection();
        $states->addState(2, "state");
        $states->addState(3, "accepted");
        $states->addState(11, "start");
        $states->addState(4, "rejected");

        $startState = $states->findStartState();

        if (is_null($startState)) {
            $this->fail('No start state');
        }
        else {
            $this->assertEquals("start", $startState->getType());
            $this->assertEquals(11, $startState->getID());
        }
    }
}
