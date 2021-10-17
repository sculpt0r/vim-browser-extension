function setSelection( start, end, element ) {
	if ( start === -1 || end === -1 ) {
		return;
	}

	if ( element.tagName === 'TEXTAREA' ) {
		element.selectionStart = start;
		element.selectionEnd = end;
	} else {
		return;
		let range = new Range();

		range.setStart( element.firstChild, start );
		range.setEnd( element.firstChild, end );

		document.getSelection().removeAllRanges();
		document.getSelection().addRange( range );
	}
}

function getCarretStart( element ) {
	if ( element.tagName === 'TEXTAREA' ) {
		return element.selectionStart;
	} else {
		return null;
		const selObj = window.getSelection();
		const selRange = selObj.getRangeAt( 0 );

		return selRange.startOffset;
	}
}

export { getCarretStart, setSelection }
