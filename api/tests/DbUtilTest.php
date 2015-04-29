<?php

class DbUtilTest extends PHPUnit_Framework_TestCase {

    public function testDbUtilGetInput() {
        $input2 = dbUtilGetInput(1, 2);
        $input5 = dbUtilGetInput(1, 5);
        $input10 = dbUtilGetInput(1, 10);

        $this->assertEquals("10", $input2);
        $this->assertEquals("01000000", $input5);
        $this->assertEquals("0101010110001111100001111", $input10);
    }

    public function testDbUtilGetExampleInput() {
        $input2 = dbUtilGetExampleInput(1, 2);
        $input4 = dbUtilGetExampleInput(1, 4);

        $this->assertEquals("10", $input2);
        $this->assertEquals("011111", $input4);
    }

    public function testDbUtilGetExpected() {
        $expected2 = dbUtilGetExpected(1, 2);
        $expected5 = dbUtilGetExpected(1, 5);
        $expected10 = dbUtilGetExpected(1, 10);

        $this->assertEquals("rejected", $expected2);
        $this->assertEquals("rejected", $expected5);
        $this->assertEquals("accepted", $expected10);
    }

    public function testDbUtilGetExampleExpected() {
        $expected2 = dbUtilGetExampleExpected(1, 2);
        $expected4 = dbUtilGetExampleExpected(1, 4);

        $this->assertEquals("rejected", $expected2);
        $this->assertEquals("accepted", $expected4);
    }

    public function testDbUtilGetCountTestcases() {
        $count = dbUtilGetCountTestcases(1);
        $this->assertEquals("10", $count);

        $count = dbUtilGetCountTestcases(2);
        $this->assertEquals("9", $count);
    }
}
