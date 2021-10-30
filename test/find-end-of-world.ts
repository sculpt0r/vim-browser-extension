import test from 'ava';
import { FindEndOfWord } from '../src/content-helper';

// describe( 'Content operations', () => {
test( 'find the nearest end of word', t => {
	const index = FindEndOfWord( 0, 'This is it' );
	t.deepEqual( index, 3, 'Invalid end of word index' );
} );

test( 'find the nearest end of word 2', t => {
	const index = FindEndOfWord( 5, 'This is it' );
	t.deepEqual( index, 6, 'Invalid end of word index' );
} );
// } );
