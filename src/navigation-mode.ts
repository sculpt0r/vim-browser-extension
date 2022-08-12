import { MoveCarret, InitializeCarret, CalculateHorizontal, RecalculateLeftOffset } from './carret';
import { getCarretStart, setSelection } from './selection';
import { FindBeginOfNextWord, FindEndOfWord } from './content-helper';
import { Mode } from './mode';

class NavigationMode extends Mode {
	keyListener;
	leftOffset : number;

	constructor() {
		super();
	}

	activate() {
		if ( !getCarretStart( document.activeElement ) ) {
			return;
		}
		super.activate();

		this.keyListener = ( e ) => { this.handleKeys( e ); };

		document.addEventListener( 'keydown', this.keyListener );

		const pos : number = getCarretStart( document.activeElement );
		const content = this.getContent( document.activeElement );

		this.leftOffset = RecalculateLeftOffset( pos, content );

		const [ start, end ] = InitializeCarret( pos, content );

		setSelection( start, end, document.activeElement );
	}

	deactivate() {
		super.deactivate();

		document.removeEventListener( 'keydown', this.keyListener );
	}

	handleKeys( e ) {
		const content = this.getContent( document.activeElement );
		const pos = getCarretStart( document.activeElement );
		this.leftOffset = RecalculateLeftOffset( pos, content );
		let start, end = -1;

		if ( e.key === 'e' ) {
			// Move carrate to the end of next word
			const endOfWordPosition = FindEndOfWord( pos, content );

			start = endOfWordPosition;
			end = start + 1;
		}

		if ( e.key === 'w' ) {
			// Move carrate to the end of next word
			const endOfWordPosition = FindBeginOfNextWord( pos, content );

			start = endOfWordPosition;
			end = start + 1;
		}

		if ( [ 'h', 'j', 'k', 'l' ].includes( e.key ) ) {

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

	getContent( element ) {
		if ( element.tagName === 'TEXTAREA' ) {
			return element.value;
		} else {
			return element.innerHTML;
		}
	}
}



export { NavigationMode };
