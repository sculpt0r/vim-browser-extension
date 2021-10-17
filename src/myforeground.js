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
	constructor( moveAfter ) {
		super();
		if(!getCarretStart(document.activeElement)){
			return;
		}
		let currentPos = getCarretStart( document.activeElement );
		if ( moveAfter ) {
			currentPos++;
		}

		setSelection(currentPos, currentPos, document.activeElement);

		// console.log('constructor insertu');
	}

	activate() {
		super.activate();
		// console.log('activate insertu');
	}

	deactivate() {
		super.deactivate();
		// console.log('deactiv inseru');
	}

}

class NavigationMode extends Mode {
	constructor() {
		super();
		// console.log('navmode constructor');
	}

	activate() {
		if(!getCarretStart(document.activeElement)){
			return;
		}
		super.activate();
		// console.log('activate nav mode');

		this.keyListener = ( e ) => { this.handleKeys( e ); }

		document.addEventListener( 'keydown', this.keyListener );

		let pos = getCarretStart( document.activeElement );
		const content = getContent( document.activeElement );

		this.leftOffset = RecalculateLeftOffset( pos, content );

		const [ start, end ] = InitializeCarret( pos, content );

		setSelection(start, end, document.activeElement);
	}

	deactivate() {
		super.deactivate();
		// console.log('deactivate nav mode');

		document.removeEventListener( 'keydown', this.keyListener );
	}

	handleKeys( e ) {
		const content = getContent(document.activeElement);
		const pos = getCarretStart( document.activeElement );
		this.leftOffset = RecalculateLeftOffset( pos, content );
		let start, end = -1;

		if( e.key === 'e' ){
			// Move carrate to the end of next word
			const endOfWordPosition = FindEndOfWord( pos, content );
			start = endOfWordPosition;
			end = start + 1;
		}

		if( [ 'h', 'j', 'k', 'l' ].includes( e.key ) ) {

			if ( e.key === 'h' ) {
				[ start, end ] = MoveCarret( pos, pos - 1, content );
				this.leftOffset = RecalculateLeftOffset( start, content );
			}

			if ( e.key === 'l' ) {
				[ start, end ] = MoveCarret( pos, pos + 1, content );
				this.leftOffset = RecalculateLeftOffset( start, content );
			}

			if ( e.key === 'k' ) {
				[ start, end ] = CalculateHorizontal( pos, -1, this.leftOffset, content );
			}

			if ( e.key === 'j' ) {
				[ start, end ] = CalculateHorizontal( pos, 1, this.leftOffset, content );
			}
		}

		setSelection( start, end, document.activeElement );

		e.preventDefault();
	}
}

class EmptyMode extends Mode {
	deactivate() {
		super.deactivate();
		// console.log('deactiv empty');
	}

	activate() {
		super.activate();
		// console.log('active empty');
		const pos = getCarretStart( document.activeElement );
		setSelection( pos, pos, document.activeElement );
	}
}
const modeMgr  = new ModeManager();

document.addEventListener( 'keydown', HandlePluginToggle );

function HandlePluginToggle(e) {
	if(
		// Alt + v
		( e.altKey && e.key === 'v' ) ||
		// On mac: Cmd key + option key
		( e.altKey && ( e.key === 'Meta' && e.code === 'MetaLeft' ) )
	) {

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
			modeMgr.changeMode( new InsertMode( e.key === 'a' ) );
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
