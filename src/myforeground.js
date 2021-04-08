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

        this.keyListener = ( e ) => { this.handleKeys( e ); }

        document.addEventListener( 'keydown', this.keyListener );
        
        let pos = document.activeElement.selectionStart;

        const content = getContent( document.activeElement );
       
        const [ start, end ] = InitializeCarret( pos, content );
        document.activeElement.selectionStart = start;
        document.activeElement.selectionEnd = end;
    }

    deactivate() {
        super.deactivate();
        console.log('deactivate nav mdoe');

        document.removeEventListener( 'keydown', this.keyListener );
    }

    handleKeys( e ) {
        if( ['h','j','k','l'].includes( e.key ) ) {
            let start, end = -1;
            const content = getContent(document.activeElement);
            const pos = document.activeElement.selectionStart;

            if ( e.key === 'h' ) {
                [ start, end ] = MoveCarret( pos, pos - 1, content );
            }

            if ( e.key === 'l' ) {
                [ start, end ] = MoveCarret( pos, pos + 1, content );
            }

            if ( e.key === 'k' ) {
                [ start, end ] = CalculateHorizontal( pos, -1, content );
            }

            if ( e.key === 'j' ) {
                [ start, end ] = CalculateHorizontal( pos, 1, content );
            }
            if ( start > -1 && end > -1 ) {
                document.activeElement.selectionStart = start;
                document.activeElement.selectionEnd = end;
            }
        }
        e.preventDefault();
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
        document.activeElement.selectionEnd = document.activeElement.selectionStart;
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
            modeMgr.changeMode(new NavigationMode());
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

let indicator;
function createIndicator(){
	indicator = document.createElement('div');
	indicator.style.width = indicator.style.height = '5px';
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
