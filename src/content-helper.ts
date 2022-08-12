

function FindEndOfWord( currentPosition : number, content : string ) : number {
	//find last non empty char followed by empty char
	const lastNonEmptyChar = /[^(\s\n)][\s|\W]{1}/g;

	lastNonEmptyChar.lastIndex = currentPosition + 1;

	const res = lastNonEmptyChar.exec( content );
	if ( res === null ) {
		// if nth found - could mean there is no empty char at the end
		// try to find last non empty char at the end of string
		const lastNonEmptyChar = /[^(\s\n)]$/g;
		const res2 = lastNonEmptyChar.exec( content );

		if ( res2 === null ) {
			return currentPosition;
		}

		return res2.index;
	}

	return res.index;
}

function FindBeginOfNextWord( currentPosition : number, content : string ) : number {
	const wordBreakRegEx = /[^\s]{1}(\s|$|\n)/g;
	wordBreakRegEx.lastIndex = currentPosition;

	wordBreakRegEx.test( content );

	const closesEnd = wordBreakRegEx.lastIndex > content.length ?
		currentPosition : wordBreakRegEx.lastIndex;
	return closesEnd;
}
export { FindEndOfWord };
