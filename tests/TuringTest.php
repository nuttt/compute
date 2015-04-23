<?php

class TuringTest extends PHPUnit_Framework_TestCase {
    public function testOverall() {
        $states = new States();
        $states->addState(0, "start");
        $states->addState(1, "state");
        $states->addState(2, "state");
        $states->addState(3, "accepted");
        $states->addState(4, "rejected");

        $transitions = new Transitions();
        $transitions->addTransition(0, ' ', 1, '', 'R');
        $transitions->addTransition(1, '0', 2, '', 'R');
        $transitions->addTransition(2, '1', 3, '', 'S');
        $transitions->addTransition(1, '1', 4, '', 'R');

        $tape1 = new Tape("0111");
        $tape2 = new Tape("1000");

        $turing1 = new Turing($states, $transitions, clone $tape1); // go to 3
        $turing2 = new Turing($states, $transitions, clone $tape2); // go to 4

        $turing1->next();
        $this->assertEquals("state", $turing1->getCurrentState()->getType());
        $turing1->next();
        $turing1->next();
        $this->assertEquals("accepted", $turing1->getCurrentState()->getType());

        $turing2->end();
        $this->assertEquals("rejected", $turing2->getCurrentState()->getType());

        // loop forever
        $transitions2 = new Transitions();
        $transitions2->addTransition(0, ' ', 1, '', 'R');
        $transitions2->addTransition(1, '0', 2, '', 'R');
        $transitions2->addTransition(2, '1', 2, '', 'S');
        $transitions2->addTransition(1, '1', 4, '', 'R');

        $turing3 = new Turing($states, $transitions, clone $tape1); // go to 3
        $turing3->end();
        $this->assertEquals("accepted", $turing3->getCurrentState()->getType());
    }
}
