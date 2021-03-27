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
        }
    }
    e.preventDefault();
}

function MoveCarret( direction ) {
    document.activeElement.selectionStart += direction;
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
}

function deactivateVim() {
    console.log('deactivate');
}

document.onkeydown = HandlePluginToggle;