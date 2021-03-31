console.log('VIM typer!');
let mode;
// let isPluginActive = false,
//     mode = 'move'; //'move' || 'input';

document.onkeydown = HandlePluginToggle;

function HandlePluginToggle(e) {
	if( e.key === 'v' && e.altKey ) {
		if( !mode ) {
			activateInsertMode();
			setIndicator( true );
		} else {
			mode = null;
			setIndicator( false );
			//unpin all listeners etc....
		}
		return;
	}

	if( mode ) {
		if( e.key === 'Escape' ) {
			activateMoveMode();
		}

		if ( mode === 'move' && ( e.key === 'i' || e.key === 'a' ) ) {
			activateInsertMode();
			e.preventDefault();
		}
	}
}

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
    var start = document.activeElement.selectionStart;

	var newPos = clamp( start + direction, 0, getContent( document.activeElement ).length -1 );

    document.activeElement.selectionEnd = document.activeElement.selectionStart = newPos;
    document.activeElement.selectionEnd++;
}

function activateInsertMode() {
    mode = 'insert';
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

let indicator;
function createIndicator(){
	indicator = document.createElement('div');
	indicator.style.width = indicator.style.height = '25px';
	indicator.style.position = 'fixed';
	indicator.style.left = indicator.style.top = '0';
	indicator.style.background = 'red';
	document.body.appendChild(indicator);
}

function setIndicator( isActive ) {
	indicator.style.background = isActive ? 'green' : 'red';
}

window.addEventListener('DOMContentLoaded', function(event) {
	createIndicator();
});

