import test from 'ava';
import { RecalculateLeftOffset } from '../src/carret';

test( 'returns distance from previous line break with existing line break at zro', t => {
	//               012 3456
	const content = 'abc\ndef';
	const offset = RecalculateLeftOffset( 0, content );

	t.deepEqual( offset, 0 );
} );

test( 'returns distance from previous line break with existing line break', t => {
	//               012 3456
	const content = 'abc\ndef';
	const offset = RecalculateLeftOffset( 6, content );

	t.deepEqual( offset, 2 );
} );

test( 'returns distance from previous line break with existing line break in larger sample of text', t => {
	//               012 3 45
	const content = 'abc\n\nd';
	const offset = RecalculateLeftOffset( 5, content );

	t.deepEqual( offset, 0 );
} );

test( 'returns distance from the beginning of content if no previous line breaks', t => {
	//               012 3456
	const content = 'abc\ndef';
	const offset = RecalculateLeftOffset( 2, content );

	t.deepEqual( offset, 2 );
} );
