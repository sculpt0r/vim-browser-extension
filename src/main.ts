import { NavigationMode } from './navigation-mode';
import { ModeManager } from './mode-manager';
import { InsertMode } from './insert-mode';
import { EmptyMode } from './empty-mode';

const modeMgr  = new ModeManager();

document.addEventListener( 'keydown', HandlePluginToggle );

function HandlePluginToggle( e ) {
	if (
		// Alt + v
		( e.altKey && e.key === 'v' ) ||
		// On mac: Cmd key + option key
		( e.altKey && ( e.key === 'Meta' && e.code === 'MetaLeft' ) )
	) {

		if ( modeMgr.anyMode() ) {
			modeMgr.changeMode( new EmptyMode() );
			setIndicator( false );
			//unpin all listeners etc....
		} else {
			modeMgr.changeMode( new NavigationMode() );
			setIndicator( true );
		}
		return;
	}

	if ( modeMgr.anyMode() ) {
		if ( e.key === 'Escape' && ! ( modeMgr.currentMode instanceof NavigationMode ) ) {
			modeMgr.changeMode( new NavigationMode() );
		}

		if ( modeMgr.currentMode instanceof NavigationMode && ( e.key === 'i' || e.key === 'a' ) ) {
			modeMgr.changeMode( new InsertMode( e.key === 'a' ) );
			e.preventDefault();
		}
	}
}

let indicator;
function createIndicator() {
	indicator = document.createElement( 'div' );
	indicator.style.width = indicator.style.height = '5px';
	indicator.style.position = 'fixed';
	indicator.style.left = indicator.style.top = '0';
	indicator.style.background = 'red';
	document.body.appendChild( indicator );
}

function setIndicator( isActive ) {
	indicator.style.background = isActive ? 'green' : 'red';
}

window.addEventListener( 'DOMContentLoaded', function( event ) {
	createIndicator();
} );
