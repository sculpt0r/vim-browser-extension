import { getCarretStart, setSelection } from './selection';
import { Mode } from './mode';

export class InsertMode extends Mode {
	constructor( moveAfter ) {
		super();
		if ( !getCarretStart( document.activeElement ) ) {
			return;
		}
		let currentPos = getCarretStart( document.activeElement );
		if ( moveAfter ) {
			currentPos++;
		}

		setSelection( currentPos, currentPos, document.activeElement );

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
