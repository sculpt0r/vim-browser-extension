import test from 'ava';
import { FindEndOfWord } from '../src/content-helper';

// describe( 'Content operations', () => {
test( 'find the nearest end of word', t => {
	//                               |
	//                               0123456789
	const index = FindEndOfWord( 0, 'This is it' );
	t.deepEqual( index, 3, 'Invalid end of word index' );
} );

test( 'find the nearest end of word if at the beginning of word', t => {
	//                               0123456
	const index = FindEndOfWord( 5, 'This is it' );
	t.deepEqual( index, 6, 'Invalid end of word index' );
} );

test( 'find next end if already on the end of word', t => {
	//                               0123456  9
	const index = FindEndOfWord( 6, 'This is it' );
	t.deepEqual( index, 9, 'Invalid end of word index' );
} );

// test( 'find next end if carret on whitespace', t => {
// 	//                               0123456  9
// 	const index = FindEndOfWord( 4, 'This is it' );
// 	t.deepEqual( index, 6, 'Invalid end of word index' );
// } );

// test( 'if there is no further spaces', t => {
// 	//                               0123456789
// 	const index = FindEndOfWord( 8, 'This is it' );
// 	t.deepEqual( index, 9, 'Invalid end of word index' );
// } );

// test( 'if there is multiline also verify by sample html', t => {
// 	//                               01234 5678
// 	const index = FindEndOfWord( 5, 'Thi i\nsit' );
// 	t.deepEqual( index, 8, 'Invalid end of word index' );
// } );

// test( 'if there is multiline and want to find last eord before new line', t => {
// 	//                               01234 567
// 	const index = FindEndOfWord( 0, 'Thii\nsit' );
// 	t.deepEqual( index, 3, 'Invalid end of word index' );
// } );

// test( 'bug', t => {
// 	//                               01234 567
// 	const index = FindEndOfWord( 3, 'This is\nit' );
// 	t.deepEqual( index, 5, 'Invalid end of word index' );
// } );

test.todo( 'if there are punctuations' );
// } );
