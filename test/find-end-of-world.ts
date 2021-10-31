import test from 'ava';
import { FindEndOfWord } from '../src/content-helper';

// describe( 'Content operations', () => {
test( 'find the nearest end of word', t => {
	//                               |
	//                               0123456789
	const index = FindEndOfWord( 0, 'This is it' );
	t.deepEqual( index, 3, 'Invalid end of word index' );
} );

test( 'find the nearest end of word 2', t => {
	//                               0123456
	const index = FindEndOfWord( 5, 'This is it' );
	t.deepEqual( index, 6, 'Invalid end of word index' );
} );

test( 'find next end if already on the end', t => {
	//                               0123456  9
	const index = FindEndOfWord( 6, 'This is it' );
	t.deepEqual( index, 9, 'Invalid end of word index' );
} );
test.todo( 'if there is no further spaces?' );
// } );
