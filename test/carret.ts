import test from 'ava';

import { MoveCarret, InitializeCarret, CalculateHorizontal, RecalculateLeftOffset } from '../src/carret';

const UP = -1;
const DOWN = 1;


// describe( 'Carret', function() {
// describe( 'initialization of navigation mode', function() {
test( 'set vim-nav-carret on the same place if carret between non new line characters', t => {
	//                   012 3456 7
	const initialData = 'abc\ndef\n';
	const normalCarretPosition = 5;

	const [ start, end ] = InitializeCarret( normalCarretPosition, initialData );

	t.deepEqual( start, normalCarretPosition );
	t.deepEqual( end, start + 1 );
} );

test( 'set vim-nav-carret on previouse character if current character is new line', t => {
	//                   012 3456 7
	const initialData = 'abc\ndef\n';
	const normalCarretPosition = 3;

	const [ start, end ] = InitializeCarret( normalCarretPosition, initialData );
	t.deepEqual( start, 2 );
	t.deepEqual( end, start + 1 );
} );

test( 'set vim-nav-carret on current \\n character if prev char is also \\n char', t => {
	//                   012 3 4567 8
	const initialData = 'abc\n\ndef\n';
	const normalCarretPosition = 4;

	const [ start, end ] = InitializeCarret( normalCarretPosition, initialData );
	t.deepEqual( start, normalCarretPosition );
	t.deepEqual( end, start + 1 );
} );

test( 'set vim-nav-carret on current \\n character if there is no prev char', t => {
	//                    0123 4 5678 9
	const initialData = '\nabc\n\ndef\n';
	const normalCarretPosition = 0;

	const [ start, end ] = InitializeCarret( normalCarretPosition, initialData );
	t.deepEqual( start, normalCarretPosition );
	t.deepEqual( end, start + 1 );
} );

test( 'set vim-nav-carret on last character if current carret is at the end', t => {
	//                    0123 4 5678
	const initialData = '\nabc\n\ndef';
	const normalCarretPosition = 9;

	const [ start, end ] = InitializeCarret( normalCarretPosition, initialData );
	t.deepEqual( start, normalCarretPosition - 1 );
	t.deepEqual( end, start + 1 );
} );

// } );

// describe( 'left \'h\' and right \'l\' keys', function() {
test( '[h] doesnt change position if prev character is \\n character', t => {
	//                   012 3456
	const initialData = 'abc\ndef';

	const [ start, end ] = MoveCarret( 4, 3, initialData );
	t.deepEqual( start, 4 );
	t.deepEqual( end, start + 1 );
} );

test( '[l] doesnt change position if next character is \\n character', t => {
	//                   012 3456 7
	const initialData = 'abc\ndef\n';

	const [ start, end ] = MoveCarret( 2, 3, initialData );
	t.deepEqual( start, 2 );
	t.deepEqual( end, start + 1 );
} );

test( '[l] doesnt change position if next character is out of content scope', t => {
	//                   012 3456
	const initialData = 'abc\ndef';

	const [ start, end ] = MoveCarret( 6, 7, initialData );
	t.deepEqual( start, 6 );
	t.deepEqual( end, start + 1 );
} );

test( '[h] doesnt change position if prev character is new line character', t => {
	//                   012 3456
	const initialData = 'abc\ndef';

	const [ start, end ] = MoveCarret( 0, -1, initialData );
	t.deepEqual( start, 0 );
	t.deepEqual( end, start + 1 );
} );

test( '[l] doesnt change position if current character is new line character', t => {
	//                   012 3 4567
	const initialData = 'abc\n\ndef';

	const [ start, end ] = MoveCarret( 4, 5, initialData );
	t.deepEqual( start, 4 );
	t.deepEqual( end, start + 1 );
} );
// } );

// describe( 'left offset calculation', function() {
test( 'returns distance from previous line break with existing line break', t => {
	//               012 3456
	const content = 'abc\ndef';
	const offset = RecalculateLeftOffset( 6, content );

	t.deepEqual( offset, 3 );
} );

test( 'returns distance from previous line break with existing line break in larger sample of text', t => {
	//               012 3456 7890 1234
	const content = 'abc\ndef\nghj\nzxc';
	const offset = RecalculateLeftOffset( 14, content );

	t.deepEqual( offset, 3 );
} );

test( 'returns distance from the beginning of content if no previous line breaks', t => {
	//               012 3456
	const content = 'abc\ndef';
	const offset = RecalculateLeftOffset( 2, content );

	t.deepEqual( offset, 2 );
} );
// } );

// describe( 'up \'j\' and down \'k\' keys', function() {
test( '[k] doesnt move up if there is no line above', t => {
	//                   012 3456
	const initialData = 'abc\ndef';
	const startCarret = 2;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, UP, leftOffset, initialData );

	t.deepEqual( start, startCarret );
	t.deepEqual( end, start + 1 );
} );

test( '[j] doesnt move down if there is no line below', t => {
	//                   012 3456
	const initialData = 'abc\ndef';
	const startCarret = 5;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, DOWN, leftOffset, initialData );

	t.deepEqual( start, startCarret );
	t.deepEqual( end, start + 1 );
} );

test( '[j] move down with same offset from left with proper line length from the first line', t => {
	//                   012 3456 78910
	const initialData = 'abc\ndef\nghj';
	const startCarret = 1;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, DOWN, leftOffset, initialData );

	t.deepEqual( start, 5 );
	t.deepEqual( end, start + 1 );
} );

test( '[j] move down with same offset from left with proper line length', t => {
	//                   012 3456 78910
	const initialData = 'abc\ndef\nghj';
	const startCarret = 5;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, DOWN, leftOffset, initialData );

	t.deepEqual( start, 9 );
	t.deepEqual( end, start + 1 );
} );

test( '[k] move up with same offset from left with proper line length', t => {
	//                   012 3456 78910
	const initialData = 'abc\ndef\nghj';
	const startCarret = 9;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, UP, leftOffset, initialData );

	t.deepEqual( start, 5 );
	t.deepEqual( end, start + 1 );
} );

test( '[k] move up with most possible offset if line is shorter', t => {
	//                   0 1234
	const initialData = 'a\ndef';
	const startCarret = 4;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, UP, leftOffset, initialData );

	t.deepEqual( start, 0 );
	t.deepEqual( end, start + 1 );
} );

test( '[j] move down with most possible offset if line is shorter', t => {
	//                   012 34
	const initialData = 'abc\nd';
	const startCarret = 2;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, DOWN, leftOffset, initialData );

	t.deepEqual( start, 4 );
	t.deepEqual( end, start + 1 );
} );

test( '[j] move to down line even if its only empty newline', t => {
	//                   012 3 4 567 89
	const initialData = 'abc\n\n\nde\nx';
	const startCarret = 1;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, DOWN, leftOffset, initialData );

	t.deepEqual( start, 4 );
	t.deepEqual( end, start + 1 );
} );

test( '[k] move to up line even if its only empty newline', t => {
	//                   012 3 4 567 89
	const initialData = 'abc\n\n\nde\nx';
	const startCarret = 7;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, UP, leftOffset, initialData );

	t.deepEqual( start, 5 );
	t.deepEqual( end, start + 1 );
} );

// } );
// } );
