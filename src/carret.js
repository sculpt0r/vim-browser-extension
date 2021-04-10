
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

function CalculateHorizontal( currentPos, direction, leftOffset, content ) {
    const UP = -1;
    const DOWN = 1;

    let contentLines = content.split( '\n' );
    contentLines = contentLines.map(line => line + '\n' );

    let counter = -1;
    let carretCounter = 0;

    const mapedLines = contentLines.map( line => {

        const number = ++counter;
        const start = carretCounter;
        const end = start + line.length - 1;
        const length = end - start;
        
        carretCounter = end + 1;
        return {
            number,
            start,
            end,
            length
        };
    });


    const myLineNr = mapedLines
                    .find( line => currentPos >= line.start && currentPos <= line.end)
                    .number;


    let newPos = currentPos;

    const foundLine = mapedLines.find( line => line.number === myLineNr + direction);

    if(foundLine){
        newPos =  foundLine.start + ( Math.min(leftOffset, foundLine.length) - 1 );
        if ( foundLine.length === 0 ) {newPos ++;}
    }
    

    return [ newPos, newPos + 1 ];
}

function RecalculateLeftOffset( pos, content ) {
    const prevLineBreakDist = content.lastIndexOf( '\n', pos );
    return prevLineBreakDist !== -1 ? pos - prevLineBreakDist : pos;
}

if( typeof module !== 'undefined') {
    module.exports = { MoveCarret, InitializeCarret, CalculateHorizontal, RecalculateLeftOffset };
}
