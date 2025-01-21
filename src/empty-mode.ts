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
		const pos = getCarretStart( this.element );
		setSelection( pos, pos, this.element );
	}
}
