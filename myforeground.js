console.log('Im in front!');
let isPluginActive = false,
    mode = 'move'; //'move' || 'input'

function HandlePluginToggle(e) {
    if ( e.key === 'v' && e.altKey ) {
        togglePluginActive();
    }
}

function togglePluginActive(){
    isPluginActive = !isPluginActive;
    console.log('Plugin is now', isPluginActive);

    if( isPluginActive ) {
        activateVim();
    } else {
        deactivateVim();
    }
}

function activateVim() {
    mode = 'move';

    document.onkeydown  = handleMoveKeys;
}

function handleMoveKeys( e ) {
    HandlePluginToggle(e);
    if(!isPluginActive){ return; }
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
        content = document.activeElement.value,
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
        console.log({doublePrevLineBreakIndex, nextLineBreakIndex, prevLineBreakIndex, distanceFromLineBegin, start, content, newPos})

}

function MoveCarret( direction ) {
    document.activeElement.selectionStart += direction;
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
}

function deactivateVim() {
    console.log('deactivate');
}

document.onkeydown = HandlePluginToggle;