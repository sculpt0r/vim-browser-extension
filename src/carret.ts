/**
 * Verify and calculate new carret position if it is allowed to moved out of single line
 * @param {number} currentPos Index of current carret position
 * @param {number} wantedPosition Index of position, that we want to move carret
 * @param {string} content Content that is used in this calculation
 * @returns {number[]} New carret start position and end position (vim carret is one character wide)
 */
function MoveCarret( currentPos, wantedPosition, content ) {
	//     let p = document.activeElement;
	// let range = new Range();
	//   range.setStart(p.firstChild, 0);
	//   range.setEnd(p.firstChild, 2);
	// document.getSelection().removeAllRanges();
	// document.getSelection().addRange(range);

	const charAtCurrentPos = content.charAt( currentPos );
	const charAtNewPos = content.charAt( wantedPosition );
	// console.log({charAtNewPos});
	// `h`, `l` - allows to move only inside one line!
	if ( charAtNewPos === '\n' || charAtNewPos === '' || charAtCurrentPos === '\n' ) {
		// console.log({currentPos});
		return [ currentPos, currentPos + 1 ];
	}

	// console.log({wantedPosition});
	return [ wantedPosition, wantedPosition + 1 ];
}

function InitializeCarret( currentPos, content ) {
	const currentCharacter = content.charAt( currentPos );
	const prevChar = content.charAt( currentPos - 1 );
	// console.log({currentPos, currentCharacter});

	//Take previous character if current is new line
	if ( ( currentCharacter === '\n' || currentCharacter === '' ) && prevChar !== '\n' && prevChar !== '' ) {
		currentPos -= 1;
	}

	return [ currentPos, currentPos + 1 ];
}

const enum DIRECTION {
	UP = 1,
	DOWN = -1
}

function CalculateHorizontal(
	currentPos : number,
	direction : DIRECTION,
	leftOffset : number,
	content : string
) : [ number, number ] {

	//split content into lines
	let contentLines = content.split( '\n' );
	//append \n character - since it is line content
	contentLines = contentLines.map( line => line + '\n' );

	let counter = -1;
	let carretCounter = 0;

	//mark each line begin, end & length
	const mapedLines = contentLines.map( line => {
		const lineNumber = ++counter;
		const start = carretCounter;
		const end = start + line.length - 1;
		// length == 0 means we have empty line
		const length = end - start;

		carretCounter = end + 1;

		return {
			number: lineNumber,
			start,
			end,
			length
		};
	} );

	const myLineNr = mapedLines.find( line => currentPos >= line.start && currentPos <= line.end ).number;

	let newPos = currentPos;

	const targetLine = mapedLines.find( line => line.number === myLineNr + direction );
	if ( targetLine ) {
		// Need to put carret at last character not after it
		const targetLineOffset = targetLine.length - 1 < 0 ? 0 : targetLine.length - 1;
		const allowedOffset = Math.min( leftOffset, targetLineOffset );

		newPos = targetLine.start + allowedOffset;// - newLineCharMod;
	}

	return [ newPos, newPos + 1 ];
}

function RecalculateLeftOffset( pos : number, content : string ) : number {
	const prevLineBreakCharPos = content.lastIndexOf( '\n', pos );

	//
	// | 0 | 1 | 2 |  3 | 4 | 5 | 6 |
	// | a | b | c | \n | d | e | f |
	// 0   1   2   3    4   5   6   7

	// offset is a distance from the nearest previous new line character
	//e.g. pos 4 has 0 ofset
	return prevLineBreakCharPos !== -1 ? ( pos - prevLineBreakCharPos ) - 1 : pos;
}

export { MoveCarret, InitializeCarret, CalculateHorizontal, RecalculateLeftOffset, DIRECTION };
