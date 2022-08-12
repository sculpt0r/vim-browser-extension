import test from 'ava';
import { FindBeginOfNextWord } from '../src/content-helper';

test( 'find the nearest begin of word', t => {
	//                                     0123456789
	const index = FindBeginOfNextWord( 0, 'This is it' );
	t.deepEqual( index, 5, 'Invalid end of word index' );
} );

// test( 'find the nearest begin of word starting at space', t => {
// 	//                                     0123456789
// 	const index = FindBeginOfNextWord( 4, 'This is it' );
// 	t.deepEqual( index, 5, 'Invalid end of word index' );
// } );
