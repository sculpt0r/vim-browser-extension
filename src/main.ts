import { NavigationMode } from './navigation-mode';
import { ModeManager } from './mode-manager';
import { InsertMode } from './insert-mode';
import { EmptyMode } from './empty-mode';

const modeMgr  = new ModeManager();

let indicator;

chrome.runtime.onMessage.addListener( ( message, sender, sendResponse ) => {
	TogglePlugin();
} );

function TogglePlugin() {
	const inAnyMode = modeMgr.anyMode();

	// Prevent toggle ON, but allow OFF.
	if ( !isEditableSupported() && !inAnyMode) {
		return;
	}

	if ( inAnyMode ) {
		modeMgr.changeMode( new EmptyMode() );
		//unpin all listeners etc...
	} else {
		document.activeElement.addEventListener( 'blur', () => {
			modeMgr.changeMode( new EmptyMode() );
			setIndicator( false );
		})

		modeMgr.changeMode( new NavigationMode() );
	}

	setIndicator( !inAnyMode );
}

function isEditableSupported() : boolean {
	return document.activeElement.tagName === 'TEXTAREA';
}

function keydownListener( e : KeyboardEvent ) : void {
	if ( modeMgr.anyMode() ) {
		if ( e.key === 'Escape' && ! ( modeMgr.currentMode instanceof NavigationMode ) ) {
			modeMgr.changeMode( new NavigationMode() );
		}

		if (
			modeMgr.currentMode instanceof NavigationMode &&
			( e.key === 'i' || e.key === 'a' )
		) {
			modeMgr.changeMode( new InsertMode( e.key === 'a' ) );
			e.preventDefault();
		}
	}
}

function createIndicator() : void {
	indicator = document.createElement( 'div' );
	indicator.style.width = indicator.style.height = '5px';
	indicator.style.position = 'fixed';
	indicator.style.left = indicator.style.top = '0';
	indicator.style.background = 'red';
	document.body.appendChild( indicator );
}

function setIndicator( isActive : boolean ) {
	indicator.style.background = isActive ? 'green' : 'red';
}

document.addEventListener( 'keydown', keydownListener );

window.addEventListener( 'DOMContentLoaded', function( event ) {
	createIndicator();
} );
