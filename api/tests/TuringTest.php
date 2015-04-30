<?php

class TuringTest extends PHPUnit_Framework_TestCase {
    public function testOverall() {
        $states = new StateCollection();
        $states->addState(0, "start");
        $states->addState(1, "state");
        $states->addState(2, "state");
        $states->addState(3, "accepted");
        $states->addState(4, "rejected");

        $transitions = new TransitionCollection();
        $transitions->addTransition(0, ' ', 1, '', 'R');
        $transitions->addTransition(1, '0', 2, '', 'R');
        $transitions->addTransition(2, '1', 3, '', 'S');
        $transitions->addTransition(1, '1', 4, '', 'R');

        $tape1 = new Tape("0111");
        $tape2 = new Tape("1000");

        $turing1 = new Turing($states, $transitions, clone $tape1); // go to 3
        $turing2 = new Turing($states, $transitions, clone $tape2); // go to 4

        $turing1->next();
        $this->assertEquals("state", $turing1->getActualState());
        $turing1->next();
        $turing1->next();
        $this->assertEquals("accepted", $turing1->getActualState());

        $turing2->end();
        $this->assertEquals("rejected", $turing2->getActualState());

        // loop forever
        $transitions2 = new TransitionCollection();
        $transitions2->addTransition(0, ' ', 1, '', 'R');
        $transitions2->addTransition(1, '0', 2, '', 'R');
        $transitions2->addTransition(2, '1', 2, '', 'S');
        $transitions2->addTransition(1, '1', 4, '', 'R');

        $turing3 = new Turing($states, $transitions, clone $tape1); // go to 3
        $turing3->end();
        $this->assertEquals("accepted", $turing3->getActualState());
    }

    public function testNoStartMachine() {
        $states = new StateCollection();
        $states->addState(2, "state");
        $states->addState(3, "accepted");

        $transitions = new TransitionCollection();
        $transitions->addTransition(2, '0', 1, 'x', 'L');
        $transitions->addTransition(3, '0', 1, 'x', 'L');

        $tape1 = new Tape("01");

        $turing1 = new Turing($states, $transitions, clone $tape1);
        $turing1->end();
        $this->assertEquals("No state", $turing1->getActualState());
    }

    public function testWrongMachine() {
        $states = new StateCollection();
        $states->addState(1, "start");
        $states->addState(2, "state");
        $states->addState(3, "accepted");

        $transitions = new TransitionCollection();
        $transitions->addTransition(2, '0', 1, 'x', 'L');
        $transitions->addTransition(3, '0', 1, 'x', 'L');

        $tape1 = new Tape("01");

        $turing1 = new Turing($states, $transitions, clone $tape1);
        $turing1->end();
        $this->assertEquals("start", $turing1->getActualState());
    }

    // Start with 0, end with 1
    public function test01() {
        $states = new StateCollection();
        $states->addState(0, "start");
        $states->addState(1, "state");
        $states->addState(2, "state");
        $states->addState(3, "accepted");

        $transitions = new TransitionCollection();
        $transitions->addTransition(0, ' ', 1, '', 'R');
        $transitions->addTransition(1, '0', 2, '', 'R');
        $transitions->addTransition(2, '0', 2, '', 'R');
        $transitions->addTransition(2, '1', 3, '', 'R');
        $transitions->addTransition(3, '1', 3, '', 'R');
        $transitions->addTransition(3, '0', 2, '', 'R');
        $transitions->addTransition(1, '0', 4, '', 'R');
        $transitions->addTransition(4, '0', 4, '', 'R');
        $transitions->addTransition(4, '1', 4, '', 'R');

        $tape1 = new Tape("0010100000001");

        $turing1 = new Turing($states, $transitions, clone $tape1);
        $turing1->end();
        $this->assertEquals("accepted", $turing1->getResult());

        $tape2 = new Tape("1111100001");
        $turing1 = new Turing($states, $transitions, clone $tape2);
        $this->assertEquals("rejected", $turing1->getResult());
    }
}
