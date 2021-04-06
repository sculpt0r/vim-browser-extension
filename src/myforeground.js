// console.log('VIM typer!');

class Mode {
    deactivate() {

    }
    activate() {

    }
}
class ModeManager {
    constructor() {
        this.currentMode = new EmptyMode();
    }

    changeMode(newMode) {
        if( this.currentMode.constructor === newMode.constructor ) {
            return;
        }

        if(this.currentMode) {
            this.currentMode.deactivate();
        }

        this.currentMode = newMode;
        this.currentMode.activate();
    }

    anyMode() {
        return !( this.currentMode instanceof EmptyMode );
    }

}
class InsertMode extends Mode {
    constructor() {
        super();
        document.activeElement.selectionEnd = document.activeElement.selectionStart;
        console.log('constructor insertu');
    }

    activate() {
        super.activate();
        console.log('activate insertu');
    }
    deactivate() {
        super.deactivate();
        console.log('deactiv inseru');
    }

}

class NavigationMode extends Mode {
    constructor() {
        super();
    

        console.log('navmode constructor');
    }

    activate() {
        super.activate();
        console.log('activate nav mode');

        document.addEventListener( 'keydown', this.handleKeys);

        document.activeElement.selectionEnd = document.activeElement.selectionStart;
        document.activeElement.selectionEnd++;
    }

    deactivate() {
        super.deactivate();
        console.log('deactivate nav mdoe');

        document.removeEventListener( 'keydown', this.handleKeys );
    }

    handleKeys( e ) {
        if( ['h','j','k','l'].includes( e.key ) ) {
    
            console.log('it was nav key!!', this);
    
            switch ( e.key ) {
                case 'h':
                    this.MoveCarret( -1 );
                break;
                case 'l':
                    this.MoveCarret( 1 );
                break;
                case 'j':
                    this.CalculateHorizontal( 1 );
                break;
                case 'k':
                    this.CalculateHorizontal( -1 );
                break;
            }
        }
    
        e.preventDefault();
    }

    CalculateHorizontal( direction ) {
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

    MoveCarret( direction ) {
        //     let p = document.activeElement; 
        // let range = new Range();
        //   range.setStart(p.firstChild, 0);
        //   range.setEnd(p.firstChild, 2);
        // document.getSelection().removeAllRanges();
        // document.getSelection().addRange(range);

        var start = document.activeElement.selectionStart;

        var newPos = clamp( start + direction, 0, getContent( document.activeElement ).length -1 );

        document.activeElement.selectionEnd = document.activeElement.selectionStart = newPos;
        document.activeElement.selectionEnd++;
    }
    
}

class EmptyMode extends Mode {
    deactivate() {
        super.deactivate();
        console.log('deactiv empty');
    }

    activate() {
        super.activate();
        console.log('active empty');
    }
}
const modeMgr  = new ModeManager();

document.addEventListener( 'keydown', HandlePluginToggle );

function HandlePluginToggle(e) {
	if( e.key === 'v' && e.altKey ) {
		if( modeMgr.anyMode() ) {
            modeMgr.changeMode(new EmptyMode());
			setIndicator( false );
			//unpin all listeners etc....
        } else {
            modeMgr.changeMode(new InsertMode());
			setIndicator( true );
		}
		return;
	}

	if( modeMgr.anyMode() ) {
		if( e.key === 'Escape' && ! (modeMgr.currentMode instanceof NavigationMode ) ) {
            modeMgr.changeMode(new NavigationMode());
		}

		if ( modeMgr.currentMode instanceof NavigationMode && ( e.key === 'i' || e.key === 'a' ) ) {
            modeMgr.changeMode(new InsertMode());
			e.preventDefault();
		}
	}
}






function getContent( element ) {
    if( element.tagName === 'TEXTAREA' ) {
        return element.value;
    } else {
        return element.innerHTML;
    }
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
