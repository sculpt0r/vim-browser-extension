console.log('Im in front!');
let isPluginActive = false,
    mode = 'move'; //'move' || 'input'

function KeyPress(e) {
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
    if( ['h','j','k','l'].includes( e.key ) ) {
        console.log('it was nav key!!');
        switch ( e.key ) {
            case 'h':
                MoveCarret( -1 );
            break;
            case 'l':
                MoveCarret( 1 );
            break;
        }
    }
    e.preventDefault();
}

function MoveCarret( direction ) {
    document.activeElement.selectionStart += direction; 
    document.activeElement.selectionEnd += direction; 
}

function deactivateVim() {

}

document.onkeydown = KeyPress;