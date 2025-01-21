import { Mode } from './mode';
import { EmptyMode } from './empty-mode';

export class ModeManager {
	currentMode: Mode;

	constructor() {
		this.currentMode = new EmptyMode( document.activeElement );
	}

	changeMode( newMode: Mode ) {
		if ( this.currentMode.constructor === newMode.constructor ) {
			return;
		}

		if ( this.currentMode ) {
			this.currentMode.deactivate();
		}

		this.currentMode = newMode;
		this.currentMode.activate();
	}

	anyMode() {
		return !( this.currentMode instanceof EmptyMode );
	}
}
