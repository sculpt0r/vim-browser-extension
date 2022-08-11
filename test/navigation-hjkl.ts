import test from 'ava';
import { MoveCarret, CalculateHorizontal, RecalculateLeftOffset } from '../src/carret';

const UP = -1;
const DOWN = 1;

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

	t.deepEqual( leftOffset, 1 );
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

test( '[j] move down with same offset from left with proper line length from further lines', t => {
	//                   012 3456 78910
	const initialData = 'abc\ndef\nghj\nqaz';
	const startCarret = 9;
	const leftOffset = RecalculateLeftOffset( startCarret, initialData );

	const [ start, end ] = CalculateHorizontal( startCarret, DOWN, leftOffset, initialData );

	t.deepEqual( start, 13 );
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
