const assert = require('assert');
const {MoveCarret, InitializeCarret} = require('../src/carret');
const document = {};


describe('Carret', function() {
  describe('left \'h\' and right \'l\' keys', function() {
    it('[h] doesnt change position if prev character is \\n character', function() {
      //                   012 3456
      const initialData = 'abc\ndef';

      const [start, end] = MoveCarret(4, 3, initialData);
      assert.strictEqual(start, 4);
      assert.strictEqual(end, start + 1);
    });

    it('[l] doesnt change position if next character is \\n character', function() {
      //                   012 3456 7
      const initialData = 'abc\ndef\n';

      const [start, end] = MoveCarret(2, 3, initialData);
      assert.strictEqual(start, 2);
      assert.strictEqual(end, start + 1);
    });

    it('[l] doesnt change position if next character is out of content scope', function() {
      //                   012 3456
      const initialData = 'abc\ndef';

      const [start, end] = MoveCarret(6, 7, initialData);
      assert.strictEqual(start, 6);
      assert.strictEqual(end, start + 1);
    });

    it('[h] doesnt change position if prev character is new line character', function() {
      //                   012 3456
      const initialData = 'abc\ndef';

      const [start, end] = MoveCarret(0, -1, initialData);
      assert.strictEqual(start, 0);
      assert.strictEqual(end, start + 1);
    });

    it('[l] doesnt change position if current character is new line character', function() {
      //                   012 3 4567
      const initialData = 'abc\n\ndef';

      const [start, end] = MoveCarret(4, 5, initialData);
      assert.strictEqual(start, 4);
      assert.strictEqual(end, start + 1);
    });
  });
  describe('initialization of navigation mode', function() {
    it('set vim-nav-carret on the same place if carret between non new line characters', function() {
      //                   012 3456 7
      const initialData = 'abc\ndef\n';
      const normalCarretPosition = 5;

      const [start, end] = InitializeCarret(5, initialData);
      assert.strictEqual(start, 5);
      assert.strictEqual(end, start + 1);
    });

    it('set vim-nav-carret on previouse character if current character is new line', function() {
      //                   012 3456 7
      const initialData = 'abc\ndef\n';
      const normalCarretPosition = 3;

      const [start, end] = InitializeCarret(normalCarretPosition, initialData);
      assert.strictEqual(start, 2);
      assert.strictEqual(end, start + 1);
    });

    it('set vim-nav-carret on current \\n character if prev char is also \\n char', function() {
      //                   012 3 4567 8
      const initialData = 'abc\n\ndef\n';
      const normalCarretPosition = 4;

      const [start, end] = InitializeCarret(normalCarretPosition, initialData);
      assert.strictEqual(start, normalCarretPosition);
      assert.strictEqual(end, start + 1);
    });

    it('set vim-nav-carret on current \\n character if there is no prev char', function() {
      //                    0123 4 5678 9
      const initialData = '\nabc\n\ndef\n';
      const normalCarretPosition = 0;

      const [start, end] = InitializeCarret( normalCarretPosition, initialData );
      assert.strictEqual( start, normalCarretPosition );
      assert.strictEqual( end, start + 1 );
    });

  });
});