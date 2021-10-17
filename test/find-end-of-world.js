/* eslint-disable no-undef */
const assert = require( 'assert' );
const { FindEndOfWord } = require( '../src/content-helper' );

describe( 'Content operations', () => {
	it( 'find the nearest end of word', () => {
		const index = FindEndOfWord( 0, 'This is it' );
		assert.equal( index, 3, 'Invalid end of word index' );
	} );

	it( 'find the nearest end of word 2', () => {
		const index = FindEndOfWord( 5, 'This is it' );
		assert.equal( index, 6, 'Invalid end of word index' );
	} );
} );
