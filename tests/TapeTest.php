<?php

class TapeTest extends PHPUnit_Framework_TestCase {
    public function testOverall() {
        $tape = new Tape("000111000");
        $tape->goRight();
        $tape->replace('a');
        $tape->goRight();
        $tape->replace('b');
        $tape->goRight();
        $tape->replace('c');
        $tape->goRight();
        $tape->replace('d');
        $tape->goRight();
        $tape->replace('e');
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->replace('x');
        $tape->goLeft();
        $tape->goLeft();
        $tape->replace('f');

        $this->assertEquals("abcdef0x0", $tape->toString());
        $this->assertEquals(5, $tape->getPosition());
        $this->assertEquals("f", $tape->getContent());
        $this->assertEquals("c", $tape->getContent(2));
    }

    public function testCanGoLeft() {
        $tape = new Tape("010");
        $tape->goLeft();

        $this->assertEquals("010", $tape->toString());
        $this->assertEquals(-2, $tape->getPosition());
    }

    public function testFillBlankLeft() {
        $tape = new Tape("010");
        $tape->goLeft();
        $tape->goLeft();
        $tape->replace('x');

        $this->assertEquals("x  010", $tape->toString());
        $this->assertEquals(0, $tape->getPosition());
    }

    public function testFillBlankRight() {
        $tape = new Tape("010");
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->replace('x');
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->replace('y');

        $this->assertEquals("010x  y", $tape->toString());
        $this->assertEquals(6, $tape->getPosition());
    }

    public function testFillBlank() {
        $tape = new Tape("010");
        $tape->goLeft();
        $tape->replace('x');
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->goRight();
        $tape->replace('y');

        $this->assertEquals("x 010  y", $tape->toString());
        $this->assertEquals(7, $tape->getPosition());
    }
}
