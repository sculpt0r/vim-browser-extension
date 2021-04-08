
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
        return [currentPos, currentPos + 1];
    }

// console.log({wantedPosition});
    return [ wantedPosition, wantedPosition + 1 ];
}

function InitializeCarret( currentPos, content ){
    const currentCharacter = content.charAt( currentPos );
    const prevChar = content.charAt( currentPos - 1 );
    // console.log({currentPos, currentCharacter});
    
    //Take previous character if current is new line
    if( ( currentCharacter === '\n' || currentCharacter === '' ) && prevChar !== '\n' && prevChar !== '' ) {
        currentPos -= 1;
    }

    return [ currentPos, currentPos + 1 ];
}

function CalculateHorizontal( currentPos, direction, content ) {
    const UP = -1;
    const DOWN = 1;

    const nextLineBreakIndex = content.indexOf('\n', currentPos);
    const prevLineBreakIndex = content.lastIndexOf('\n', currentPos);
    const distanceFromLineBegin = currentPos - prevLineBreakIndex;

    let newPos = currentPos;

    if( direction === DOWN ) {
        if ( nextLineBreakIndex !== -1 ) {
            newPos = nextLineBreakIndex + distanceFromLineBegin;
        }
    } else if (direction === UP ) {
        // Look for new line before currentPos
        // Don't want to fine current line '\n' char
        // Want to find '\n' from line above
        const doublePrevLineBreakIndex = content.lastIndexOf('\n' , prevLineBreakIndex-1);
        newPos = doublePrevLineBreakIndex + distanceFromLineBegin;
    }

    return [ newPos, newPos + 1 ];
}

if( typeof module !== 'undefined') {
    module.exports = { MoveCarret, InitializeCarret, CalculateHorizontal };
}
