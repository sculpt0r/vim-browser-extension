function FindEndOfWord( currentPosition, content ) {
	// przetnij content w miejscu currentPosition
	const remainingContent = content.slice( currentPosition );
	//w pozostałej części szukaj z regexpem;
	console.log( `'${remainingContent}'` );
	const nextSpaceIndex =  remainingContent.search( /[\s]/g );
	// also add number of characters that was cutted away
	return ( nextSpaceIndex - 1 ) + currentPosition;
}

export { FindEndOfWord };
