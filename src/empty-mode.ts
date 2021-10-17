import { getCarretStart, setSelection } from './selection';
import { Mode } from './mode';


export class EmptyMode extends Mode {
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
