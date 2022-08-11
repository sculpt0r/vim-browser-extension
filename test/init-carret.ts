import test from 'ava';
import { InitializeCarret } from '../src/carret';

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
