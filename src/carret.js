
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
    
    //Take previous character if current is new line
    if( currentCharacter === '\n' && prevChar !== '\n' && prevChar !== '' ) {
        currentPos -= 1;
    }

    return [ currentPos, currentPos + 1 ];
}

if( typeof module !== 'undefined') {
    module.exports = { MoveCarret, InitializeCarret };
}
