import { NavigationMode } from './navigation-mode';
import { ModeManager } from './mode-manager';
import { InsertMode } from './insert-mode';
import { EmptyMode } from './empty-mode';

const modeMgr = new ModeManager();

let indicator;
let currentElement;
let abortCtrlBlurHandler;

chrome.runtime.onMessage.addListener( ( message, sender, sendResponse ) => {
	TogglePlugin();
} );

function TogglePlugin() {
	const inAnyMode = modeMgr.anyMode();

	// Prevent toggle ON, but allow OFF.
	if ( !isEditableSupported( document.activeElement ) && !inAnyMode) {
		return;
	}

	const blurHanlder = () => {
		modeMgr.changeMode( new EmptyMode( currentElement ) );
		setIndicator( false );

		abortCtrlBlurHandler.abort();
	}

	if ( inAnyMode ) {
		modeMgr.changeMode( new EmptyMode( currentElement ) );
		abortCtrlBlurHandler.abort();
	} else {
		abortCtrlBlurHandler = new AbortController();
		currentElement = document.activeElement;
		currentElement.addEventListener(
			'blur',
			blurHanlder,
			{ signal: abortCtrlBlurHandler.signal }
		)

		modeMgr.changeMode( new NavigationMode( currentElement ) );
	}

	setIndicator( !inAnyMode );
}

function isEditableSupported( element ) : boolean {
	return element.tagName === 'TEXTAREA';
}

function keydownListener( e : KeyboardEvent ) : void {
	if ( !modeMgr.anyMode() ) {
		return;
	}

	if (
		e.key === 'Escape' &&
		! ( modeMgr.currentMode instanceof NavigationMode )
	) {
		modeMgr.changeMode( new NavigationMode( currentElement ) );
	}

	if (
		modeMgr.currentMode instanceof NavigationMode &&
		( e.key === 'i' || e.key === 'a' )
	) {
		modeMgr.changeMode( new InsertMode( currentElement, e.key === 'a' ) );
	}

	e.preventDefault();
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

window.addEventListener( 'keydown', keydownListener,{
	capture: true
} );

window.addEventListener( 'DOMContentLoaded', function( event ) {
	createIndicator();
} );
