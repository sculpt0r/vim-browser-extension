

function FindEndOfWord( currentPosition : number, content : string ) : number {
	const wordBreakRegEx = /[^\s]{1}(\s|$|\n)/g;
	wordBreakRegEx.lastIndex = currentPosition;

	wordBreakRegEx.test( content );
	if ( wordBreakRegEx.lastIndex-2 === currentPosition ) {
		//end of line dont bump index so much
		return FindEndOfWord( currentPosition +1, content ) + 1;
	}
	// if ( wordBreakRegEx.lastIndex - 2 === currentPosition ) {

	// 	return FindEndOfWord( currentPosition+2, content );
	// }

	return wordBreakRegEx.lastIndex - 2;
}

export { FindEndOfWord };
