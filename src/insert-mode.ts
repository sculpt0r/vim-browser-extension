import { getCarretStart, setSelection } from './selection';
import { Mode } from './mode';

export class InsertMode extends Mode {
	constructor( element, moveAfter ) {
		super( element );

		if ( !getCarretStart( this.element ) ) {
			return;
		}
		let currentPos = getCarretStart( this.element );
		if ( moveAfter ) {
			currentPos++;
		}

		setSelection( currentPos, currentPos, this.element );

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
