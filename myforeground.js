console.log('VIM typer!');
let mode;
// let isPluginActive = false,
//     mode = 'move'; //'move' || 'input';

document.onkeydown = HandlePluginToggle;

function HandlePluginToggle(e) {
    console.log(e, e.key);
    switch(e.key) {
        case 'Escape':
            activateMoveMode();
            break;
        case 'i':
        case 'a':
            activateInsertMode();
            e.preventDefault();
            break;
    }
    // togglePluginActive();
}

// function togglePluginActive(){
//     isPluginActive = !isPluginActive;
//     console.log('Plugin is now', isPluginActive);

//     if( isPluginActive ) {
//         activateVim();
//     } else {
//         deactivateVim();
//     }
// }

function activateMoveMode() {
    mode = 'move';
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
    document.activeElement.selectionEnd++;
    document.onkeydown  = handleMoveKeys;
}

function handleMoveKeys( e ) {
    HandlePluginToggle(e);
    
    if( mode !== 'move' ){ return; }

    if( ['h','j','k','l'].includes( e.key ) ) {

        console.log('it was nav key!!');

        switch ( e.key ) {
            case 'h':
                MoveCarret( -1 );
            break;
            case 'l':
                MoveCarret( 1 );
            break;
            case 'j':
                CalculateHorizontal( 1 );
            break;
            case 'k':
                CalculateHorizontal( -1 );
            break;
        }
    }

    e.preventDefault();
}

function CalculateHorizontal( direction ) {
    const start = document.activeElement.selectionStart,
        content = getContent( document.activeElement ),
        nextLineBreakIndex = content.indexOf('\n', start),
        prevLineBreakIndex = content.lastIndexOf('\n', start),
        distanceFromLineBegin = start - prevLineBreakIndex;

    let newPos = start;

    if(direction > 0) {
        newPos = nextLineBreakIndex + distanceFromLineBegin;
    } else {
        const doublePrevLineBreakIndex = content.lastIndexOf('\n' , prevLineBreakIndex-1);
        newPos = doublePrevLineBreakIndex + distanceFromLineBegin;
    }

    document.activeElement.selectionEnd = document.activeElement.selectionStart = newPos;
    document.activeElement.selectionEnd++;
}

function getContent( element ) {
    if( element.tagName === 'TEXTAREA' ) {
        return element.value;
    } else {
        return element.innerHTML;
    }
}

function MoveCarret( direction ) {
    document.activeElement.selectionStart += direction;
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
    document.activeElement.selectionEnd++;
}

function activateInsertMode() {
    mode = 'insert';
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
}
